'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/Shadcncomponents/components/ui/accordion'
import Heading from '@/shared/Heading'

const Page = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [status, setStatus] = useState('')
	const [listings, setListings] = useState<
		{
			Area: string
			coverImage: string
			placeName: string
			State: string
			Country: string
			Price: string
		}[]
	>([])

	const getListings = () => {
		setIsLoading(true)
		axios
			.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/sanctum/csrf-cookie`, {
				withCredentials: true,
			})
			.then(() => {
				return axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/listing`, {
					withCredentials: true,
				})
			})
			.then((res) => {
				// Make sure to access the listings correctly from res.data.data
				setListings(res.data.data) // Assuming res.data.data contains the array of listings
				setStatus('success')
			})
			.catch((error) => {
				console.error(error)
				setStatus('failed')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	useEffect(() => {
		getListings()
	}, [])

	// Ensure to use the correct property name (`area` vs `Area`)
	const uniqueAreas = Array.from(
		new Set(listings.map((listing) => listing.Area)),
	)

	return (
		<div className="w-full xl:mt-5 xl:px-3 xxl:mt-10 xxl:px-10">
			<p className="mb-5 text-xl font-medium">
				Total Listings ({listings.length})
			</p>
			<Accordion type="single" collapsible className="w-full">
				{uniqueAreas.map((area, index) => {
					// Filter listings based on the correct area property
					const filteredListings = listings.filter(
						(listing) => listing.Area === area,
					)

					return (
						<AccordionItem key={index} value={`item-${index}`}>
							<AccordionTrigger className="text-md rounded-lg bg-slate-100 px-3">
								{area} ({filteredListings.length})
							</AccordionTrigger>
							<AccordionContent className="mt-5 grid w-full grid-cols-1 gap-5 lg:grid-cols-4">
								{filteredListings.length > 0 ? (
									filteredListings.map((listing, idx) => (
										<div key={idx} className="w-full overflow-hidden">
											<div className="h-60 overflow-hidden rounded-lg bg-slate-300">
												<img
													src={`${process.env.NEXT_PUBLIC_SERVER_URL}/storage/${listing.coverImage}`}
													className="h-full w-full object-cover"
												/>
											</div>
											<div className="mt-3">
												<p className="text-xl">{listing.placeName}</p>
												<p className="text-md mt-1">
													{listing.State}, {listing.Country}
												</p>
												<p className="text-md mt-1">{listing.Price} /Night</p>
											</div>
										</div>
									))
								) : (
									<p>No listings available for this area.</p>
								)}
							</AccordionContent>
						</AccordionItem>
					)
				})}
			</Accordion>
		</div>
	)
}

export default Page
