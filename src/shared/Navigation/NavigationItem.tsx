'use client'

import { PathName } from '@/routers/types'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import Image, { StaticImageData } from 'next/image'

import { usePathname } from 'next/navigation'
import React, { FC, Fragment, useEffect, useState } from 'react'
import businessBayImg from '@/images/MenuImages/businessbay.webp'
import donwtownImg from '@/images/MenuImages/downtown.webp'
import JLTImg from '@/images/MenuImages/JLT.webp'
import JVCImg from '@/images/MenuImages/JVC.jpeg'
import MarinaImg from '@/images/MenuImages/marina.jpg'
import useStore from '@/components/ListingStore'
import Link from 'next/link'
import axios from 'axios'
// <--- NavItemType --->
export interface MegamenuItem {
	id: string
	image: StaticImageData
	title: string
	items: NavItemType[]
}
export interface NavItemType {
	id: string
	name: string
	isNew?: boolean
	href: PathName
	targetBlank?: boolean
	children?: NavItemType[]
	megaMenu?: MegamenuItem[]
	type?: 'dropdown' | 'megaMenu' | 'none'
}

export interface NavigationItemProps {
	menuItem: NavItemType
}

type NavigationItemWithRouterProps = NavigationItemProps

const NavigationItem: FC<NavigationItemWithRouterProps> = ({ menuItem }) => {
	const [menuCurrentHovers, setMenuCurrentHovers] = useState<string[]>([])
	const locationPathName = usePathname()
	useEffect(() => {
		setMenuCurrentHovers([])
	}, [locationPathName])

	const onMouseEnterMenu = (id: string) => {
		setMenuCurrentHovers((state) => [...state, id])
	}

	const onMouseLeaveMenu = (id: string) => {
		setMenuCurrentHovers((state) => {
			return state.filter((item, index) => {
				return item !== id && index < state.indexOf(id)
			})
		})
	}

	const [isLoading, setIsLoading] = useState(false)
	const [status, setStatus] = useState('')
	const [listings, setListings] = useState([])
	const { Listings, setListingsData } = useStore()

	const nav = [
		{
			img: businessBayImg,
			title: 'Business Bay',
			links: ['', ''],
		},
		{
			img: MarinaImg,
			title: 'Marina',
			links: ['', ''],
		},
		{
			img: donwtownImg,
			title: 'Downtown',
			links: ['', ''],
		},
		{
			img: JVCImg,
			title: 'Jumeriah Village Circle',
			links: ['', ''],
		},
		{
			img: JLTImg,
			title: 'Jumeriah Lake Triangle',
			links: ['', ''],
		},
	]
	const [navMenu, setNavMenu] = useState(nav)

	const getListings = () => {
		setIsLoading(true)
		axios
			.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/sanctum/csrf-cookie`, {
				withCredentials: true,
			})
			.then(() => {
				return axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/listing`, {
					withCredentials: true,
				})
			})
			.then((res) => {
				const fetchedListings = Array.isArray(res.data.data)
					? res.data.data
					: [] // Ensure it's an array
				setListings(fetchedListings)
				setListingsData(fetchedListings)
				setStatus('success')
			})
			.catch((error) => {
				console.error(error)
				setStatus('failed')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	useEffect(() => {
		console.log('effect started was called')
		if (Listings.data.length == 0) {
			console.log('api was called')
			getListings()
		}
	}, [])

	useEffect(() => {
		setListings(listings)
	}, [listings])

	useEffect(() => {
		// Match Listings with navMenu titles
		const updatedNavMenu = navMenu.map((menuItem) => {
			// Filter Listings based on area (match with title)
			const matchedListings = Listings.data.filter(
				(listing: any) =>
					listing.isChecked == 1 && listing.Area == menuItem.title,
			)

			// If any listings match the area, store the titles in links
			const updatedLinks = matchedListings.map(
				(listing: any) => listing.towerName,
			)

			// Update the menu item with the new links
			return { ...menuItem, links: updatedLinks }
		})

		// Update the navMenu state with the new links
		setNavMenu(updatedNavMenu)
	}, [Listings])

	// ===================== MENU MEGAMENU =====================
	const renderMegaMenu = (menu: NavItemType) => {
		const isHover = menuCurrentHovers.includes(menu.id)

		const isFull = menu.megaMenu && menu.megaMenu?.length > 3
		const classPopover = isFull
			? 'menu-megamenu--large'
			: 'menu-megamenu--small relative'
		const classPanel = isFull ? 'left-0' : '-translate-x-1/2 left-1/2'

		return (
			<Popover
				as="li"
				className={`menu-item menu-megamenu flex items-center ${classPopover}`}
				onMouseEnter={() => onMouseEnterMenu(menu.id)}
				onMouseLeave={() => onMouseLeaveMenu(menu.id)}
			>
				{() => (
					<>
						<div>{renderMainItem(menu)}</div>
						<Transition
							as={Fragment}
							show={isHover}
							enter="transition ease-out duration-150"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<Popover.Panel
								static
								className={`sub-menu absolute top-full z-10 w-screen max-w-sm transform px-4 will-change-transform sm:px-0 lg:max-w-max ${classPanel}`}
							>
								<div className="overflow-hidden rounded-lg text-sm shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10">
									<div
										className={`relative grid gap-1 bg-white px-3 py-6 dark:bg-gray-900 grid-cols-${menu.megaMenu?.length}`}
									>
										{navMenu.map((menu, index) => {
											return (
												<div key={index}>
													<div className="px-2">
														<div className="relative flex h-32 w-full overflow-hidden rounded-lg">
															<Image
																alt=""
																src={menu.img}
																fill
																className="w-full"
															/>
														</div>
													</div>
													<p className="my-2 px-2 py-1 font-medium text-gray-900 dark:text-gray-200">
														{menu.title}
													</p>
													<ul className="grid space-y-1">
														{menu.links.slice(0, 5).map((link, index) => {
															return (
																<li key={index}>
																	<Link
																		href={{
																			pathname: '/listing-stay-map',
																			query: { town: link },
																		}}
																	>
																		{link}
																	</Link>
																</li>
															)
														})}
													</ul>
												</div>
											)
										})}
									</div>
								</div>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>
		)
	}

	const renderMegaMenuNavlink = (item: NavItemType) => {
		return (
			<li key={item.id}>
				<Link
					rel="noopener noreferrer"
					className="inline-flex items-center rounded px-2 py-1 font-normal text-gray-800 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200"
					href={item.href || ''}
				>
					{item.name}
				</Link>
			</li>
		)
	}

	// ===================== MENU DROPDOW =====================
	const renderDropdownMenu = (menuDropdown: NavItemType) => {
		const isHover = menuCurrentHovers.includes(menuDropdown.id)
		return (
			<Popover
				as="li"
				className={`menu-item menu-dropdown relative flex items-center ${
					menuDropdown.isNew ? 'menuIsNew_lv1' : ''
				}`}
				onMouseEnter={() => onMouseEnterMenu(menuDropdown.id)}
				onMouseLeave={() => onMouseLeaveMenu(menuDropdown.id)}
			>
				{() => (
					<>
						<div>{renderMainItem(menuDropdown)}</div>
						<Transition
							as={Fragment}
							show={isHover}
							enter="transition ease-out duration-150 "
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<Popover.Panel
								static
								className="sub-menu absolute left-0 top-full z-10 w-56 transform will-change-transform"
							>
								<ul className="relative grid space-y-1 rounded-lg bg-white py-4 text-sm shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-900 dark:ring-white dark:ring-opacity-10">
									{menuDropdown.children?.map((i) => {
										if (i.type) {
											return renderDropdownMenuNavlinkHasChild(i)
										} else {
											return (
												<li
													key={i.id}
													className={`px-2 ${i.isNew ? 'menuIsNew' : ''}`}
												>
													{renderDropdownMenuNavlink(i)}
												</li>
											)
										}
									})}
								</ul>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>
		)
	}

	const renderDropdownMenuNavlinkHasChild = (item: NavItemType) => {
		const isHover = menuCurrentHovers.includes(item.id)
		return (
			<Popover
				as="li"
				key={item.id}
				className="menu-item menu-dropdown relative flex items-center px-2"
				onMouseEnter={() => onMouseEnterMenu(item.id)}
				onMouseLeave={() => onMouseLeaveMenu(item.id)}
			>
				{() => (
					<>
						<div>{renderDropdownMenuNavlink(item)}</div>
						<Transition
							as={Fragment}
							show={isHover}
							enter="transition ease-out duration-150"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<Popover.Panel
								static
								className="sub-menu absolute left-full top-0 z-10 w-56 pl-2"
							>
								<ul className="relative grid space-y-1 rounded-lg bg-white py-4 text-sm shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-900 dark:ring-white dark:ring-opacity-10">
									{item.children?.map((i) => {
										if (i.type) {
											return renderDropdownMenuNavlinkHasChild(i)
										} else {
											return (
												<li key={i.id} className="px-2">
													{renderDropdownMenuNavlink(i)}
												</li>
											)
										}
									})}
								</ul>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>
		)
	}

	const renderDropdownMenuNavlink = (item: NavItemType) => {
		return (
			<Link
				target={item.targetBlank ? '_blank' : undefined}
				rel="noopener noreferrer"
				className="flex items-center rounded-md px-4 py-2 font-normal text-gray-900 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200"
				href={item.href || ''}
			>
				{item.name}
				{item.type && (
					<ChevronDownIcon
						className="ml-2 h-4 w-4 text-gray-500"
						aria-hidden="true"
					/>
				)}
			</Link>
		)
	}

	// ===================== MENU MAIN MENU =====================
	const renderMainItem = (item: NavItemType) => {
		return (
			<Link
				rel="noopener noreferrer"
				className="inline-flex items-center rounded-full px-4 py-2 text-sm font-normal text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200 xl:px-5 xl:text-base"
				href={item.href || '/'}
			>
				{item.name}
				{item.type && (
					<ChevronDownIcon
						className="-mr-1 ml-1 h-4 w-4 text-gray-400"
						aria-hidden="true"
					/>
				)}
			</Link>
		)
	}

	switch (menuItem.type) {
		case 'megaMenu':
			return renderMegaMenu(menuItem)
		case 'dropdown':
			return renderDropdownMenu(menuItem)
		default:
			return (
				<li className="menu-item flex items-center">
					{renderMainItem(menuItem)}
				</li>
			)
	}
}
// Your component own properties

export default NavigationItem
