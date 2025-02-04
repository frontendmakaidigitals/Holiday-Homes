'use client'

import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline'
import React, { useState, useRef, useEffect, FC } from 'react'
import ClearDataButton from './ClearDataButton'
import useStore from '@/components/ListingStore'
import { List } from 'lucide-react'
export interface LocationInputProps {
	placeHolder?: string
	desc?: string
	className?: string
	divHideVerticalLineClass?: string
	autoFocus?: boolean
}

const LocationInput: FC<LocationInputProps> = ({
	autoFocus = false,
	placeHolder = 'Location',
	desc = 'Where are you going?',
	className = 'nc-flex-1.5',
	divHideVerticalLineClass = 'left-10 -right-0.5',
}) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const { Listings, setCountry, setEmirates, setArea } = useStore()
	const [value, setValue] = useState('')



	const [showPopover, setShowPopover] = useState(autoFocus)

	useEffect(() => {
		setShowPopover(autoFocus)
	}, [autoFocus])

	useEffect(() => {
		if (eventClickOutsideDiv) {
			document.removeEventListener('click', eventClickOutsideDiv)
		}
		showPopover && document.addEventListener('click', eventClickOutsideDiv)
		return () => {
			document.removeEventListener('click', eventClickOutsideDiv)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showPopover])

	useEffect(() => {
		if (showPopover && inputRef.current) {
			inputRef.current.focus()
		}
	}, [showPopover])

	const eventClickOutsideDiv = (event: MouseEvent) => {
		if (!containerRef.current) return
		// CLICK IN_SIDE
		if (!showPopover || containerRef.current.contains(event.target as Node)) {
			return
		}
		// CLICK OUT_SIDE
		setShowPopover(false)
	}

	const handleSelectLocation = (item: { Area: string; emirates: string; Country: string }) => {
		setValue(`${item.Area}, ${item.emirates}, ${item.Country}`);
		setCountry(item.Country)
		setArea(item.Area)
		setEmirates(item.emirates)
		setShowPopover(false)
	}



	const [filteredResults, setFilteredResults] = useState<any>([])

	useEffect(() => {
		if (value && Array.isArray(Listings?.data)) {
			const filteredCountries = Listings.data
				.filter(
					(item: any) =>
						item.Country.toLowerCase().includes(value.toLowerCase()) ||
						item.Area.toLowerCase().includes(value.toLowerCase()) || 
						item.emirates.toLowerCase().includes(value.toLowerCase()) 
						 
				)
				.map((item: any) => item)

				interface ListingItem {
					id: string;
					Country: string;
					State: string;
					propertyType: string;
					towerName: string;
					Area: string;
					City: string;
					emirates: string;
					propertyTitle: string;
				}

				const uniqueResults = filteredCountries.filter(
					(item: ListingItem, index: number, self: ListingItem[]) =>
						index === self.findIndex((t) => t.Area === item.Area)
				);
			
				setFilteredResults(uniqueResults);
		} else {
			setFilteredResults([])
		}
	}, [value, Listings?.data])

	const renderRecentSearches = () => {
		return (
			<>
				<h3 className="mt-2 block px-4 text-base font-semibold text-neutral-800 dark:text-neutral-100 sm:mt-0 sm:px-8 sm:text-lg">
					Suggested Locations
				</h3>
				<div className="mt-2">
					{filteredResults?.map((item: any) => (
						<span
							onClick={() => handleSelectLocation(item)}
							key={item}
							className="flex cursor-pointer items-center space-x-3 px-4 py-4 hover:bg-gray-100 dark:hover:bg-neutral-700 sm:space-x-4 sm:px-8"
						>
							<span className="block text-neutral-400">
								<ClockIcon className="h-4 w-4 sm:h-6 sm:w-6" />
							</span>
							<span className="block font-medium text-neutral-700 dark:text-neutral-200">
								{item}
							</span>
						</span>
					))}
				</div>
			</>
		)
	}

	const renderSearchValue = () => {
		return (
			<>
				{filteredResults?.map((item: any) => (
					<div
						onClick={() => handleSelectLocation(item)}
						key={item.Area}
						className="flex cursor-pointer items-start hover:bg-slate-100 justify-start space-x-3 px-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 sm:space-x-4 sm:px-8"
					>
						<div className="block text-neutral-400">
							<MapPinIcon className="h-4 w-4 sm:h-6 sm:w-6" />
						</div>
						<div className='flex flex-col items-start w-full justify-start'>
							<p className=" text-xl font-bold text-neutral-700 dark:text-neutral-200">
								{item.Area}
							</p>
							<p className=' capitalize'>
								<span>Dubai,</span>{' '}
								<span>UAE</span>
							</p>
						</div>
					</div>
				))}
			</>
		)
	}

	return (
		<div className={`relative flex ${className}`} ref={containerRef}>
			<div
				onClick={() => setShowPopover(true)}
				className={`[ nc-hero-field-padding ] relative z-10 flex flex-1 flex-shrink-0 cursor-pointer items-center space-x-3 text-left focus:outline-none ${
					showPopover ? 'nc-hero-field-focused' : ''
				}`}
			>
				<div className="text-gray-900 dark:text-gray-400">
					<MapPinIcon className="h-5 w-5 lg:h-7 lg:w-7" />
				</div>
				<div className="flex-grow">
					<input
						className={`block w-full truncate border-none !bg-transparent p-0 font-semibold focus:outline-none focus:ring-0 dark:placeholder-neutral-200 xl:text-lg`}
						placeholder={placeHolder}
						value={value}
						onChange={(e) => {
							setValue(e.currentTarget.value)
						}}
					/>
					<span className="mt-0.5 block text-sm font-light text-neutral-400">
						<span className="line-clamp-1">{!!value ? placeHolder : desc}</span>
					</span>
					{value && showPopover && (
						<ClearDataButton
							onClick={() => {
								setValue('')
							}}
						/>
					)}
				</div>
			</div>

			{showPopover && (
				<div
					className={`absolute top-1/2 z-0 h-8 -translate-y-1/2 self-center bg-white dark:bg-neutral-800 ${divHideVerticalLineClass}`}
				></div>
			)}

			{showPopover && (
				<div className="absolute left-0 top-full z-40 mt-3 max-h-96 w-full min-w-[300px] overflow-y-auto rounded-3xl bg-white py-3 shadow-xl dark:bg-neutral-800 sm:min-w-[500px] sm:py-6">
					<h3 className="mt-2 block px-4 text-base font-semibold text-neutral-800 dark:text-neutral-100 sm:mt-0 sm:px-8 sm:text-lg">
						Type location to search
					</h3>
					{renderSearchValue()}
					{value.length > 2 && filteredResults?.length === 0 && (
						<p>No results</p>
					)}
				</div>
			)}
		</div>
	)
}

export default LocationInput
