'use client'
import React, { FC, useState } from 'react'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import useStore from '../FormStore'
import ButtonPrimary from '@/shared/ButtonPrimary'
import NcInputNumber from '@/components/NcInputNumber'
import DatePickerCustomDay from '@/components/DatePickerCustomDay'
import DatePickerCustomHeaderTwoMonth from '@/components/DatePickerCustomHeaderTwoMonth'
import DatePicker from 'react-datepicker'
export interface PageAddListing7Props {
	params?: { stepIndex: number }
}

const PageAddListing7: FC<PageAddListing7Props> = ({
	params = { stepIndex: 7 },
}) => {
	const { ListingData, setEditId } = useStore()
	const index = Number(params.stepIndex)
	const nextBtnText = index > 9 ? 'Publish listing' : 'Continue'
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [status, setStatus] = useState('')
	const searchParams = useSearchParams()
	const search = searchParams.get('id')
	const [dates, setDates] = useState<number[]>([
		new Date('2023/02/06').getTime(),
		new Date('2023/02/09').getTime(),
		new Date('2023/02/15').getTime(),
	])
	// Function to check and convert images to Blobs only if they are URLs
	const convertImagesToBlobs = async (images: any) => {
		const blobPromises = images.map(async (image: any) => {
			if (image instanceof Blob || image instanceof File) {
				return image // Already a Blob or File, no conversion needed
			} else if (typeof image === 'string') {
				// If the image is a URL (string), leave it as is (do not convert to blob)
				return image // Return the URL as a string
			} else {
				// For any other case, fetch the URL and convert to Blob
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

			// Handle the cover image (if it's a file or Blob, append it as is)
			if (
				coverImage &&
				(coverImage instanceof File || coverImage instanceof Blob)
			) {
				formData.append('coverImage', coverImage) // Append the cover image directly as a file
			} else if (typeof coverImage === 'string') {
				// If cover image is a URL, leave it as is (append the URL)
				formData.append('coverImage', coverImage)
			}

			// Convert images to blobs or URLs as appropriate
			if (images && images.length > 0) {
				const processedImages = await convertImagesToBlobs(images)
				processedImages.forEach((image, index) => {
					// If the image is a URL (string), append it as a URL, otherwise append the Blob
					if (typeof image === 'string') {
						formData.append('images[]', image) // URL directly
					} else {
						formData.append('images[]', image, `image-${index}.jpg`) // Blob
					}
				})
			}

			// Send the FormData to the API
			console.log(ListingData)
			await axios.get(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/sanctum/csrf-cookie`,
				{ withCredentials: true },
			)

			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/api/update/${search}`,
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
