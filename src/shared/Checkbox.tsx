'use client'

import React, { FC } from 'react'

export interface CheckboxProps {
	label?: string
	subLabel?: string
	className?: string
	name: string
	defaultChecked?: boolean
	onChange?: (checked: boolean) => void
	disabled?: boolean
	checked?: boolean
}

const Checkbox: FC<CheckboxProps> = ({
	subLabel = '',
	label = '',
	name,
	className = '',
	defaultChecked,
	onChange,
	disabled = false,
	checked ,
}) => {
	console.log(defaultChecked)
	return (
		<div className={`flex text-sm sm:text-base ${className}`}>
			<input
				id={name}
				name={name}
				type="checkbox"
				disabled={disabled}
				className="focus:ring-action-primary border-primary h-6 w-6 rounded border-neutral-500 bg-white text-primary-500 focus:ring-primary-500 disabled:bg-gray-600 disabled:hover:bg-gray-600 dark:bg-neutral-700 dark:checked:bg-primary-500"
				defaultChecked={defaultChecked}
				onChange={(e) => onChange && onChange(e.target.checked)}
			/>
			{label && (
				<label
					htmlFor={name}
					className="ml-3.5 flex flex-1 flex-col justify-center"
				>
					<span className="text-neutral-900 dark:text-neutral-100">
						{label}
					</span>
					{subLabel && (
						<p className="mt-1 text-sm font-light text-neutral-500 dark:text-neutral-400">
							{subLabel}
						</p>
					)}
				</label>
			)}
		</div>
	)
}

export default Checkbox
