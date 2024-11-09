import React, { FC } from 'react'
import GallerySlider from '@/components/GallerySlider'
import { DEMO_STAY_LISTINGS } from '@/data/listings'
import { StayDataType } from '@/data/types'
import StartRating from '@/components/StartRating'
import BtnLikeIcon from '@/components/BtnLikeIcon'
import SaleOffBadge from '@/components/SaleOffBadge'
import Badge from '@/shared/Badge'
import Link from 'next/link'
import { UrlObject } from 'url'
import { IoStar } from 'react-icons/io5'
import { parse } from 'path'
export interface StayCard2Props {
	className?: string
	data?: StayDataType
	size?: 'default' | 'small'
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0]

const StayCard2: FC<StayCard2Props> = ({
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
	} = data

	const renderBadge = () => {
		const parseBadges = JSON.parse(listingBadge)

		return (
			parseBadges.image ? (
				<div className="absolute left-3 top-3 z-[99] h-7 w-auto rounded-full bg-slate-50/90 px-3 py-1">
					<img
						src={parseBadges.image}
						className="h-full w-full object-contain"
						alt={parseBadges.label}
					/>
				</div> 
			): null
		)
	}
	const renderSliderGallery = () => {
		return (
			<div className="relative w-full">
				{renderBadge()}
				<GallerySlider
					uniqueID={`StayCard2_${id}`}
					ratioClass="aspect-w-12 aspect-h-11"
					galleryImgs={imagesUrls}
					imageClass="rounded-lg"
					href={
						{
							pathname: href, // The base path
							query: { id: id }, // The query parameter
						} as UrlObject
					}
				/>
			</div>
		)
	}
	const renderAmenities = () => {
		// Parse the checked amenities
		const parseAmenities = JSON.parse(checkedAmenities)

		// Combine the arrays
		const transformedAmenities = [
			...parseAmenities.included,
			...parseAmenities.other,
			...parseAmenities.safe,
		]

		// Log the transformedAmenities to ensure the data is correct
		console.log(transformedAmenities) // This will show the combined array in the console

		// Get the first two amenities and the remaining ones
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
						121
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

export default StayCard2
