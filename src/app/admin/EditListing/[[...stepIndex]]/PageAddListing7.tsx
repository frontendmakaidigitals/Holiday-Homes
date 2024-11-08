'use client'
import DatePickerCustomDay from '@/components/DatePickerCustomDay'
import DatePickerCustomHeaderTwoMonth from '@/components/DatePickerCustomHeaderTwoMonth'
import NcInputNumber from '@/components/NcInputNumber'
import React, { FC, useState } from 'react'
import DatePicker from 'react-datepicker'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { useRouter, useSearchParams } from 'next/navigation'
import useStore from '../FormStore'
import axios from 'axios'

export interface PageAddListing7Props {
	params?: { stepIndex: number }
}

const PageAddListing7: FC<PageAddListing7Props> = ({
	params = { stepIndex: 7 },
}) => {
	const [dates, setDates] = useState<number[]>([
		new Date('2023/02/06').getTime(),
		new Date('2023/02/09').getTime(),
		new Date('2023/02/15').getTime(),
	])
	const { ListingData, setEditId } = useStore()
	const index = Number(params.stepIndex)
	const nextBtnText = index > 9 ? 'Publish listing' : 'Continue'
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [status, setStatus] = useState('')
	const searchParams = useSearchParams()
	const search = searchParams.get('id')

	const convertImagesToBlobs = async (images: any) => {
		const blobPromises = images.map(async (image: any) => {
			if (image instanceof Blob) {
				return image // Already a Blob
			} else {
				// If image is a URL, fetch it and convert to Blob
				const response = await fetch(image)
				return await response.blob()
			}
		})
		return await Promise.all(blobPromises)
	}

	const NextBTN = async () => {
		setIsLoading(true)
		const {
			images,
			checkedAmenities,
			houseRules,
			marker,
			coverImage,
			...listingDataWithoutImages
		} = ListingData || {}

		try {
			// Create a FormData object
			const formData = new FormData()

			// Append other listing data to FormData
			for (const key in listingDataWithoutImages) {
				// If the value is an object (like checkedAmenities, marker, or houseRules), stringify it
				if (typeof listingDataWithoutImages[key] === 'object') {
					formData.append(key, JSON.stringify(listingDataWithoutImages[key]))
				} else {
					formData.append(key, listingDataWithoutImages[key])
				}
			}

			// Handle the marker object separately (if it exists)
			if (marker && typeof marker === 'object') {
				formData.append('marker', JSON.stringify(marker))
			}

			// Handle the checkedAmenities object separately (if it exists)
			if (checkedAmenities && typeof checkedAmenities === 'object') {
				formData.append('checkedAmenities', JSON.stringify(checkedAmenities))
			}

			// Handle the houseRules object separately (if it exists)
			if (houseRules && typeof houseRules === 'object') {
				formData.append('houseRules', JSON.stringify(houseRules))
			}

			// Handle the cover image (if it exists)
			if (coverImage && coverImage instanceof File) {
				formData.append('coverImage', coverImage) // Append the cover image directly as a file
			}

			// Convert images to blobs and append to FormData
			if (images && images.length > 0) {
				const blobs = await convertImagesToBlobs(images)
				blobs.forEach((blob, index) => {
					formData.append('images[]', blob, `image-${index}.jpg`) // Ensure it's an array
				})
			}

			// Send the FormData to the API
			await axios.get(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/sanctum/csrf-cookie`,
				{
					withCredentials: true,
				},
			)

			const response = await axios.put(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/api/listing/${search}`,
				formData,
				{
					withCredentials: true,
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				},
			)

			setStatus('success')

			setEditId(response.data.data.id)
			router.push(`/admin/EditListing/${index + 1}?id=${search}`)
		} catch (error: any) {
			console.error('Error uploading data:', error)
			setStatus('failed')
			if (error.response) {
				console.log('Server error:', error.response.data) // Log server-side error message
			}
		} finally {
			setIsLoading(false)
			setStatus('')
		}
	}

	const BackBTN = () => {
		if (index > 1) {
			router.push(`/admin/EditListing/${index - 1}?id=${search}`)
		} else {
			router.push(`/admin/EditListing/1?id=${search}`)
		}
	}

	return (
		<>
			<div>
				<h2 className="text-2xl font-semibold">How long can guests stay?</h2>
				<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
					{` Shorter trips can mean more reservations, but you'll turn over your
          space more often.`}
				</span>
			</div>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			{/* FORM */}
			<div className="space-y-7">
				{/* ITEM */}
				<NcInputNumber label="Nights min" defaultValue={1} />
				<NcInputNumber label="Nights max" defaultValue={99} />
			</div>

			{/* Set your availability */}
			<div>
				<h2 className="text-2xl font-semibold">Set your availability</h2>
				<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
					Editing your calendar is easy—just select a date to block or unblock
					it. You can always make changes after you publish.
				</span>
			</div>

			<div className="addListingDatePickerExclude">
				<DatePicker
					onChange={(date) => {
						let newDates = []

						if (!date) {
							return
						}
						const newTime = date.getTime()
						if (dates.includes(newTime)) {
							newDates = dates.filter((item) => item !== newTime)
						} else {
							newDates = [...dates, newTime]
						}
						setDates(newDates)
					}}
					monthsShown={2}
					showPopperArrow={false}
					excludeDates={dates.filter(Boolean).map((item) => new Date(item))}
					inline
					renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
					renderDayContents={(day, date) => (
						<DatePickerCustomDay dayOfMonth={day} date={date} />
					)}
				/>

				<div className="mt-8 flex justify-end space-x-5">
					<button
						onClick={BackBTN}
						className="rounded-full border border-gray-600 bg-transparent px-5 disabled:!cursor-not-allowed disabled:!bg-slate-300 disabled:!text-slate-500"
						disabled={index === 1}
					>
						Go Back
					</button>
					<ButtonPrimary
						loading={isLoading}
						className={`${status === 'failed' ? 'bg-red-500' : ''}`}
						onClick={NextBTN}
					>
						{nextBtnText}
					</ButtonPrimary>
				</div>
			</div>
		</>
	)
}

export default PageAddListing7
