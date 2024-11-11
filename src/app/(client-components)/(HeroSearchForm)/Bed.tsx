'use client'

import React, { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import NcInputNumber from '@/components/NcInputNumber'
import { FC } from 'react'
import ClearDataButton from './ClearDataButton'
import ButtonSubmit from './ButtonSubmit'
import { PathName } from '@/routers/types'
import { UserPlusIcon } from '@heroicons/react/24/outline'
import { GuestsObject } from '../type'
import useStore from '@/components/ListingStore'
export interface GuestsInputProps {
	fieldClassName?: string
	className?: string
	buttonSubmitHref?: PathName
	hasButtonSubmit?: boolean
}

const Bed: FC<GuestsInputProps> = ({
	fieldClassName = '[ nc-hero-field-padding ]',
	className = '[ nc-flex-1 ]',
	buttonSubmitHref = '/listing-stay-map',
	hasButtonSubmit = true,
}) => {
	const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(0)
	const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(0)
	const [guestBeds, setguestBeds] = useState(1)
	const { setBeds, Listings } = useStore()
	const handleChangeData = (value: number, type: keyof GuestsObject) => {
		let newValue = {
			guestAdults: guestAdultsInputValue,
			guestChildren: guestChildrenInputValue,
			guestInfants: guestBeds,
		}
		if (type === 'guestAdults') {
			setGuestAdultsInputValue(value)
			newValue.guestAdults = value
		}
		if (type === 'guestChildren') {
			setGuestChildrenInputValue(value)
			newValue.guestChildren = value
		}
		if (type === 'guestInfants') {
			setguestBeds(value)
			newValue.guestInfants = value
		}
	}

	const totalGuests =
		guestChildrenInputValue + guestAdultsInputValue + guestBeds

	useEffect(() => {
		setBeds(guestBeds)
	}, [guestBeds])
	 

	return (
		<Popover className={`relative flex ${className}`}>
			{({ open }) => (
				<>
					<div
						className={`z-10 flex flex-1 items-center focus:outline-none ${
							open ? 'nc-hero-field-focused' : ''
						}`}
					>
						<Popover.Button
							className={`relative z-10 flex flex-1 items-center text-left ${fieldClassName} space-x-3 focus:outline-none`}
						>
							<div className="text-neutral-300 dark:text-neutral-400">
								<UserPlusIcon className="h-5 w-5 lg:h-7 lg:w-7" />
							</div>
							<div className="flex-grow">
								<span className="block font-semibold xl:text-lg">
									{totalGuests || ''} Bed
								</span>
							</div>

							{!!totalGuests && open && (
								<ClearDataButton
									onClick={() => {
										setGuestAdultsInputValue(0)
										setGuestChildrenInputValue(0)
										setguestBeds(0)
									}}
								/>
							)}
						</Popover.Button>

						{/* BUTTON SUBMIT OF FORM */}
						{hasButtonSubmit && (
							<div className="pr-2 xl:pr-4">
								<ButtonSubmit
									href={{
										pathname: '/listing-stay-map',
										query: {
											loc: Listings.locationInput,
											pri: Listings.inputPrice,
											Bed: Listings.Beds,
										},
									}}
									disabled={
										!Listings.locationInput ||
										!Listings.inputPrice ||
										!Listings.Beds
									}
								/>
							</div>
						)}
					</div>

					{open && (
						<div className="absolute -left-0.5 right-0.5 top-1/2 z-0 h-8 -translate-y-1/2 self-center bg-white dark:bg-neutral-800"></div>
					)}
					<Transition
						as={Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<Popover.Panel className="absolute right-0 top-full z-10 mt-3 w-full max-w-sm rounded-3xl bg-white px-4 py-5 shadow-xl dark:bg-neutral-800 sm:min-w-[340px] sm:px-8 sm:py-6">
							<NcInputNumber
								className="w-full"
								defaultValue={guestBeds}
								onChange={(value) => handleChangeData(value, 'guestInfants')}
								max={10}
								min={1}
								label="Beds"
								desc="No. of Beds"
							/>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	)
}

export default Bed
