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
import { useRouter } from 'next/navigation'
import { GrStatusWarning } from 'react-icons/gr'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { LiaEditSolid } from 'react-icons/lia'
import Link from 'next/link'
import GallerySlider from '@/components/GallerySlider'
import Badge from '@/shared/Badge'
import { IoStar } from 'react-icons/io5'

 

const Page = ({}) => {
	const size ='default'
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
			propertyType: string
			checkedAmenities: any
			discountedPrice: any
			orgPrice: any
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
	const renderAmenities = (checkedAmenities: any) => {
		// Parse the checked amenities
		const parseAmenities: any = JSON.parse(checkedAmenities)

		// Combine the arrays
		const transformedAmenities = [
			...parseAmenities.included,
			...parseAmenities.other,
			...parseAmenities.safe,
		]

		const firstTwoAmenities = transformedAmenities.slice(0, 2)
		const remainingAmenitiesCount =
			transformedAmenities.length - firstTwoAmenities.length

		return (
			<div className="flex flex-wrap items-center gap-2">
				{/* Render the first two amenities */}
				{firstTwoAmenities.map((amenity, index) => (
					<Badge
						key={index}
						name={amenity}
						className="rounded-full !text-[.7rem]"
					/>
				))}

				{/* Render the "X more" badge if there are remaining amenities */}
				{remainingAmenitiesCount > 0 && (
					<Badge
						key="more"
						name={`+ ${remainingAmenitiesCount} `}
						className="rounded-full"
					/>
				)}

				{/* Optionally show a fallback message if no amenities available */}
				{transformedAmenities.length === 0 && <div>No amenities available</div>}
			</div>
		)
	}

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
														pathname: `/admin/EditListing/1`,
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
											<div
												className={
													size === 'default'
														? 'mt-3 space-y-3'
														: 'mt-2 space-y-2'
												}
											>
												<div className="space-y-2">
													<div className="flex w-full items-center justify-between">
														<span className="mr-1 rounded-full bg-[#ffd9c24f] px-3 py-[.1rem] text-[.6rem] text-[#6E2A00]">
															{listing.propertyType}{' '}
														</span>{' '}
														<div className="flex items-center gap-1">
															<IoStar className="text-yellow-500" />
															<IoStar className="text-yellow-500" />
															<IoStar className="text-yellow-500" />
															<IoStar className="text-yellow-500" />
															<IoStar className="text-yellow-500" />
														</div>
													</div>
													<div className="flex items-center space-x-2">
														<h2
															className={`text-xl font-semibold capitalize text-neutral-900 dark:text-white ${
																size === 'default' ? 'text-base' : 'text-base'
															}`}
														>
															<span className="line-clamp-1">
																{listing.placeName}
															</span>
														</h2>
													</div>
													<div>{renderAmenities(listing.checkedAmenities)}</div>
													<div className="flex items-center space-x-1.5 text-sm text-neutral-500 dark:text-neutral-400">
														{size === 'default' && (
															<svg
																className="h-4 w-4"
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={1.5}
																	d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
																/>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={1.5}
																	d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
																/>
															</svg>
														)}
														<span className="">
															{listing.State}, {listing.Country}
														</span>
													</div>
												</div>
												<div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
												<div className="flex items-center justify-start gap-3">
													<span className="relative text-xl text-red-500">
														{listing.orgPrice}
														<span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rotate-45 bg-red-500"></span>
													</span>
													<span className="text-xl font-semibold">
														{listing.discountedPrice}{' '}
														<span className="text-lg font-normal">AED</span>
													</span>
												</div>
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
