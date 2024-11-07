import React, { FC } from 'react'
import { DEMO_STAY_LISTINGS } from '@/data/listings'
import { StayDataType } from '@/data/types'
import StartRating from '@/components/StartRating'
import Link from 'next/link'
import GallerySlider from './GallerySlider'

export interface FinalListingCardProps {
	className?: string
	data?: StayDataType
	size?: 'default' | 'small'
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0]

const FinalListingCard: FC<FinalListingCardProps> = ({
	size = 'default',
	className = '',
	data = DEMO_DATA,
}) => {
	const {
		Address,
		bedRoom,
		Price,
		reviewStart,
		reviewCount,
		id,
		placeName,
		images = [],
		State,
		Country,
	} = data

	// Validate images to ensure they are either strings or Files
	const galleryImages = images.reduce<string[]>((acc, image) => {
		if (typeof image === 'string') {
			acc.push(process.env.NEXT_PUBLIC_SERVER_URL + '/storage/' + image)
		} else if (image instanceof File) {
			acc.push(URL.createObjectURL(image))
		}
		return acc
	}, [])

	const renderSliderGallery = () => {
		if (galleryImages.length === 0) {
			return <div>No images available</div> // Or a placeholder
		}

		return (
			<div className="relative w-full">
				<GallerySlider
					uniqueID={`FinalListingCard_${id}`}
					ratioClass="aspect-w-4 aspect-h-3"
					galleryImgs={galleryImages}
					href="#"
					galleryClass={size === 'default' ? undefined : ''}
				/>
			</div>
		)
	}

	const renderContent = () => {
		return (
			<div className={size === 'default' ? 'space-y-4 p-4' : 'space-y-1 p-3'}>
				<div className={size === 'default' ? 'space-y-2' : 'space-y-1'}>
					<span className="text-sm text-neutral-500 dark:text-neutral-400">
						{bedRoom} beds
					</span>
					<div className="flex items-center space-x-2">
						<h2
							className={`font-semibold capitalize text-neutral-900 dark:text-white ${size === 'default' ? 'text-base' : 'text-base'}`}
						>
							<span className="line-clamp-1">{placeName}</span>
						</h2>
					</div>
					<div className="flex items-center space-x-1.5 text-sm text-neutral-500 dark:text-neutral-400">
						{/* Your SVG icon here */}
						<span className="">
							{State}, {Country}
						</span>
					</div>
				</div>
				<div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
				<div className="flex items-center justify-between">
					<span className="text-base font-semibold">
						{Price}
						<span className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
							/night
						</span>
					</span>
					{!!reviewStart && (
						<StartRating reviewCount={reviewCount} point={reviewStart} />
					)}
				</div>
			</div>
		)
	}

	return (
		<div
			className={`nc-FinalListingCard group relative bg-white dark:bg-neutral-900 ${
				size === 'default'
					? 'border border-neutral-100 dark:border-neutral-800'
					: ''
			} overflow-hidden rounded-2xl transition-shadow hover:shadow-xl ${className}`}
			data-nc-id="FinalListingCard"
		>
			{renderSliderGallery()}
			<Link href="/listing-stay-detail">{renderContent()}</Link>
		</div>
	)
}

export default FinalListingCard
