'use client'

import { MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useState, useEffect, useRef, FC } from 'react'
import useStore from '@/components/ListingStore'
interface Props {
	onClick?: () => void
	onChange?: (value: string) => void
	className?: string
	defaultValue?: string
	headingText?: string
}

const LocationInput: FC<Props> = ({
	onChange = () => {},
	className = '',
	defaultValue = 'United States',
	headingText = 'Where to?',
}) => {
	const [value, setValue] = useState('')
	const { Listings, setLocationInput } = useStore()
	const containerRef = useRef(null)
	const inputRef = useRef(null)

	useEffect(() => {
		setValue(defaultValue)
	}, [defaultValue])

	const handleSelectLocation = (item: string) => {
		// DO NOT REMOVE SETTIMEOUT FUNC
		setTimeout(() => {
			setValue(item)
			setLocationInput(item)
			onChange && onChange(item)
		}, 0)
	}
	const [filteredResults, setFilteredResults] = useState<any>([])

	useEffect(() => {
		// Check if `Listings.data` is a valid array and `value` is not empty
		if (value && Array.isArray(Listings?.data)) {
			// Filter the countries based on the value
			const filteredCountries = Listings.data
				.filter(
					(item: any) =>
						item.Country.toLowerCase().includes(value.toLowerCase()), // Case insensitive search
				)
				.map((item: any) => item.Country) // Extract the Country value

			// Log the filtered countries before deduplication
			console.log('Filtered Countries before deduplication:', filteredCountries)

			// Use Set to remove duplicates and convert it to an array using Array.from()
			setFilteredResults(Array.from(new Set(filteredCountries)))
		} else {
			// If value is empty or Listings is not valid, clear the results
			setFilteredResults([])
		}
	}, [value, Listings?.data])
	const renderSearchValues = ({
		heading,
		items,
	}: {
		heading: string
		items: string[]
	}) => {
		return (
			<>
				<p className="block text-base font-semibold">
					{heading || 'Destinations'}
				</p>
				<div className="mt-3">
					{filteredResults.map((item: any) => {
						return (
							<div
								className="mb-1 flex items-center space-x-3 py-2 text-sm"
								onClick={() => handleSelectLocation(item)}
								key={item}
							>
								<MapPinIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
								<span className="">{item}</span>
							</div>
						)
					})}
				</div>
			</>
		)
	}

	return (
		<div className={`${className}`} ref={containerRef}>
			<div className="p-5">
				<span className="block text-xl font-semibold sm:text-2xl">
					{headingText}
				</span>
				<div className="relative mt-5">
					<input
						className={`block w-full truncate rounded-xl border border-neutral-900 bg-transparent px-4 py-3 pr-12 text-base font-bold leading-none placeholder-neutral-500 placeholder:truncate focus:outline-none focus:ring-0 dark:border-neutral-200 dark:placeholder-neutral-300`}
						placeholder={'Search destinations'}
						value={value}
						onChange={(e) => setValue(e.currentTarget.value)}
						ref={inputRef}
					/>
					<span className="absolute right-2.5 top-1/2 -translate-y-1/2">
						<MagnifyingGlassIcon className="h-5 w-5 text-neutral-700 dark:text-neutral-400" />
					</span>
				</div>
				<div className="mt-7">
					{renderSearchValues({
						heading: 'Locations',
						items: [],
					})}
				</div>
			</div>
		</div>
	)
}

export default LocationInput
