'use client'
import DatePickerCustomDay from '@/components/DatePickerCustomDay'
import DatePickerCustomHeaderTwoMonth from '@/components/DatePickerCustomHeaderTwoMonth'
import NcInputNumber from '@/components/NcInputNumber'
import React, { FC, useState } from 'react'
import DatePicker from 'react-datepicker'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { useRouter } from 'next/navigation'
import { Route } from '@/routers/types'
import { useToast } from '@/hooks/use-toast'
import useStore from '../FormStore'

export interface PageAddListing7Props {
	params?: { stepIndex: number }
}
const PageAddListing7: FC<PageAddListing7Props> = ({
	params = { stepIndex: 7 },
}) => {
	const [dates, setDates] = useState<number[]>([
		new Date('2023/02/06').getTime(),
		new Date('2023/02/09').getTime(),
		new Date('2023/02/15').getTime(),
	])

	const index = Number(params.stepIndex)
	const nextBtnText = index > 9 ? 'Publish listing' : 'Continue'
	const router = useRouter()

	const NextBTN = () => {
		router.push(`/admin/listings/${index + 1}`)
	}

	const BackBTN = () => {
		if (index > 1) {
			router.push(`/admin/listings/${index - 1}`)
		} else {
			router.push('/admin/listings/1')
		}
	}

	return (
		<>
			<div>
				<h2 className="text-2xl font-semibold">How long can guests stay?</h2>
				<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
					{` Shorter trips can mean more reservations, but you'll turn over your
          space more often.`}
				</span>
			</div>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			{/* FORM */}
			<div className="space-y-7">
				{/* ITEM */}
				<NcInputNumber label="Nights min" defaultValue={1} />
				<NcInputNumber label="Nights max" defaultValue={99} />
			</div>

			{/*  */}
			<div>
				<h2 className="text-2xl font-semibold">Set your availability</h2>
				<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
					Editing your calendar is easy—just select a date to block or unblock
					it. You can always make changes after you publish.
				</span>
			</div>

			<div className="addListingDatePickerExclude">
				<DatePicker
					onChange={(date) => {
						let newDates = []

						if (!date) {
							return
						}
						const newTime = date.getTime()
						if (dates.includes(newTime)) {
							newDates = dates.filter((item) => item !== newTime)
						} else {
							newDates = [...dates, newTime]
						}
						setDates(newDates)
					}}
					// selected={startDate}
					monthsShown={2}
					showPopperArrow={false}
					excludeDates={dates.filter(Boolean).map((item) => new Date(item))}
					inline
					renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
					renderDayContents={(day, date) => (
						<DatePickerCustomDay dayOfMonth={day} date={date} />
					)}
				/>

				<div className="flex justify-end mt-8 space-x-5">
					<button
						onClick={BackBTN}
						className="rounded-full border border-gray-600 bg-transparent px-5 disabled:!cursor-not-allowed disabled:!bg-slate-300 disabled:!text-slate-500"
						disabled={index === 1}
					>
						Go Back
					</button>
					<ButtonPrimary onClick={NextBTN}>{nextBtnText}</ButtonPrimary>
				</div>
			</div>
		</>
	)
}

export default PageAddListing7
