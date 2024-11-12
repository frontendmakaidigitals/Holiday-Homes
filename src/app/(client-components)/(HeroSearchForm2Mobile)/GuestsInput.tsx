'use client'
import React, { useEffect, useState } from 'react'
import NcInputNumber from '@/components/NcInputNumber'
import { FC } from 'react'
import { GuestsObject } from '../type'
import useStore from '@/components/ListingStore'
export interface GuestsInputProps {
	defaultValue?: GuestsObject
	onChange?: (data: GuestsObject) => void
	className?: string
}

const GuestsInput: FC<GuestsInputProps> = ({
	defaultValue,
	onChange,
	className = '',
}) => {
	const { Listings, setBeds } = useStore()
	const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(
		Listings.Beds,
	)

	useEffect(() => {
		setBeds(guestAdultsInputValue)
	}, [guestAdultsInputValue])

	const handleChangeData = (value: number, type: keyof GuestsObject) => {
		let newValue = {
			guestAdults: guestAdultsInputValue,
		}
		if (type === 'guestAdults') {
			setGuestAdultsInputValue(value)
			newValue.guestAdults = value
		}

		onChange && onChange(newValue)
	}

	return (
		<div className={`relative flex flex-col p-5 ${className}`}>
			<span className="mb-5 block text-xl font-semibold sm:text-2xl">
				{`Choose Required Beds`}
			</span>
			<NcInputNumber
				className="w-full"
				defaultValue={guestAdultsInputValue}
				onChange={(value) => handleChangeData(value, 'guestAdults')}
				max={10}
				min={1}
				label="Beds"
				desc="Choose Beds"
			/>
		</div>
	)
}

export default GuestsInput
