'use client'

import React, { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { FC } from 'react'
import { BanknotesIcon } from '@heroicons/react/24/outline' // Importing the icon
import ClearDataButton from './ClearDataButton' // Clear button for resetting the price
import ButtonSubmit from './ButtonSubmit' // Submit button if needed
import { PathName } from '@/routers/types' // Assuming you use this for routing
import useStore from '@/components/ListingStore'
export interface PriceSliderProps {
	fieldClassName?: string
	className?: string
	buttonSubmitHref?: PathName
	hasButtonSubmit?: boolean
}

const PriceSlider: FC<PriceSliderProps> = ({
	fieldClassName = '[ nc-hero-field-padding ]',
	className = '[ nc-flex-1 ]',
	buttonSubmitHref = '/listing-stay-map',
	hasButtonSubmit = true,
}) => {
	const [priceValue, setPriceValue] = useState<number>(50) // Default price value
	const { setPrice, Listings } = useStore()
	const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPriceValue(Number(e.target.value)) // Update the price from the slider
	}

	useEffect(() => {
		setPrice(priceValue)
	}, [priceValue])

	return (
		<Popover className={`relative flex ${className}`}>
			{({ open }) => (
				<>
					<div
						className={`z-10 flex flex-1 items-center focus:outline-none ${
							open ? 'nc-hero-field-focused' : ''
						}`}
					>
						<Popover.Button
							className={`relative z-10 flex flex-1 items-center text-left ${fieldClassName} space-x-3 focus:outline-none`}
						>
							{/* Icon next to price */}
							<div className="text-neutral-300 dark:text-neutral-400">
								<BanknotesIcon className="h-5 w-5 lg:h-7 lg:w-7" />
							</div>

							<div className="flex-grow">
								<span className="block font-semibold xl:text-lg">
									Price: {priceValue} AED
								</span>
							</div>

							{!!priceValue && open && (
								<ClearDataButton
									onClick={() => setPriceValue(50)} // Reset price on clear
								/>
							)}
						</Popover.Button>

						{/* BUTTON SUBMIT */}
					</div>

					{open && (
						<div className="absolute -left-0.5 right-0.5 top-1/2 z-0 h-8 -translate-y-1/2 self-center bg-white dark:bg-neutral-800"></div>
					)}
					<Transition
						as={Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<Popover.Panel className="absolute right-0 top-full z-10 mt-3 w-full max-w-sm rounded-3xl bg-white px-4 py-5 shadow-xl dark:bg-neutral-800 sm:min-w-[340px] sm:px-8 sm:py-6">
							<div className="w-full">
								{/* Slider input */}
								<input
									type="range"
									min="0"
									max="1000"
									value={priceValue}
									onChange={handlePriceChange}
									className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-300"
								/>
								{/* Price Display */}
								<div className="mt-2 flex justify-between text-sm text-neutral-500 dark:text-neutral-400">
									<span>$0</span>
									<span>${priceValue}</span>
									<span>$1000</span>
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	)
}

export default PriceSlider
