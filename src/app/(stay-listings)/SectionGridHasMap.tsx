'use client'

import { FC, useState, useEffect } from 'react'
import AnyReactComponent from '@/components/AnyReactComponent/AnyReactComponent'
import { DEMO_STAY_LISTINGS } from '@/data/listings'
import ButtonClose from '@/shared/ButtonClose'
import Checkbox from '@/shared/Checkbox'
import Pagination from '@/shared/Pagination'
import TabFilters from './TabFilters'
import Heading2 from '@/shared/Heading2'
import StayCard2 from '@/components/StayCard2'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import businessBayImg from '@/images/MenuImages/businessbay.webp'
import donwtownImg from '@/images/MenuImages/downtown.webp'
import JLTImg from '@/images/MenuImages/JLT.webp'
import JVCImg from '@/images/MenuImages/JVC.jpeg'
import MarinaImg from '@/images/MenuImages/marina.jpg'
import dynamic from 'next/dynamic'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import { TaxonomyType } from '@/data/types'
const DEMO_STAYS = DEMO_STAY_LISTINGS.filter((_, i) => i < 12)
export interface SectionGridHasMapProps {}
const MapContainer = dynamic(() => import('@/components/MapContainer'), {
	ssr: false,
})
const SectionGridHasMap: FC<SectionGridHasMapProps> = () => {
	const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1)
	const [showFullMapFixed, setShowFullMapFixed] = useState(false)
	const searchParams = useSearchParams()
	const area = searchParams.get('area')
	const [isLoading, setIsLoading] = useState(false)
	const [status, setStatus] = useState('')
	const [listings, setListings] = useState([])
	const initialTabs: TaxonomyType[] = [
		{
			id: '1',
			href: '/listing-stay-map',
			name: 'Business Bay',
			taxonomy: 'category',
			count: 0,
			thumbnail: businessBayImg,
		},
		{
			id: '2',
			href: '/listing-stay-map',
			name: 'Marina',
			taxonomy: 'category',
			count: 0,
			thumbnail: MarinaImg,
		},
		{
			id: '3',
			href: '/listing-stay-map',
			name: 'Downtown',
			taxonomy: 'category',
			count: 0,
			thumbnail: donwtownImg,
		},
		{
			id: '4',
			href: '/listing-stay-map',
			name: 'Jumeriah Village Circle',
			taxonomy: 'category',
			count: 0,
			thumbnail: JVCImg,
		},
		{
			id: '5',
			href: '/listing-stay-map',
			name: 'Jumeriah Lake Triangle',
			taxonomy: 'category',
			count: 0,
			thumbnail: JLTImg,
		},
	]
	const [tabs, setTabs] = useState(initialTabs)

	interface listing {
		Area: string
	}
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
				const fetchedListings = Array.isArray(res.data.data)
					? res.data.data
					: []

				const areaCounts = fetchedListings.reduce(
					(acc: any, listing: listing) => {
						const area = listing.Area || '' // Ensure area is always a string
						acc[area] = (acc[area] || 0) + 1
						return acc
					},
					{},
				)

				// Update the tabs with the new counts
				setTabs((prevTabs) => {
					const updatedTabs = prevTabs.map((tab) => ({
						...tab,
						count: areaCounts[tab.name] || 0, // Use existing count or default to 0
					}))
					return updatedTabs
				})

				// Parse the marker field if it's a stringified JSON object
				const parsedListings = fetchedListings.map((listing: any) => {
					let marker = listing?.marker

					// If marker is a string (stringified JSON), parse it
					if (typeof marker === 'string') {
						try {
							marker = JSON.parse(marker) // Parse the string into an object
						} catch (e) {
							console.error('Error parsing marker string:', e)
						}
					}

					// Now marker should be an object with lat and lng as numbers
					return {
						...listing,
						marker: {
							lat: Number(marker?.lat), // Convert lat to number if it's not already
							lng: Number(marker?.lng), // Convert lng to number if it's not already
						},
					}
				})

				// Filter listings based on the 'area' query parameter
				const filteredListings = area
					? parsedListings.filter((listing: any) => listing.Area === area)
					: parsedListings

				setListings(filteredListings)
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

	return (
		<div>
			<div className="relative flex min-h-screen">
				{/* CARDSSSS */}
				<div className="min-h-screen w-full max-w-[1184px] flex-shrink-0 xl:w-[60%] xl:px-8 2xl:w-[60%]">
					<Heading2 className="!mb-8" />
					<div className="mb-8 lg:mb-11">
						<TabFilters />
					</div>
					<div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-x-6">
						{listings.map((item: any) => (
							<div
								key={item.id}
								onMouseEnter={() => setCurrentHoverID((_) => item.id)}
								onMouseLeave={() => setCurrentHoverID((_) => -1)}
							>
								<StayCard2 data={item} />
							</div>
						))}
					</div>
					<div className="mt-16 flex items-center justify-center">
						<Pagination />
					</div>
				</div>

				{!showFullMapFixed && (
					<div
						className={`fixed bottom-16 left-1/2 z-30 flex -translate-x-1/2 transform cursor-pointer items-center justify-center space-x-3 rounded-full bg-neutral-900 px-6 py-2 text-sm text-white shadow-2xl md:bottom-8 xl:hidden`}
						onClick={() => setShowFullMapFixed(true)}
					>
						<i className="las la-map text-lg"></i>
						<span>Show map</span>
					</div>
				)}

				{/* MAPPPPP */}
				<div
					className={`xl:static xl:block xl:flex-1 ${
						showFullMapFixed ? 'fixed inset-0 z-50' : 'hidden'
					}`}
				>
					{showFullMapFixed && (
						<ButtonClose
							onClick={() => setShowFullMapFixed(false)}
							className="absolute left-3 top-3 z-50 h-10 w-10 rounded-xl bg-white shadow-lg"
						/>
					)}

					<div className="fixed left-0 top-0 h-full w-full overflow-hidden rounded-md xl:sticky xl:top-[88px] xl:h-[calc(100vh-88px)]">
						<MapContainer
							currentHoverID={currentHoverID}
							DEMO_DATA={listings}
							listingType="car"
						/>
					</div>
				</div>
			</div>

			<div className="container overflow-hidden">
				{/* SECTION 1 */}
				<div className="relative py-16">
					<SectionSliderNewCategories categories={tabs} />
				</div>
			</div>
		</div>
	)
}

export default SectionGridHasMap
