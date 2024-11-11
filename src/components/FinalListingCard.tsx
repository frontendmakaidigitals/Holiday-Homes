import React, { FC } from 'react'
import { DEMO_STAY_LISTINGS } from '@/data/listings'
import { StayDataType } from '@/data/types'
import StartRating from '@/components/StartRating'
import Link from 'next/link'
import GallerySlider from './GallerySlider'
import { IoStar } from 'react-icons/io5'
import Badge from '@/shared/Badge'

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
		galleryImgs,
		propertyType,
		listingCategory,
		address,
		title,
		bedRoom,
		href = '/listing-stay-detail',
		like,
		saleOff,
		isAds,
		Price,
		reviewStart,
		reviewCount,
		id,
		imagesUrls,
		State,
		placeName,
		Country,
		beds,
		orgPrice,
		discountedPrice,
		checkedAmenities,
		listingBadge,
		images = [],
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

	const renderAmenities = () => {
		// Parse the checked amenities
		const parseAmenities: any = checkedAmenities

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

	const renderContent = () => {
		return (
			<div className={size === 'default' ? 'mt-3 space-y-3' : 'mt-2 space-y-2'}>
				<div className="space-y-2">
					<div className="flex w-full items-center justify-between">
						<span className="mr-1 rounded-full bg-[#ffd9c24f] px-3 py-[.1rem] text-[.6rem] text-[#6E2A00]">
							{propertyType}{' '}
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
							<span className="line-clamp-1">{placeName}</span>
						</h2>
					</div>
					<div>{renderAmenities()}</div>
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
							{State}, {Country}
						</span>
					</div>
				</div>
				<div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
				<div className="flex items-center justify-start gap-3">
					<span className="relative text-xl text-red-500">
						{orgPrice}
						<span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rotate-45 bg-red-500"></span>
					</span>
					<span className="text-xl font-semibold">
						{discountedPrice} <span className="text-lg font-normal">AED</span>
					</span>
				</div>
			</div>
		)
	}

	return (
		<div className={`nc-StayCard2 group relative ${className}`}>
			{renderSliderGallery()}
			<Link href={href}>{renderContent()}</Link>
		</div>
	)
}

export default FinalListingCard
