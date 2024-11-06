'use client'
import React, { FC, ReactNode, useState } from 'react'
import { StayDataType } from '@/data/types'
import ButtonPrimary from '@/shared/ButtonPrimary'
import HeaderFilter from './HeaderFilter'
import StayCard from './StayCard'
import StayCard2 from './StayCard2'

// Example DEMO data for listings
export interface SectionGridFeaturePlacesProps {
	stayListings?: StayDataType[]
	gridClass?: string
	heading?: ReactNode
	subHeading?: ReactNode
	headingIsCenter?: boolean
	tabs?: string[]
	cardType?: 'card1' | 'card2'
	btnRef?:any
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
	stayListings = [],
	gridClass = '',
	heading = 'Featured places to stay',
	subHeading = 'Popular places to stay that Chisfis recommends for you',
	tabs = [
		'Business Bay',
		'Marina',
		'Downtown',
		'Jumeriah Village Circle',
		'Jumeriah Lake Triangle',
	],
	cardType = 'card2',
	btnRef
}) => {
	// State to track the selected tab (area)
	const [activeTab, setActiveTab] = useState(tabs[0])

	// Filter listings based on the active tab, with optional chaining for undefined properties
	const filteredListings = stayListings.filter(
		(stay) => stay?.Area === activeTab, // Use optional chaining to handle undefined stays
	)

	// Function to render the appropriate card based on the cardType
	const renderCard = (stay: StayDataType) => {
		let CardName = StayCard
		switch (cardType) {
			case 'card1':
				CardName = StayCard
				break
			case 'card2':
				CardName = StayCard2
				break
			default:
				CardName = StayCard
		}
		return <CardName key={stay?.id} data={stay} /> // Optional chaining for 'id' too
	}

	return (
		<div ref={btnRef} className="nc-SectionGridFeaturePlaces relative">
			{/* Header with filter and tab selection */}
			<HeaderFilter
				tabActive={activeTab}
				subHeading={subHeading}
				tabs={tabs}
				heading={heading}
				onClickTab={(tab) => setActiveTab(tab)} // Update active tab when clicked
			/>

			{/* Grid to display the filtered listings */}
			<div className={`w-full`}>
				{/* Render cards for the filtered listings */}
				{filteredListings?.length > 0 ? (
					<div
						className={`grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
					>
						{filteredListings.map((stay) => renderCard(stay))}
					</div>
				) : (
					<div className="mt-5 flex h-10 w-full items-center justify-center lg:h-[300px]">
						<p className="text-md lg:text-xl font-semibold">
							No listings available for this area.
						</p>
					</div>
				)}
			</div>

			{/* Button to show more listings */}
		</div>
	)
}

export default SectionGridFeaturePlaces
