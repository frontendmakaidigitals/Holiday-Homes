import React, { useState, useRef, useEffect } from 'react'
const Dropdown = ({
	setSelectedOption,
	selectedOption,
	options,
}: {
	setSelectedOption: any
	selectedOption: any
	options: { label: string; value: number }[]
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const dropdownRef = useRef<HTMLDivElement | null>(null)
	const toggleDropdown = (e: any) => {
		e.preventDefault()
		setIsOpen(!isOpen)
	}

	const handleOptionClick = (option: number, e: any) => {
		e.preventDefault()
		setSelectedOption(option)
		setIsOpen(false)
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div className="relative inline-block w-full text-left" ref={dropdownRef}>
			<div>
				<button
					onClick={(e) => toggleDropdown(e)}
					className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
				>
					{selectedOption.label}
					<svg
						className="-mr-1 ml-2 h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M5.23 7.21a.75.75 0 011.06 0L10 10.38l3.71-3.17a.75.75 0 111.04 1.08l-4.25 3.5a.75.75 0 01-1.04 0l-4.25-3.5a.75.75 0 010-1.08z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>
			{isOpen && (
				<div className="absolute z-[999] mt-2 w-full rounded-md bg-white shadow-lg">
					<ul
						className="py-1"
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="options-menu"
					>
						{options.map((option) => (
							<li
								key={option.value}
								onClick={(e) => handleOptionClick(option.value, e)}
								className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							>
								{option.label}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default Dropdown
