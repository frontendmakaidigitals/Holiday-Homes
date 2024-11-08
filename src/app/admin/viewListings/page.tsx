'use client'
import { MdClose } from 'react-icons/md'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/Shadcncomponents/components/ui/accordion'
import Heading from '@/shared/Heading'
import { useRouter } from 'next/navigation'
import { GrStatusWarning } from 'react-icons/gr'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { LiaEditSolid } from 'react-icons/lia'
import Link from 'next/link'
const Page = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [status, setStatus] = useState('')
	const [showPopUp, setShowPopUp] = useState(false)
	const [id, setId] = useState<number | null>(null)
	const [listings, setListings] = useState<
		{
			Area: string
			coverImage: string
			placeName: string
			State: string
			Country: string
			Price: string
			id: number
		}[]
	>([])
	const router = useRouter()

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
	const delListings = (id: number | null) => {
		setIsLoading(true)
		axios
			.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/sanctum/csrf-cookie`, {
				withCredentials: true,
			})
			.then(() => {
				return axios.delete(
					`${process.env.NEXT_PUBLIC_SERVER_URL}/api/listing/${id}`,
					{
						withCredentials: true,
					},
				)
			})
			.then((res) => {
				setStatus('success')
				router.refresh()
			})
			.catch((error) => {
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
			{showPopUp && (
				<PopUp
					setShowPopUp={setShowPopUp}
					id={id}
					delListings={delListings}
					isLoading={isLoading}
				/>
			)}
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
										<div
											key={idx}
											className="group relative w-full overflow-hidden"
										>
											<div className="absolute right-1 top-1 z-10 hidden items-center gap-2 group-hover:flex">
												<Link
													href={{
														pathname: '/admin/EditListing',
														query: { id: listing.id },
													}}
													className="rounded-full bg-primary-200 p-2 transition-all duration-300 hover:scale-105 hover:bg-white"
												>
													<LiaEditSolid />
												</Link>
												<button
													onClick={() => {
														setId(listing.id)
														setShowPopUp(true)
													}}
													className="rounded-full bg-red-200 p-2 transition-all duration-300 hover:scale-105 hover:bg-red-400"
												>
													<MdClose />
												</button>
											</div>
											<div className="aspect-1 overflow-hidden rounded-lg bg-slate-300">
												<img
													src={`${process.env.NEXT_PUBLIC_SERVER_URL}/storage/${listing.coverImage}`}
													className="h-full w-full object-cover"
												/>
											</div>
											<div className="mt-3">
												<p className="font-semibold xl:text-lg xxl:text-xl">
													{listing.placeName}
												</p>
												<p className="text-md mt-1">
													{listing.State}, {listing.Country}
												</p>
												<p className="text-md mt-1">{listing.Price} /Night</p>
											</div>
										</div>
									))
								) : (
									<div className="w-ful flex h-full items-center justify-center">
										<p>No listings available for this area.</p>
									</div>
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

const PopUp = ({
	setShowPopUp,
	id,
	delListings,
	isLoading,
}: {
	setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>
	id: number | null
	delListings: (id: number | null) => void
	isLoading: boolean
}) => {
	return (
		<div className="fixed left-0 top-0 z-[99] flex h-screen w-screen items-center justify-center bg-slate-900/60">
			<div className="flex flex-col items-center justify-center rounded-xl bg-white p-10 shadow-xl">
				<div className="flex size-14 items-center justify-center rounded-full bg-slate-200">
					<GrStatusWarning className="mb-1 text-3xl text-red-500" />
				</div>
				<p className="mt-5 text-xl font-semibold">Delete Listing</p>
				<p>You are going to delete this listing</p>
				<div className="mt-5 flex items-center gap-4">
					<ButtonPrimary
						onClick={() => delListings(id)}
						disabled={isLoading}
						loading={isLoading}
						className="rounded-full bg-red-500 !py-2 px-5 leading-normal text-white hover:bg-red-400"
					>
						Delete
					</ButtonPrimary>
					<button
						disabled={isLoading}
						onClick={() => setShowPopUp(false)}
						className="rounded-full bg-primary-50 px-5 py-2 disabled:bg-slate-300 disabled:text-slate-500"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	)
}
