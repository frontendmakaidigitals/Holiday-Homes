import React, { FC } from 'react'
import LocationInput from '../LocationInput'
import GuestsInput from '../GuestsInput'
import StayDatesRangeInput from './StayDatesRangeInput'
import Bed from '../Bed'
import PriceSlider from '../PriceSlider'
const StaySearchForm: FC<{}> = ({}) => {
	const renderForm = () => {
		return (
			<form className="relative mt-8 flex w-full rounded-3xl bg-white shadow-xl dark:bg-neutral-800 dark:shadow-2xl">
				<LocationInput className="flex" />
				<div className="h-8 self-center border-r border-slate-200 dark:border-slate-700"></div>
				<StayDatesRangeInput className="flex-1" />
				<div className="h-8 self-center border-r border-slate-200 dark:border-slate-700"></div>
				<PriceSlider />
				<div className="h-8 self-center border-r border-slate-200 dark:border-slate-700"></div>
				<Bed />
			</form>
		)
	}

	return renderForm()
}

export default StaySearchForm
