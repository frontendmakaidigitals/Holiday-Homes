'use client'

import React, { FC, useEffect, useState } from 'react'
import Input from '@/shared/Input'
import FormItem from '../FormItem'
import useStore from '../FormStore'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { Route } from '@/routers/types'
import { MultiSelect } from '@/components/MultiSelect'
import { useRouter, useSearchParams } from 'next/navigation'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectGroup,
} from '@/Shadcncomponents/components/ui/select'
import Textarea from '@/shared/Textarea'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
export interface PageAddListing1Props {
	params?: { stepIndex: string } // Make params optional
}

const PageAddListing1: FC<PageAddListing1Props> = ({
	params = { stepIndex: '1' },
}) => {
	const {
		ListingData,
		setPropertyType,
		setRentalTags,
		setPlaceName,
		setDescription,
		setPrice,
		setArea,
	} = useStore()
	const index = Number(params.stepIndex) || 1
	const router = useRouter()
	const { toast } = useToast()
	const searchParams = useSearchParams()

	const search = searchParams.get('id')
	console.log(search)

	const NextBTN = () => {
		if (ListingData.propertyType === '') {
			return toast({
				variant: 'destructive',
				title: 'Property type is required',
				description: 'Feild is Empty',
			})
		}
		if (ListingData.placeName === '') {
			return toast({
				variant: 'destructive',
				title: 'Name of the Place is required',
				description: 'Feild is Empty',
			})
		}
		if (ListingData.Price === '') {
			return toast({
				variant: 'destructive',
				title: 'Price is required',
				description: 'Feild is Empty',
			})
		}
		if (ListingData.RentalTags.length === 0) {
			return toast({
				variant: 'destructive',
				title: 'Rental Tags is required',
				description: 'At least one need to be selected',
			})
		}
		if (ListingData.Description === '') {
			return toast({
				variant: 'destructive',
				title: 'Description is required',
				description: 'Feild is Empty',
			})
		}
		if (ListingData.Area === '') {
			return toast({
				variant: 'destructive',
				title: 'Area is required',
				description: 'At least one need to be selected',
			})
		}
		router.push(`/admin/EditListing/${index + 1}?id=${search}`)
	}
	const BackBTN = () => {
		if (index > 1) {
			router.push(`/admin/EditListing/${index - 1}`)
		} else {
			router.push('/admin/EditListing/1')
		}
	}
	const nextBtnText = index > 9 ? 'Publish listing' : 'Continue'
	const PropertyType: string[] = ['Apartment', 'Villa', 'Townhouse']
	const RentalForms = [
		{ value: 'Hot Property', label: 'Hot Property' },
		{ value: 'Limited Time Offer', label: 'Limited Time Offer' },
		{ value: 'New', label: 'New' },
		{ value: 'Sea View', label: 'Sea View' },
		{ value: 'Burj Khalifa View', label: 'Burj Khalifa View' },
		{ value: 'City View', label: 'City View' },
		{ value: 'Canal View', label: 'Canal View' },
		{ value: 'Pool View', label: 'Pool View' },
	]
	const areaDropDown: string[] = [
		'Business Bay',
		'Marina',
		'Downtown',
		'Jumeriah Village Circle',
		'Jumeriah Lake Triangle',
	]

	const [isLoading, setIsLoading] = useState(false)
	const [status, setStatus] = useState('')
	const [listings, setListing]: any = useState([])
	const [amenities, setAmenities] = useState<string[]>([])

	const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
		null,
	)

	useEffect(() => {
		if (listings) {
			setPropertyType(listings?.propertyType)
		}
	}, [listings])

	return (
		<>
			<h2 className="text-2xl font-semibold">Choosing listing categories</h2>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			<div className="space-y-8">
				<FormItem
					label="Choose a property type"
					desc="Hotel: Professional hospitality businesses that usually have a unique style or theme defining their brand and decor"
				>
					<div className="relative">
						<Select
							value={ListingData.propertyType || ''} // Ensure value is a string
							onValueChange={(e) => setPropertyType(e)}
						>
							<SelectTrigger
								className={`text-md w-full border bg-white py-2 font-medium`}
							>
								<SelectValue
									placeholder="Choose a property type"
									className="placeholder:text-gray-600"
								/>
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{PropertyType.map((item, index) => (
										<SelectItem key={index} value={item}>
											{item}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</FormItem>

				<FormItem
					label="Place name"
					desc="A catchy name usually includes: House name + Room name + Featured property + Tourist destination"
				>
					<Input
						onChange={(e) => setPlaceName(e.target.value)}
						value={ListingData.placeName || ''} // Ensure value is a string
						placeholder="Place name"
					/>
				</FormItem>
				<FormItem
					label="Choose a Relative Area"
					desc="Hotel: Professional hospitality businesses that usually have a unique style or theme defining their brand and decor"
				>
					<div className="relative">
						<Select
							value={ListingData.Area || ''} // Ensure value is a string
							onValueChange={(e) => setArea(e)}
						>
							<SelectTrigger
								className={`text-md w-full border bg-white py-2 font-medium`}
							>
								<SelectValue
									placeholder="Choose a property type"
									className="placeholder:text-gray-600"
								/>
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{areaDropDown.map((item, index) => (
										<SelectItem key={index} value={item}>
											{item}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</FormItem>
				<FormItem
					label="Price (AED)"
					desc="A catchy name usually includes: House name + Room name + Featured property + Tourist destination"
				>
					<Input
						type="text" // Keep as text to allow formatting
						onChange={(e) => {
							const inputValue = e.target.value

							// Remove any non-digit characters and keep commas
							const formattedValue = inputValue.replace(/[^0-9,]/g, '')

							// Update state with the numeric value (removing commas for storage)
							const numericValue = formattedValue.replace(/,/g, '')
							setPrice(numericValue)
						}}
						value={
							ListingData.Price
								? new Intl.NumberFormat('en-US').format(
										Number(ListingData.Price),
									)
								: ''
						} // Format with commas
						placeholder="Price"
					/>
				</FormItem>

				<FormItem
					label="Featured Tags"
					desc="Entire place: Guests have the whole place to themselves—there's a private entrance and no shared spaces. A bedroom, bathroom, and kitchen are usually included."
				>
					<div className="relative">
						{ListingData.RentalTags != 0 ? (
							<MultiSelect
								options={RentalForms}
								onValueChange={setRentalTags}
								defaultValue={ListingData.RentalTags} // Ensure defaultValue is an array
								placeholder="Select Types"
								variant="inverted"
								animation={2}
								maxCount={3}
							/>
						) : null}
					</div>
				</FormItem>

				<div>
					<h2 className="text-lg font-semibold">
						Your place description for client
					</h2>
					<span className="mt-2 block text-sm text-neutral-500 dark:text-neutral-400">
						Mention the best features of your accommodation, any special
						amenities like fast Wi-Fi or parking, as well as things you like
						about the neighborhood.
					</span>
				</div>

				<Textarea
					value={ListingData.Description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="..."
					rows={14}
					className="resize-none"
				/>

				<div className="flex justify-end space-x-5">
					<button
						onClick={BackBTN}
						className="rounded-full border border-gray-600 bg-transparent px-5 disabled:!cursor-not-allowed disabled:!bg-slate-300 disabled:!text-slate-500"
						disabled={index === 1}
					>
						Go back
					</button>
					<ButtonPrimary onClick={NextBTN}>{nextBtnText}</ButtonPrimary>
				</div>
			</div>
		</>
	)
}

export default PageAddListing1
