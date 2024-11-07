'use client'
import React, { FC, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useStore from '../FormStore'
import FinalListingCard from '@/components/FinalListingCard'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { EyeIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export interface PageAddListing10Props {}

const PageAddListing8: FC<PageAddListing10Props> = () => {
	const router = useRouter()
	const { ListingData } = useStore()

	// Debugging: Log ListingData to inspect its structure
	useEffect(() => {
		console.log('ListingData:', ListingData)
	}, [ListingData])

	return (
		<>
			<div>
				<h2 className="text-2xl font-semibold">Congratulations 🎉</h2>
				<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
					Excellent, congratulations on completing the listing, it is waiting to
					be reviewed for publication
				</span>
			</div>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

			<div>
				<h3 className="text-lg font-semibold">This is your listing</h3>
				<div className="max-w-xs">
					{ListingData &&
					ListingData.images &&
					ListingData.images.length > 0 ? (
						<FinalListingCard className="mt-8" data={ListingData} />
					) : (
						<div>No images available for this listing.</div>
					)}
				</div>
				<div className="mt-8 flex items-center space-x-5">
					<Link href={'/admin/listings/'}>
						<ButtonPrimary>
							<EyeIcon className="h-5 w-5" />
							<span className="ml-3">View All Listing</span>
						</ButtonPrimary>
					</Link>
				</div>
			</div>
		</>
	)
}

export default PageAddListing8
