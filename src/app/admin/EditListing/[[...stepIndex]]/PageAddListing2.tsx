'use client' // Ensure this file runs on the client-side
import Label from '@/components/Label'
import { FC, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Input from '@/shared/Input'
import FormItem from '../FormItem'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import useStore from '../FormStore'
import dynamic from 'next/dynamic'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectGroup,
} from '@/Shadcncomponents/components/ui/select'

import { useToast } from '@/hooks/use-toast'
// Dynamically import the MapComponent to prevent server-side rendering issues
const DynamicMap = dynamic(() => import('@/components/MapComponent'), {
	ssr: false, // This will prevent the map from rendering on the server side
})

export interface PageAddListing2Props {
	params: { stepIndex: number }
}

const PageAddListing2: FC<PageAddListing2Props> = ({
	params = { stepIndex: 2 },
}) => {
	const index = params.stepIndex

	const {
		ListingData,
		setCity,
		setCountry,
		setStreet,
		setState,
		setPin,
		setRoomNum,
		setAddress,
		setMarker,
		setEmirates
	} = useStore()

	const nextBtnText = index > 9 ? 'Publish listing' : 'Continue'
	const router = useRouter()
	const { toast } = useToast()
	const searchParams = useSearchParams()

	const search = searchParams.get('id')

	// State for the marker

	const NextBTN = () => {
		if (ListingData.Country === '') {
			return toast({
				variant: 'destructive',
				title: 'Country is required',
				description: 'Feild is Empty',
			})
		}
		if (ListingData.Street === '') {
			return toast({
				variant: 'destructive',
				title: 'Street is required',
				description: 'Feild is Empty',
			})
		}

		if (ListingData.City === '') {
			return toast({
				variant: 'destructive',
				title: 'City is required',
				description: 'Feild is Empty',
			})
		}

		if (!ListingData.Address) {
			return toast({
				variant: 'destructive',
				title: 'Marking on Map is required',
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
	const country = ['UAE', 'Dubai']
	const emirates = [
		'Dubai',
		'Abu Dhabi',
		'Sharjah',
		'Ajman',
		'Ras Al Khaimah',
		'Umm Al Quwain',
		'Fujairah',
	]

	return (
		<>
			<h2 className="text-2xl font-semibold">Your place location</h2>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			<div className="space-y-8">
				<FormItem label="Country/Region">
					<div className="relative">
						<Select
							value={ListingData.Country || ''}
							onValueChange={(e) => setCountry(e)}
						>
							<SelectTrigger
								className={`text-md w-full border bg-white py-2 font-medium`}
							>
								<SelectValue
									placeholder="Select a country"
									className="placeholder:text-gray-600"
								/>
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{country.map((item, index) => (
										<SelectItem key={index} value={item}>
											{item}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</FormItem>
				<FormItem label="Street">
					<Input
						placeholder="Street"
						value={ListingData.Street || ''}
						onChange={(e) => setStreet(e.target.value)}
					/>
				</FormItem>
				<FormItem label="Room number (optional)">
					<Input
						placeholder="Room number (optional)"
						value={ListingData.RoomNum || ''}
						onChange={(e) => setRoomNum(e.target.value)}
					/>
				</FormItem>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-5">
					<FormItem label="Area">
						<Input
							placeholder="Area"
							value={ListingData.City || ''}
							onChange={(e) => setCity(e.target.value)}
						/>
					</FormItem>
					<FormItem label='Emirates'>
					<Select
						value={ListingData.Emirates || ''}
						onValueChange={(e) => setEmirates(e)}
					>
						<SelectTrigger
							className={`text-md w-full border bg-white py-2 font-medium`}
						>
							<SelectValue
								placeholder="Select a Emirates"
								className="placeholder:text-gray-600"
							/>
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{emirates.map((item, index) => (
									<SelectItem key={index} value={item}>
										{item}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
					</FormItem>
					<FormItem label="Postal code">
						<Input
							placeholder="Postal Code"
							value={ListingData.postalCode || ''}
							onChange={(e) => setPin(e.target.value)}
						/>
					</FormItem>
				</div>
				<div>
					<Label>Detailed address</Label>
					<span className="mt-1 block text-sm text-neutral-500 dark:text-neutral-400">
						{ListingData.Address}
					</span>
					<div className="mt-4">
						<div className="aspect-h-5 aspect-w-5 sm:aspect-h-3">
							<div className="overflow-hidden rounded-xl">
								<DynamicMap
									marker={ListingData.marker}
									setMarker={setMarker}
									setAddress={setAddress}
								/>
							</div>
						</div>
						<p className="mt-2 text-sm font-semibold">
							Make sure Location marked on the map is same as the address
						</p>
					</div>
				</div>
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

export default PageAddListing2
