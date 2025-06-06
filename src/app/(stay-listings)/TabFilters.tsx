'use client'

import { Fragment, useState } from 'react'
import {
	Dialog,
	DialogTitle,
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
	TransitionChild,
} from '@headlessui/react'
import NcInputNumber from '@/components/NcInputNumber'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonThird from '@/shared/ButtonThird'
import ButtonClose from '@/shared/ButtonClose'
import Checkbox from '@/shared/Checkbox'
import Slider from 'rc-slider'
import convertNumbThousand from '@/utils/convertNumbThousand'

// DEMO DATA
const typeOfPaces = [
	{
		name: 'Apartment',
		description: 'Have a place to yourself',
	},
	{
		name: 'Villa',
		description: 'Have a place to yourself',
	},
	{
		name: 'Townhouse',
		description: 'Have a place to yourself',
	},
]

const moreFilter1 = [
	{ name: 'Kitchen', defaultChecked: true },
	{ name: 'Air conditioning', defaultChecked: true },
	{ name: 'Heating' },
	{ name: 'Dryer' },
	{ name: 'Washer' },
	{ name: 'Wifi' },
	{ name: 'Indoor fireplace' },
	{ name: 'Breakfast' },
	{ name: 'Hair dryer' },
	{ name: ' Dedicated workspace' },
]

const moreFilter2 = [
	{ name: ' Free parking on premise' },
	{ name: 'Hot tub' },
	{ name: 'Gym' },
	{ name: ' Pool' },
	{ name: ' EV charger' },
]

const moreFilter3 = [
	{ name: ' House' },
	{ name: 'Bed and breakfast' },
	{ name: 'Apartment', defaultChecked: true },
	{ name: ' Boutique hotel' },
	{ name: ' Bungalow' },
	{ name: ' Chalet', defaultChecked: true },
	{ name: ' Condominium', defaultChecked: true },
	{ name: ' Cottage' },
	{ name: ' Guest suite' },
	{ name: ' Guesthouse' },
]

const moreFilter4 = [{ name: ' Pets allowed' }, { name: 'Smoking allowed' }]
interface TabFiltersProps {
	propertyType?: string[] // Optional array of property types
	setPropertyType?: any // Optional setter function for property type
	filterBeds?: number | null // Optional filter for beds
	setFitlerBeds?: any // Optional setter for bed filter
	rangePrices?: number[] // Optional price range filter
	setRangePrices?: any // Optional setter for price range
	ApplyFilter?: any // Optional function to apply the filter
	handlePriceFilter?: any // Optional function to reset the price filter
	handlePropertyFilter?: any // Optional function to reset the property type filter
	handleBedFilter?: any // Optional function to reset the bed filter
}
const TabFilters: React.FC<TabFiltersProps> = ({
	propertyType = [], // Default to an empty array if not provided
	setPropertyType,
	filterBeds = null, // Default to null if not provided
	setFitlerBeds,
	rangePrices = [0, 1000], // Default to a range of [0, 1000] if not provided
	setRangePrices,
	ApplyFilter,
	handlePriceFilter,
	handlePropertyFilter,
	handleBedFilter,
}: TabFiltersProps) => {
	const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false)
	const [isOpenMoreFilterMobile, setisOpenMoreFilterMobile] = useState(false)

	const closeModalMoreFilter = () => setisOpenMoreFilter(false)
	const openModalMoreFilter = () => setisOpenMoreFilter(true)
	//
	const closeModalMoreFilterMobile = () => setisOpenMoreFilterMobile(false)
	const openModalMoreFilterMobile = () => setisOpenMoreFilterMobile(true)

	const renderXClear = (onClick: any) => {
		return (
			<span
				onClick={onClick}
				className="ml-3 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-primary-500 text-white"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-3 w-3"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clipRule="evenodd"
					/>
				</svg>
			</span>
		)
	}
	const handleCheckboxChange = (name: string) => {
		setPropertyType((prevSelected: string[]) => {
			// If the item is already selected, remove it from the array
			if (prevSelected.includes(name)) {
				return prevSelected.filter((item) => item !== name)
			}
			// Otherwise, add the item to the array
			return [...prevSelected, name]
		})
	}

	const renderTabsTypeOfPlace = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`${propertyType.length != 0 ? 'border-primary-100/80 bg-primary-500/10' : 'border-neutral-300 bg-transparent'} flex items-center justify-center rounded-full border px-4 py-2 text-sm hover:border-neutral-400 focus:outline-none dark:border-neutral-700 dark:hover:border-neutral-6000 ${
								open ? '!border-primary-500' : ''
							}`}
						>
							<span>Property Types ({propertyType.length})</span>

							{propertyType.length != 0 ? (
								renderXClear(handlePropertyFilter)
							) : (
								<i className="las la-angle-down ml-2"></i>
							)}
						</PopoverButton>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<PopoverPanel className="absolute left-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-md">
								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
									<div className="relative flex flex-col space-y-5 px-5 py-6">
										{typeOfPaces.map((item) => (
											<div key={item.name} className="">
												<Checkbox
													name={item.name}
													label={item.name}
													subLabel={item.description}
													checked={propertyType.includes(item.name)} // Check if the item is selected
													onChange={() => handleCheckboxChange(item.name)}
												/>
											</div>
										))}
									</div>
									<div className="flex items-center justify-between bg-neutral-50 p-5 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
										<ButtonThird
											onClick={() => {
												handlePropertyFilter()
												close()
											}}
											sizeClass="px-4 py-2 sm:px-5"
										>
											Clear
										</ButtonThird>
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		)
	}

	const renderTabsRoomAndBeds = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex items-center justify-center ${filterBeds ? 'border-primary-300 bg-primary-500/10' : ''} rounded-full border border-neutral-300 px-4 py-2 text-sm hover:border-neutral-400 focus:outline-none dark:border-neutral-700 dark:hover:border-neutral-6000 ${
								open ? '!border-primary-500' : ''
							}`}
						>
							<span>Beds {filterBeds == 0 ? '' : filterBeds}</span>

							{filterBeds ? (
								renderXClear(handleBedFilter)
							) : (
								<i className="las la-angle-down ml-2"></i>
							)}
						</PopoverButton>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<PopoverPanel className="absolute left-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-md">
								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
									<div className="relative flex flex-col space-y-5 px-5 py-6">
										<NcInputNumber
											label="Beds"
											max={10}
											defaultValue={filterBeds || 0}
											onChange={(value) => setFitlerBeds(value)}
										/>
									</div>
									<div className="flex items-center justify-between bg-neutral-50 p-5 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
										<ButtonThird
											onClick={() => {
												handleBedFilter()
												close()
											}}
											sizeClass="px-4 py-2 sm:px-5"
										>
											Clear
										</ButtonThird>
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		)
	}

	const renderTabsPriceRage = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm focus:outline-none`}
						>
							<span>
								{`AED ${convertNumbThousand(
									rangePrices[0],
								)} - AED ${convertNumbThousand(rangePrices[1])}`}{' '}
							</span>
						</PopoverButton>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<PopoverPanel className="absolute left-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0">
								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
									<div className="relative flex flex-col space-y-8 px-5 py-6">
										<div className="space-y-5">
											<span className="font-medium">Price per day</span>
											<Slider
												range
												className="text-red-400"
												min={0}
												max={2000}
												defaultValue={[rangePrices[0], rangePrices[1]]}
												allowCross={false}
												onChange={(e) => setRangePrices(e as number[])}
											/>
											<div className="flex w-full items-center justify-between">
												<p>{rangePrices[0]}</p>
												<p></p>
												<p>{rangePrices[1]}</p>
											</div>
										</div>
									</div>
									<div className="flex items-center justify-between bg-neutral-50 p-5 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
										<ButtonThird
											onClick={() => {
												handlePriceFilter()
												close()
											}}
											sizeClass="px-4 py-2 sm:px-5"
										>
											Clear
										</ButtonThird>
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		)
	}

	const renderMoreFilterItem = (
		data: {
			name: string
			defaultChecked?: boolean
		}[],
	) => {
		const list1 = data.filter((_, i) => i < data.length / 2)
		const list2 = data.filter((_, i) => i >= data.length / 2)
		return (
			<div className="grid grid-cols-2 gap-8">
				<div className="flex flex-col space-y-5">
					{list1.map((item) => (
						<Checkbox
							key={item.name}
							name={item.name}
							label={item.name}
							defaultChecked={!!item.defaultChecked}
						/>
					))}
				</div>
				<div className="flex flex-col space-y-5">
					{list2.map((item) => (
						<Checkbox
							key={item.name}
							name={item.name}
							label={item.name}
							defaultChecked={!!item.defaultChecked}
						/>
					))}
				</div>
			</div>
		)
	}

	const renderTabMoreFilter = () => {
		return (
			<div>
				<div
					className={`flex cursor-pointer items-center justify-center rounded-full border border-primary-500 bg-primary-50 px-4 py-2 text-sm text-primary-700 focus:outline-none`}
					onClick={openModalMoreFilter}
				>
					<span>More filters (3)</span>
				</div>

				<Transition appear show={isOpenMoreFilter} as={Fragment}>
					<Dialog
						as="div"
						className="fixed inset-0 z-50 overflow-y-auto"
						onClose={closeModalMoreFilter}
					>
						<div className="min-h-screen text-center">
							<TransitionChild
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<div className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
							</TransitionChild>

							{/* This element is to trick the browser into centering the modal contents. */}
							<span
								className="inline-block h-screen align-middle"
								aria-hidden="true"
							>
								&#8203;
							</span>
							<TransitionChild
								as={'div'}
								className="inline-block h-screen w-full max-w-4xl px-2 py-8"
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<div className="inline-flex h-full w-full max-w-4xl transform flex-col overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all dark:border dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100">
									<div className="relative flex-shrink-0 border-b border-neutral-200 px-6 py-4 text-center dark:border-neutral-800">
										<DialogTitle
											as="h3"
											className="text-lg font-medium leading-6 text-gray-900"
										>
											More filters
										</DialogTitle>
										<span className="absolute left-3 top-3">
											<ButtonClose onClick={closeModalMoreFilter} />
										</span>
									</div>

									<div className="flex-grow overflow-y-auto">
										<div className="divide-y divide-neutral-200 px-10 dark:divide-neutral-800">
											<div className="py-7">
												<h3 className="text-xl font-medium">Amenities</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(moreFilter1)}
												</div>
											</div>
											<div className="py-7">
												<h3 className="text-xl font-medium">Facilities</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(moreFilter2)}
												</div>
											</div>
											<div className="py-7">
												<h3 className="text-xl font-medium">Property type</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(moreFilter3)}
												</div>
											</div>
											<div className="py-7">
												<h3 className="text-xl font-medium">House rules</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(moreFilter4)}
												</div>
											</div>
										</div>
									</div>

									<div className="flex flex-shrink-0 items-center justify-between bg-neutral-50 p-6 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
										<ButtonThird
											onClick={closeModalMoreFilter}
											sizeClass="px-4 py-2 sm:px-5"
										>
											Clear
										</ButtonThird>
										<ButtonPrimary
											onClick={closeModalMoreFilter}
											sizeClass="px-4 py-2 sm:px-5"
										>
											Apply
										</ButtonPrimary>
									</div>
								</div>
							</TransitionChild>
						</div>
					</Dialog>
				</Transition>
			</div>
		)
	}

	const renderTabMoreFilterMobile = () => {
		return (
			<div>
				<div
					className={`flex cursor-pointer items-center justify-center rounded-full border border-primary-500 bg-primary-50 px-4 py-2 text-sm text-primary-700 focus:outline-none lg:hidden`}
					onClick={openModalMoreFilterMobile}
				>
					<span>More filters (3)</span>
				</div>

				<Transition appear show={isOpenMoreFilterMobile} as={Fragment}>
					<Dialog
						as="div"
						className="fixed inset-0 z-50 overflow-y-auto"
						onClose={closeModalMoreFilterMobile}
					>
						<div className="min-h-screen text-center">
							<TransitionChild
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<div className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
							</TransitionChild>

							{/* This element is to trick the browser into centering the modal contents. */}
							<span
								className="inline-block h-screen align-middle"
								aria-hidden="true"
							>
								&#8203;
							</span>
							<TransitionChild
								as={'div'}
								className="inline-block h-screen w-full max-w-4xl px-2 py-8"
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<div className="inline-flex h-full w-full max-w-4xl transform flex-col overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all dark:border dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100">
									<div className="relative flex-shrink-0 border-b border-neutral-200 px-6 py-4 text-center dark:border-neutral-800">
										<Dialog.Title
											as="h3"
											className="text-lg font-medium leading-6 text-gray-900"
										>
											More filters
										</Dialog.Title>
										<span className="absolute left-3 top-3">
											<ButtonClose onClick={closeModalMoreFilterMobile} />
										</span>
									</div>

									<div className="flex-grow overflow-y-auto">
										<div className="divide-y divide-neutral-200 px-4 dark:divide-neutral-800 sm:px-6">
											{/* ---- */}
											<div className="py-7">
												<h3 className="text-xl font-medium">Type of place</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(typeOfPaces)}
												</div>
											</div>

											{/* ---- */}
											<div className="py-7">
												<h3 className="text-xl font-medium">Range Prices</h3>
												<div className="relative mt-6">
													<div className="relative flex flex-col space-y-8">
														<div className="space-y-5">
															<Slider
																range
																className="text-red-400"
																min={0}
																max={2000}
																defaultValue={[0, 1000]}
																allowCross={false}
																onChange={(e) => setRangePrices(e as number[])}
															/>
														</div>

														<div className="flex justify-between space-x-5">
															<div>
																<label
																	htmlFor="minPrice"
																	className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
																>
																	Min price
																</label>
																<div className="relative mt-1 rounded-md">
																	<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
																		<span className="text-neutral-500 sm:text-sm">
																			$
																		</span>
																	</div>
																	<input
																		type="text"
																		name="minPrice"
																		disabled
																		id="minPrice"
																		className="block w-full rounded-full border-neutral-200 pl-7 pr-3 text-neutral-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
																		value={rangePrices[0]}
																	/>
																</div>
															</div>
															<div>
																<label
																	htmlFor="maxPrice"
																	className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
																>
																	Max price
																</label>
																<div className="relative mt-1 rounded-md">
																	<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
																		<span className="text-neutral-500 sm:text-sm">
																			$
																		</span>
																	</div>
																	<input
																		type="text"
																		disabled
																		name="maxPrice"
																		id="maxPrice"
																		className="block w-full rounded-full border-neutral-200 pl-7 pr-3 text-neutral-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
																		value={rangePrices[1]}
																	/>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

											{/* ---- */}
											<div className="py-7">
												<h3 className="text-xl font-medium">Rooms and beds</h3>
												<div className="relative mt-6 flex flex-col space-y-5">
													<NcInputNumber label="Beds" max={10} />
													<NcInputNumber label="Bedrooms" max={10} />
													<NcInputNumber label="Bathrooms" max={10} />
												</div>
											</div>

											{/* ---- */}
											<div className="py-7">
												<h3 className="text-xl font-medium">Amenities</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(moreFilter1)}
												</div>
											</div>

											{/* ---- */}
											<div className="py-7">
												<h3 className="text-xl font-medium">Facilities</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(moreFilter2)}
												</div>
											</div>

											{/* ---- */}
											<div className="py-7">
												<h3 className="text-xl font-medium">Property type</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(moreFilter3)}
												</div>
											</div>

											{/* ---- */}
											<div className="py-7">
												<h3 className="text-xl font-medium">House rules</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(moreFilter4)}
												</div>
											</div>
										</div>
									</div>

									<div className="flex flex-shrink-0 items-center justify-between bg-neutral-50 p-4 dark:border-t dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
										<ButtonThird
											onClick={closeModalMoreFilterMobile}
											sizeClass="px-4 py-2 sm:px-5"
										>
											Clear
										</ButtonThird>
										<ButtonPrimary
											onClick={closeModalMoreFilterMobile}
											sizeClass="px-4 py-2 sm:px-5"
										>
											Apply
										</ButtonPrimary>
									</div>
								</div>
							</TransitionChild>
						</div>
					</Dialog>
				</Transition>
			</div>
		)
	}

	return (
		<div className="flex lg:space-x-4">
			<div className="hidden space-x-4 lg:flex">
				{renderTabsTypeOfPlace()}
				{renderTabsPriceRage()}
				{renderTabsRoomAndBeds()}
				<ButtonPrimary onClick={ApplyFilter} className="!py-2">
					Apply
				</ButtonPrimary>
			</div>
		</div>
	)
}

export default TabFilters
