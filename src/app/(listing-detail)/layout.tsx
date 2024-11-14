'use client'

import BackgroundSection from '@/components/BackgroundSection'
import ListingImageGallery from '@/components/listing-image-gallery/ListingImageGallery'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import { usePathname } from 'next/navigation'
import { ReactNode, Suspense } from 'react'
import MobileFooterSticky from './(components)/MobileFooterSticky'
import { imageGallery as listingStayImageGallery } from './listing-stay-detail/constant'
import { imageGallery as listingCarImageGallery } from './listing-car-detail/constant'
import { imageGallery as listingExperienceImageGallery } from './listing-experiences-detail/constant'
import businessBayImg from '@/images/MenuImages/businessbay.webp'
import donwtownImg from '@/images/MenuImages/downtown.webp'
import JLTImg from '@/images/MenuImages/JLT.webp'
import JVCImg from '@/images/MenuImages/JVC.jpeg'
import MarinaImg from '@/images/MenuImages/marina.jpg'
import Image from 'next/image'
import { TaxonomyType } from '@/data/types'
import useStore from '@/components/ListingStore'
import { useState, useEffect } from 'react'
const DetailtLayout = ({ children }: { children: ReactNode }) => {
	const thisPathname = usePathname()

	const getImageGalleryListing = () => {
		if (thisPathname?.includes('/listing-stay-detail')) {
			return listingStayImageGallery
		}
		if (thisPathname?.includes('/listing-car-detail')) {
			return listingCarImageGallery
		}
		if (thisPathname?.includes('/listing-experiences-detail')) {
			return listingExperienceImageGallery
		}

		return []
	}
	const { Listings } = useStore()
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

	useEffect(() => {
		const fetchedListings = Array.isArray(Listings.data) ? Listings.data : []
		const areaCounts = fetchedListings.reduce((acc: any, listing: any) => {
			const area = listing.Area || '' // Ensure area is always a string
			acc[area] = (acc[area] || 0) + 1
			return acc
		}, {})
		setTabs((prevTabs) => {
			const updatedTabs = prevTabs.map((tab) => ({
				...tab,
				count: areaCounts[tab.name] || 0, // Use existing count or default to 0
			}))
			return updatedTabs
		})
	}, [Listings])

	return (
		<div className="ListingDetailPage">
			<Suspense>
				<ListingImageGallery images={getImageGalleryListing()} />
			</Suspense>

			<div className="ListingDetailPage__content container">{children}</div>

			{/* OTHER SECTION */}
			<div className="container py-24 lg:py-32">
				<div className="relative py-16">
					<BackgroundSection />
					<div className="relative py-16">
						<SectionSliderNewCategories categories={tabs} />
					</div>
				</div>
				<SectionSubscribe2 className="pt-24 lg:pt-32" />
			</div>

			{/* STICKY FOOTER MOBILE */}
			
		</div>
	)
}

export default DetailtLayout
