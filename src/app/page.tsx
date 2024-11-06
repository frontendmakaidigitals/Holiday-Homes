'use client'
import React, { useEffect, useState } from 'react'
import SectionHero from '@/app/(server-components)/SectionHero'
import BgGlassmorphism from '@/components/BgGlassmorphism'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionOurFeatures from '@/components/SectionOurFeatures'
import SectionGridFeaturePlaces from '@/components/SectionGridFeaturePlaces'
import SectionOfferCard from '@/components/SectionOffer'
import CtaSection from '@/components/CtaSection'
import AdditionalServices from '@/components/AdditionalServices'
import { MdArrowOutward } from 'react-icons/md'
import TestitmonialCarousal from '@/components/TestitmonialCarousal'
import businessBayImg from '@/images/MenuImages/businessbay.webp'
import donwtownImg from '@/images/MenuImages/downtown.webp'
import JLTImg from '@/images/MenuImages/JLT.webp'
import JVCImg from '@/images/MenuImages/JVC.jpeg'
import MarinaImg from '@/images/MenuImages/marina.jpg'
import Heading from '@/shared/Heading'
import axios from 'axios'
import { TaxonomyType } from '@/data/types'
function PageHome() {
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

	const [isLoading, setIsLoading] = useState(false)
	const [status, setStatus] = useState('')
	const [listings, setListings] = useState([])
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
					: [] // Ensure it's an array
				setListings(fetchedListings)

				setStatus('success')

				// Calculate counts for each area
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
		<main className="nc-PageHome relative overflow-hidden">
			{/* GLASSMORPHISM */}
			<BgGlassmorphism />

			<div className="mb-24 px-4">
				{/* SECTION HERO */}
				<SectionHero className="pt-3 lg:pb-16" />
			</div>

			<div className="container relative mb-24 mt-10 space-y-24 lg:mb-28 lg:space-y-28">
				{/* If listings are loading or empty, show a loading message */}
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<>
						<SectionSliderNewCategories categories={tabs} />
						<SectionOurFeatures />
						<SectionGridFeaturePlaces
							stayListings={listings}
							cardType="card2"
						/>

						<PromotinalOffers />
						<TestitmonialCarousal />
					</>
				)}
			</div>

			<AdditionalServices />

			<div className="w-full bg-gradient-to-tl from-stone-100 via-transparent to-primary-300 !px-0">
				<CtaSection />
			</div>
		</main>
	)
}

export default PageHome

const PromotinalOffers = () => {
	return (
		<div>
			<Heading desc="Promotional Offer">Promotional Offer</Heading>
			<div className="grid h-[400px] w-full grid-cols-1 gap-5 lg:grid-cols-2">
				<div className="relative flex h-full w-full cursor-pointer items-end overflow-hidden rounded-xl border border-gray-300 p-5 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
					<img
						src={'/OfferImage/1.png'}
						className="absolute left-0 top-0 h-full w-full object-cover"
					/>
					<button className="relative z-10 flex items-center gap-2 rounded-lg bg-primary-6000 px-3 py-2 text-slate-50 transition-all duration-300 hover:bg-primary-400 hover:shadow-lg">
						Know more <MdArrowOutward />
					</button>
				</div>
				<div className="relative flex h-full w-full cursor-pointer items-end overflow-hidden rounded-xl border border-gray-300 p-5 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
					<img
						src={'/OfferImage/2.png'}
						className="absolute left-0 top-0 h-full w-full object-cover"
					/>
					<button className="relative z-10 flex items-center gap-2 rounded-lg bg-primary-6000 px-3 py-2 text-slate-50 transition-all duration-300 hover:bg-primary-400 hover:shadow-lg">
						Know more <MdArrowOutward />
					</button>
				</div>
			</div>
		</div>
	)
}
