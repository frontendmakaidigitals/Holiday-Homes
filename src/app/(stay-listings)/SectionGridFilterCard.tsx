import React, { FC } from 'react'
import { DEMO_STAY_LISTINGS } from '@/data/listings'
import { StayDataType } from '@/data/types'
import Pagination from '@/shared/Pagination'
import TabFilters from './TabFilters'
import Heading2 from '@/shared/Heading2'
import StayCard2 from '@/components/StayCard2'
import { useSearchParams } from 'next/navigation'

export interface SectionGridFilterCardProps {
	className?: string
	data?: StayDataType[]
}

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8)

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
	className = '',
	data = DEMO_DATA,
}) => {
	const searchParams = useSearchParams()

	 
	
	return (
		<div
			className={`nc-SectionGridFilterCard ${className}`}
			data-nc-id="SectionGridFilterCard"
		>
			<Heading2 heading="Stays in Tokyo" />

			<div className="mb-8 lg:mb-11">
				<TabFilters />
			</div>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4"></div>
			<div className="mt-16 flex items-center justify-center">
				<Pagination />
			</div>
		</div>
	)
}

export default SectionGridFilterCard
