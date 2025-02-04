'use client'

import { MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useState, useEffect, useRef, FC } from 'react'
import useStore from '@/components/ListingStore'
interface Props {
	onClick?: () => void
	onChange?: (value: { Area: string; emirates: string; Country: string }) => void
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
	const { Listings, setLocationInput, setCountry, setEmirates, setArea } = useStore()
	const containerRef = useRef(null)
	const inputRef = useRef(null)

	useEffect(() => {
		setValue(defaultValue)
	}, [defaultValue])

	const handleSelectLocation = (item: { Area: string; emirates: string; Country: string }) => {
		// DO NOT REMOVE SETTIMEOUT FUNC
		setTimeout(() => {
			setValue(`${item.Area}, 'Dubai', UAE`);
			setCountry(item.Country)
			setArea(item.Area)
			setEmirates(item.emirates)
			onChange && onChange(item)
		}, 0)
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
				id: string
				Country: string
				State: string
				propertyType: string
				towerName: string
				Area: string
				City: string
				emirates: string
				propertyTitle: string
			}

			const uniqueResults = filteredCountries.filter(
				(item: ListingItem, index: number, self: ListingItem[]) =>
					index === self.findIndex((t) => t.Area === item.Area),
			)

			setFilteredResults(uniqueResults)
		} else {
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
								className="mb-1 flex items-start justify-start space-x-3 py-2 text-sm"
								onClick={() => handleSelectLocation(item)}
								key={item}
							>
								<div className='block'>
									<MapPinIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
								</div>
								<div className="flex w-full flex-col items-start justify-start">
									<p className="text-xl font-bold text-neutral-700 dark:text-neutral-200">
										{item.Area}
									</p>
									<p className="capitalize">
										<span>Dubai,</span>
										<span>{' '}UAE</span>
									</p>
								</div>
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
