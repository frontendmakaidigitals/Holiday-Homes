'use client'
import React, { FC, useEffect, useState } from 'react'
import Checkbox from '@/shared/Checkbox'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { useRouter, useSearchParams } from 'next/navigation'
import useStore from '../FormStore'
import { useToast } from '@/hooks/use-toast'

export interface PageAddListing4Props {
	params?: { stepIndex: string }
}

// Define the type for the amenities
interface Amenities {
	label: string
	checked: boolean
}

// Define the overall amenities structure
interface AmenitiesState {
	included: Amenities[]
	other: Amenities[]
	safe: Amenities[]
}

const PageAddListing4: FC<PageAddListing4Props> = ({
	params = { stepIndex: '4' },
}) => {
	const index = Number(params.stepIndex) || 1
	const nextBtnText = index > 9 ? 'Publish listing' : 'Continue'
	const router = useRouter()
	const { setCheckedAmenities, ListingData } = useStore()
	const searchParams = useSearchParams()

	const search = searchParams.get('id')
	const { toast } = useToast()

	// Ensure checkedAmenities has a default value if undefined
	const checkedAmenities = ListingData?.checkedAmenities || {
		included: [],
		other: [],
		safe: [],
	}

	const [amenities, setAmenities] = useState<AmenitiesState>({
		included: [],
		other: [],
		safe: [],
	})

	// Ensure state is set correctly when ListingData is ready
	useEffect(() => {
		if (ListingData?.checkedAmenities) {
			setAmenities(ListingData.checkedAmenities)
		}
	}, [ListingData?.checkedAmenities])

	// Initialize amenities with the checkedAmenities values or fallback to default
	useEffect(() => {
		setAmenities({
			included: [
				'Swimming Pool',
				'Gym',
				'Parking',
				'Wifi',
				'Internet',
				'TV',
				'Air conditioning',
				'Fan',
				'Private entrance',
				'Dryer',
				'Heater',
				'Washing machine',
				'Detergent',
				'Clothes dryer',
				'Baby cot',
				'Desk',
				'Fridge',
			].map((label) => ({
				label,
				checked: checkedAmenities.included.includes(label),
			})),
			other: [
				'Bed linen',
				'Wardrobe',
				'Cloth hook',
				'Extra cushion',
				'Gas stove',
				'Toilet paper',
				'Free toiletries',
				'Makeup table',
				'Hot pot',
				'Bathroom heaters',
				'Kettle',
				'Dishwasher',
				'BBQ grill',
				'Toaster',
				'Towel',
				'Dining table',
			].map((label) => ({
				label,
				checked: checkedAmenities.other.includes(label),
			})),
			safe: [
				'First Aid Kit',
				'Fire siren',
				'Fire extinguisher',
				'Anti-theft key',
				'Safe vault',
			].map((label) => ({
				label,
				checked: checkedAmenities.safe.includes(label),
			})),
		})
	}, [checkedAmenities])

	const handleCheckboxChange = (
		category: 'included' | 'other' | 'safe',
		label: string,
	) => {
		setAmenities((prev) => {
			const updatedCategory = prev[category].map((option) =>
				option.label === label
					? { ...option, checked: !option.checked }
					: option,
			)

			// Update the checked amenities in the store
			setCheckedAmenities({
				...checkedAmenities,
				[category]: updatedCategory
					.filter((option) => option.checked)
					.map((option) => option.label),
			})

			return {
				...prev,
				[category]: updatedCategory,
			}
		})
	}

	const NextBTN = () => {
		const { included, other, safe } = checkedAmenities

		// Validation check
		if (included.length === 0) {
			return toast({
				variant: 'destructive',
				title: 'Please select at least one included amenity.',
				description: 'No Marker is Detected on Map',
			})
		}
		if (other.length === 0) {
			return toast({
				variant: 'destructive',
				title: 'Please select at least one other amenity.',
				description: 'No Marker is Detected on Map',
			})
		}
		if (safe.length === 0) {
			return toast({
				variant: 'destructive',
				title: 'Please select at least one safe amenity.',
				description: 'No Marker is Detected on Map',
			})
		}

		router.push(`/admin/EditListing/${index + 1}?id=${search}`)
	}

	const BackBTN = () => {
		if (index > 1) {
			router.push(`/admin/EditListing/${index - 1}?id=${search}`)
		} else {
			router.push(`/admin/EditListing/1?id=${search}`)
		}
	}

	return (
		<div>
			<h2 className="text-2xl font-semibold">Amenities</h2>
			<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
				Many customers have searched for accommodation based on amenities
				criteria.
			</span>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

			<div className="space-y-8">
				{Object.entries(amenities).map(([category, options], idx) => (
					<div key={idx}>
						<label className="text-lg font-semibold">
							{category === 'included'
								? 'Included Amenities'
								: category === 'other'
									? 'Other Amenities'
									: 'Safe Amenities'}
						</label>
						<div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
							{options.map((option: any, i: number) => (
								<Checkbox
									key={i}
									label={option.label}
									name={option.label}
									checked={option.checked} // controlled checkbox
									onChange={() =>
										handleCheckboxChange(
											category as 'included' | 'other' | 'safe',
											option.label,
										)
									}
								/>
							))}
						</div>
					</div>
				))}

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
		</div>
	)
}

export default PageAddListing4
