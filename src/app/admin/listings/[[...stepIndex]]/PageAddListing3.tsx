'use client'
import NcInputNumber from '@/components/NcInputNumber'
import React, { FC, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import FormItem from '../FormItem'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Input from '@/shared/Input'
import useStore from '../FormStore'
import { useToast } from '@/hooks/use-toast'
export interface PageAddListing3Props {
	params?: { stepIndex: number } // Optional prop
}

const PageAddListing3: FC<PageAddListing3Props> = ({
	params = { stepIndex: 3 },
}) => {
	const index = params.stepIndex
	const { toast } = useToast()

	const nextBtnText = index > 9 ? 'Publish listing' : 'Continue'
	const {
		ListingData,
		setAcreage,
		setBedRoom,
		setBeds,
		setGuestNum,
		setBathroom,
	} = useStore()
	const router = useRouter()

	const NextBTN = () => {
		if (!ListingData.acreage) {
			return toast({
				variant: 'destructive',
				title: 'Acreage is required',
				description: 'Feild is Empty',
			})
		}
		router.push(`/admin/listings/${index + 1}`)
	}

	const BackBTN = () => {
		if (index > 1) {
			router.push(`/admin/listings/${index - 1}`)
		} else {
			router.push('/admin/listings/1')
		}
	}

	const [guest, setGuest] = React.useState(ListingData.guestNum || 1)
	const [bedRoom, setBedRoomState] = React.useState(ListingData.bedRoom || 1)
	const [beds, setBedsState] = React.useState(ListingData.beds || 1)
	const [bathroom, setBathroomState] = React.useState(ListingData.bathroom || 1)

	useEffect(() => {
		// Calculate max guests based on the number of beds
		const maxGuests = beds * 2
		if (guest > maxGuests) {
			const newBeds = Math.ceil(guest / 2)
			setBedsState(newBeds)
			setBeds(newBeds)
		}
	}, [guest, beds])

	useEffect(() => {
		// Calculate bedroom and bathroom based on guest count
		const newBedRooms = Math.ceil(guest / 2) // 1 bedroom for every 2 guests
		const newBathrooms = Math.ceil(guest / 2) // 1 bathroom for every 2 guests

		// Update bedroom only if the new value is greater
		if (newBedRooms > bedRoom) {
			setBedRoomState(newBedRooms)
			setBedRoom(newBedRooms)
		}

		// Update bathroom only if the user hasn't manually adjusted it
		if (newBathrooms > bathroom) {
			setBathroomState(newBathrooms)
			setBathroom(newBathrooms)
		}
	}, [guest, setBathroom, setBedRoom, bedRoom, bathroom])

	useEffect(() => {
		setGuest(ListingData.guestNum || 1)
		setBedRoomState(ListingData.bedRoom || 1)
		setBedsState(ListingData.beds || 1)
		setBathroomState(ListingData.bathroom || 1)
	}, [ListingData])

	useEffect(() => {
		// Reset bathroom count to 0 when decreasing beds
		if (beds < ListingData.beds) {
			setBathroomState(0)
			setBathroom(0) // Reset bathroom count to 0
		}
	}, [beds, ListingData.beds])

	return (
		<>
			<h2 className="text-2xl font-semibold">Size of your location</h2>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			{/* FORM */}
			<div className="space-y-8">
				{/* ITEM */}
				<FormItem label="Acreage (Sq.ft)">
					<Input
						placeholder="Enter Area in Sq.ft"
						type="text" // Keep as text to allow formatting
						onChange={(e) => {
							const inputValue = e.target.value

							// Remove any non-digit characters and keep commas
							const formattedValue = inputValue.replace(/[^0-9,]/g, '')

							// Update state with the numeric value (removing commas for storage)
							const numericValue = formattedValue.replace(/,/g, '')
							setAcreage(numericValue)
						}}
						value={
							ListingData.Acreage
								? new Intl.NumberFormat('en-US').format(
										Number(ListingData.Acreage),
									)
								: ''
						} // Format with commas
					/>
				</FormItem>
				<NcInputNumber
					label="Guests"
					defaultValue={guest}
					min={1}
					onChange={(value) => {
						setGuest(value)
						setGuestNum(value)
					}}
				/>
				<NcInputNumber
					label="Bedroom"
					defaultValue={bedRoom}
					min={1}
					onChange={(value) => {
						setBedRoomState(value)
						setBedRoom(value)
					}}
				/>
				<NcInputNumber
					label="Beds"
					defaultValue={beds}
					min={1}
					onChange={(value) => {
						setBedsState(value)
						setBeds(value)
					}}
				/>
				<NcInputNumber
					label="Bathroom"
					defaultValue={bathroom}
					min={1} // Allow bathroom to be 0 if needed
					onChange={(value) => {
						setBathroomState(value)
						setBathroom(value) // Allow manual adjustments
					}}
				/>
				<NcInputNumber label="Kitchen" defaultValue={1} min={1} max={1} />

				<div className="flex justify-end space-x-5">
					<button
						onClick={BackBTN}
						className="rounded-full border border-gray-600 bg-transparent px-5 disabled:!cursor-not-allowed disabled:!bg-slate-300 disabled:!text-slate-500"
						disabled={index === 1}
					>
						Go Back
					</button>
					<ButtonPrimary onClick={NextBTN}>{nextBtnText}</ButtonPrimary>
				</div>
			</div>
		</>
	)
}

export default PageAddListing3
