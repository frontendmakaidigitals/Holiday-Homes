'use client'
import { Transition } from '@headlessui/react'
import CarCard from '@/components/CarCard'
import ExperiencesCard from '@/components/ExperiencesCard'
import StayCard from '@/components/StayCard'
import { CarDataType, ExperiencesDataType, StayDataType } from '@/data/types'
import React, { FC, Fragment, useState } from 'react'

export interface AnyReactComponentProps {
	className?: string
	listing?: StayDataType
	experiences?: ExperiencesDataType
	car?: CarDataType
	isSelected?: boolean
	lat?: number
	lng?: number
}

const AnyReactComponent: FC<AnyReactComponentProps> = ({
	className = '',
	listing,
	car,
	experiences,
	isSelected,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	console.log(car?.Price)
	const handleMouseEnter = () => setIsOpen(true)
	const handleMouseLeave = () => setIsOpen(false)

	return (
		<div
			className={`nc-AnyReactComponent relative ${className}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			aria-expanded={isOpen}
		>
			<span
				className={`flex min-w-max items-center justify-center rounded-lg px-2 py-1 text-sm font-semibold transition-colors ${
					isSelected
						? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
						: 'bg-white hover:bg-gray-900 hover:text-white dark:bg-neutral-900 dark:hover:bg-white dark:hover:text-gray-900'
				}`}
			>
				{car?.Price}
			</span>
			<Transition
				show={isOpen}
				as={Fragment}
				enter="transition-opacity duration-75"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-150"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="aspect-w-1 absolute -left-12 bottom-full z-50 w-[260px] pb-3">
					{car && <CarCard size="small" data={car} className="shadow-2xl" />}
				</div>
			</Transition>
		</div>
	)
}

export default AnyReactComponent
