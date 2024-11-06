'use client'
import React, { FC, useEffect, useState } from 'react'
import Input from '@/shared/Input'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { useRouter } from 'next/navigation'
import useStore from '../FormStore'

export interface PageAddListing5Props {
	params?: { stepIndex: number }
}

const PageAddListing5: FC<PageAddListing5Props> = ({
	params = { stepIndex: 5 },
}) => {
	const index = Number(params.stepIndex)
	const nextBtnText = index > 9 ? 'Publish listing' : 'Continue'
	const router = useRouter()
	const { ListingData, setAdditionalRules, setHouseRule } = useStore(
		(state) => state,
	)

	const [newRule, setNewRule] = useState('')

	// Load existing rules when component mounts
	useEffect(() => {
		setNewRule('') // Clear the input field when loading rules
	}, [ListingData.additionalRules])

	const navigateToNext = () => {
		router.push(`/admin/listings/${index + 1}`)
	}

	const navigateToPrevious = () => {
		router.push(
			index > 1 ? `/admin/listings/${index - 1}` : '/admin/listings/1',
		)
	}

	const renderNoInclude = (text: string, index: number) => (
		<div className="flex items-center justify-between py-3">
			<span className="font-medium text-neutral-6000 dark:text-neutral-400">
				{text}
			</span>
			<i
				className="las la-times-circle cursor-pointer text-2xl text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
				onClick={() => handleRemoveRule(index)} // Handle remove on click
			/>
		</div>
	)

	const renderRadio = (
		name: string,
		id: string,
		label: string,
		checked: boolean,
	) => (
		<div className="flex items-center">
			<input
				id={`${id}-${name}`}
				name={name}
				type="radio"
				className="!checked:bg-primary-500 h-6 w-6 border-neutral-300 bg-transparent text-primary-500 focus:ring-primary-500"
				checked={checked}
				onChange={() => handleRadioChange(name, label)}
			/>
			<label
				htmlFor={`${id}-${name}`}
				className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
			>
				{label}
			</label>
		</div>
	)

	const handleRadioChange = (ruleName: string, value: string) => {
		setHouseRule(ruleName, value) // Update the store
	}

	const handleAddRule = () => {
		if (newRule.trim()) {
			setAdditionalRules([...ListingData.additionalRules, newRule.trim()])
			setNewRule('') // Clear input after adding
		}
	}

	const handleRemoveRule = (indexToRemove: number) => {
		setAdditionalRules(
			ListingData.additionalRules.filter(
				(_: any, index: number) => index !== indexToRemove,
			),
		)
	}

	return (
		<>
			<div>
				<h2 className="text-2xl font-semibold">
					Set house rules for your guests
				</h2>
				<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
					Guests must agree to your house rules before they book.
				</span>
			</div>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

			{/* FORM */}
			<div className="space-y-8">
				{['Pet', 'Baby Crib', 'Cooking', 'Extra Bed'].map((rule) => (
					<div key={rule}>
						<label className="text-lg font-semibold">{rule}</label>
						<div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
							{['Allow', 'Do not allow'].map((option) =>
								renderRadio(
									rule,
									option,
									option,
									ListingData.houseRules[rule] === option ||
										(option === 'Allow' && !ListingData.houseRules[rule]), // Check if the current option is selected or set 'Allow' as default
								),
							)}
						</div>
					</div>
				))}

				<div className="border-b border-neutral-200 dark:border-neutral-700" />
				<span className="block text-lg font-semibold">Additional rules</span>
				<div className="flow-root">
					<div className="-my-3 divide-y divide-neutral-100 dark:divide-neutral-800">
						{ListingData.additionalRules.length > 0
							? ListingData.additionalRules.map((rule: string, idx: number) =>
									renderNoInclude(rule, idx),
								)
							: 'No additional rules is added'}
					</div>
				</div>

				<div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:space-x-5 sm:space-y-0">
					<Input
						className="!h-full"
						placeholder="Add a new rule..."
						value={newRule}
						onChange={(e) => setNewRule(e.target.value)}
					/>
					<ButtonPrimary className="flex-shrink-0" onClick={handleAddRule}>
						<i className="las la-plus text-xl" />
						<span className="ml-3">Add rule</span>
					</ButtonPrimary>
				</div>

				<div className="mt-8 flex justify-end space-x-5">
					<button
						onClick={navigateToPrevious}
						className="rounded-full border border-gray-600 bg-transparent px-5 disabled:!cursor-not-allowed disabled:!bg-slate-300 disabled:!text-slate-500"
						disabled={index === 1}
					>
						Go Back
					</button>
					<ButtonPrimary onClick={navigateToNext}>{nextBtnText}</ButtonPrimary>
				</div>
			</div>
		</>
	)
}

export default PageAddListing5
