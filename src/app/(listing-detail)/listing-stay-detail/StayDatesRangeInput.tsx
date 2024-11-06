'use client'

import React, { Fragment, useState, FC, useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { CalendarIcon } from '@heroicons/react/24/outline'
import DatePickerCustomHeaderTwoMonth from '@/components/DatePickerCustomHeaderTwoMonth'
import DatePickerCustomDay from '@/components/DatePickerCustomDay'
import DatePicker from 'react-datepicker'
import ClearDataButton from '@/app/(client-components)/(HeroSearchForm)/ClearDataButton'

export interface StayDatesRangeInputProps {
	className?: string
	setGetDay: any
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
	className = 'flex-1',
	setGetDay,
}) => {
	const [startDate, setStartDate] = useState<Date | null>(new Date())
	const [endDate, setEndDate] = useState<Date | null>(new Date())

	//

	const onChangeDate = (dates: [Date | null, Date | null]) => {
		const [start, end] = dates
		setStartDate(start)
		setEndDate(end)
	}
	const calculateDateDifference = (start: Date | null, end: Date | null) => {
		if (!start || !end) return null // Handle null values
		const timeDifference = end.getTime() - start.getTime() // Difference in milliseconds

		// Calculate difference in days, hours, and minutes
		const days = Math.floor(timeDifference / (1000 * 3600 * 24)) + 1 // Add 1 to include the start day
		const hours = Math.floor(
			(timeDifference % (1000 * 3600 * 24)) / (1000 * 3600),
		) // Remainder hours
		const minutes = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60)) // Remainder minutes

		return { days, hours, minutes }
	}

	useEffect(() => {
		const dateDifference = calculateDateDifference(startDate, endDate)
		setGetDay(dateDifference)
	}, [startDate, endDate])

	const renderInput = () => {
		return (
			<>
				<div className="text-neutral-300 dark:text-neutral-400">
					<CalendarIcon className="h-5 w-5 lg:h-7 lg:w-7" />
				</div>
				<div className="flex-grow text-left">
					<span className="block font-semibold xl:text-lg">
						{startDate?.toLocaleDateString('en-US', {
							month: 'short',
							day: '2-digit',
						}) || 'Add dates'}
						{endDate
							? ' - ' +
								endDate?.toLocaleDateString('en-US', {
									month: 'short',
									day: '2-digit',
								})
							: ''}
					</span>
					<span className="mt-1 block text-sm font-light leading-none text-neutral-400">
						{'Check in - Check out'}
					</span>
				</div>
			</>
		)
	}

	return (
		<Popover className={`StayDatesRangeInput relative z-10 flex ${className}`}>
			{({ open }) => (
				<>
					<Popover.Button
						className={`relative flex flex-1 items-center space-x-3 p-3 focus:outline-none ${
							open ? 'shadow-lg' : ''
						}`}
					>
						{renderInput()}
						{startDate && open && (
							<ClearDataButton onClick={() => onChangeDate([null, null])} />
						)}
					</Popover.Button>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<Popover.Panel className="absolute left-auto right-0 top-full z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-3xl xl:-right-10">
							<div className="overflow-hidden rounded-3xl bg-white p-8 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-neutral-800">
								<DatePicker
									selected={startDate}
									onChange={onChangeDate}
									startDate={startDate}
									endDate={endDate}
									selectsRange
									monthsShown={2}
									showPopperArrow={false}
									inline
									renderCustomHeader={(p) => (
										<DatePickerCustomHeaderTwoMonth {...p} />
									)}
									renderDayContents={(day, date) => (
										<DatePickerCustomDay dayOfMonth={day} date={date} />
									)}
								/>
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	)
}

export default StayDatesRangeInput
