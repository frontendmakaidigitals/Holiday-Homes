import React, { FC } from 'react'
import { DEMO_STAY_LISTINGS } from '@/data/listings'
import { StayDataType } from '@/data/types'
import StartRating from '@/components/StartRating'
import BtnLikeIcon from '@/components/BtnLikeIcon'
import SaleOffBadge from '@/components/SaleOffBadge'
import Badge from '@/shared/Badge'
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
		images,
	} = data

	const galleryImages = images.map(
		(image) => image.url || URL.createObjectURL(image),
	)

	const renderSliderGallery = () => {
		return (
			<div className="relative w-full">
				<GallerySlider
					uniqueID={`FinalListingCard_${id}`}
					ratioClass="aspect-w-4 aspect-h-3 "
					galleryImgs={galleryImages}
					href={'/listing-stay-detail'}
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
						{placeName} · {bedRoom} beds
					</span>
					<div className="flex items-center space-x-2">
						<h2
							className={`font-semibold capitalize text-neutral-900 dark:text-white ${
								size === 'default' ? 'text-base' : 'text-base'
							}`}
						>
							<span className="line-clamp-1">title</span>
						</h2>
					</div>
					<div className="flex items-center space-x-1.5 text-sm text-neutral-500 dark:text-neutral-400">
						{
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
						}
						<span className="">{Address}</span>
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
			<Link href={'/listing-stay-detail'}>{renderContent()}</Link>
		</div>
	)
}

export default FinalListingCard
