'use client'

import converSelectedDateToString from '@/utils/converSelectedDateToString'
import React, { useState } from 'react'
import { GuestsObject } from '../../type'
import GuestsInput from '../GuestsInput'
import LocationInput from '../LocationInput'
import DatesRangeInput from '../DatesRangeInput'
import useStore from '@/components/ListingStore'
const StaySearchForm = () => {
	//
	const [fieldNameShow, setFieldNameShow] = useState<
		'location' | 'dates' | 'price' | 'guests'
	>('location')
	//
	const [locationInputTo, setLocationInputTo] = useState('')
	const [guestInput, setGuestInput] = useState<GuestsObject>({
		guestAdults: 0,
		guestChildren: 0,
		guestInfants: 0,
	})
	const { Listings, setPrice } = useStore()
	const [startDate, setStartDate] = useState<Date | null>(new Date())
	const [endDate, setEndDate] = useState<Date | null>(new Date())
	//

	const onChangeDate = (dates: [Date | null, Date | null]) => {
		const [start, end] = dates
		setStartDate(start)
		setEndDate(end)
	}

	const renderInputLocation = () => {
		const isActive = fieldNameShow === 'location'
		return (
			<div
				className={`w-full bg-white dark:bg-neutral-800 ${
					isActive
						? 'rounded-2xl shadow-lg'
						: 'rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]'
				}`}
			>
				{!isActive ? (
					<button
						className={`flex w-full justify-between p-4 text-sm font-medium`}
						onClick={() => setFieldNameShow('location')}
					>
						<span className="text-neutral-400">Where</span>
						<span>{locationInputTo || 'Location'}</span>
					</button>
				) : (
					<LocationInput
						defaultValue={locationInputTo}
						onChange={(value) => {
						
							setFieldNameShow('dates')
						}}
					/>
				)}
			</div>
		)
	}

	const renderInputDates = () => {
		const isActive = fieldNameShow === 'dates'

		return (
			<div
				className={`w-full overflow-hidden bg-white dark:bg-neutral-800 ${
					isActive
						? 'rounded-2xl shadow-lg'
						: 'rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]'
				}`}
			>
				{!isActive ? (
					<button
						className={`flex w-full justify-between p-4 text-sm font-medium`}
						onClick={() => setFieldNameShow('dates')}
					>
						<span className="text-neutral-400">When</span>
						<span>
							{startDate
								? converSelectedDateToString([startDate, endDate])
								: 'Add date'}
						</span>
					</button>
				) : (
					<DatesRangeInput />
				)}
			</div>
		)
	}
	const renderPrices = () => {
		
		const isActive = fieldNameShow === 'price'
		 
		const maxRange = 1000
		return (
			<div
				className={`w-full overflow-hidden bg-white dark:bg-neutral-800 ${
					isActive
						? 'rounded-2xl shadow-lg'
						: 'rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]'
				}`}
			>
				{!isActive ? (
					<button
						className={`flex w-full justify-between p-4 text-sm font-medium`}
						onClick={() => setFieldNameShow('price')}
					>
						<span className="text-neutral-400">Price</span>
						<span>Add Price</span>
					</button>
				) : (
					<div className="px-4 py-5">
						<div className="flex w-full items-center justify-between text-xl font-semibold">
							<p>Choose a Price range(AED)</p>
						</div>
						<div className="mt-5 w-full">
							<input
								id="default-range"
								type="range"
								value={Listings.inputPrice}
								min={0}
								max={maxRange}
								onChange={(e) => setPrice(Number(e.target.value))}
								className="w-full cursor-pointer appearance-none rounded-lg bg-primary-200"
							/>
							<style jsx>{`
								/* Customize the track color */
								#default-range {
									appearance: none;
									width: 100%;
									height: 8px; /* Height of the track */
									background: #e0e0e0; /* Default track color */
									border-radius: 4px;
								}

								/* Customize the thumb color */
								#default-range::-webkit-slider-thumb {
									appearance: none;
									width: 20px; /* Width of the thumb */
									height: 20px; /* Height of the thumb */
									border-radius: 50%; /* Circular thumb */
									background: #f1c27d; /* Thumb color (green in this case) */
									cursor: pointer;
								}

								#default-range::-moz-range-thumb {
									width: 20px;
									height: 20px;
									border-radius: 50%;
									background: #4caf50; /* Thumb color */
									cursor: pointer;
								}

								#default-range::-ms-thumb {
									width: 20px;
									height: 20px;
									border-radius: 50%;
									background: #4caf50; /* Thumb color */
									cursor: pointer;
								}
							`}</style>
							<div className="flex w-full font-medium items-center justify-between">
								<p>0</p>
								<p>{Listings.inputPrice}</p>
								<p>{maxRange}</p>
							</div>
						</div>
					</div>
				)}
			</div>
		)
	}

	const renderInputGuests = () => {
		const isActive = fieldNameShow === 'guests'
		let guestSelected = ''
		if (guestInput.guestAdults || guestInput.guestChildren) {
			const guest =
				(guestInput.guestAdults || 0) + (guestInput.guestChildren || 0)
			guestSelected += `${guest} guests`
		}

		if (guestInput.guestInfants) {
			guestSelected += `, ${guestInput.guestInfants} infants`
		}

		return (
			<div
				className={`w-full overflow-hidden bg-white dark:bg-neutral-800 ${
					isActive
						? 'rounded-2xl shadow-lg'
						: 'rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]'
				}`}
			>
				{!isActive ? (
					<button
						className={`flex w-full justify-between p-4 text-sm font-medium`}
						onClick={() => setFieldNameShow('guests')}
					>
						<span className="text-neutral-400">Beds</span>
						<span>{guestSelected || `Add Beds`}</span>
					</button>
				) : (
					<GuestsInput defaultValue={guestInput} onChange={setGuestInput} />
				)}
			</div>
		)
	}

	return (
		<div>
			<div className="w-full space-y-5">
				{/*  */}
				{renderInputLocation()}
				{/*  */}
				{renderInputDates()}
				{renderPrices()}
				{/*  */}
				{renderInputGuests()}
			</div>
		</div>
	)
}

export default StaySearchForm
