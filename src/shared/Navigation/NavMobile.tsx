'use client'

import React from 'react'
import ButtonClose from '@/shared/ButtonClose'
import Logo from '@/shared/Logo'
import { Disclosure } from '@headlessui/react'
import { NavItemType } from './NavigationItem'
import { NAVIGATION_DEMO } from '@/data/navigation'
import ButtonPrimary from '@/shared/ButtonPrimary'
import SocialsList from '@/shared/SocialsList'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import SwitchDarkMode from '@/shared/SwitchDarkMode'
import Link from 'next/link'
import LangDropdown from '@/app/(client-components)/(Header)/LangDropdown'

export interface NavMobileProps {
	data?: NavItemType[]
	onClickClose?: () => void
}

const NavMobile: React.FC<NavMobileProps> = ({
	data = NAVIGATION_DEMO,
	onClickClose,
}) => {
	const _renderMenuChild = (item: NavItemType) => {
		 
		return (
			<ul className="nav-mobile-sub-menu pb-1 pl-6 text-base">
				{item.megaMenu?.map((menuItem, index) => (
					<Disclosure key={menuItem.id || index} as="li">
						{/* Render Parent Title */}
						<Link
						onClick={onClickClose}
							href={{
								pathname:'/listing-stay-map', // The base path
								query: { area: menuItem.title }, // The query parameter
							}}
						>
							<span className="block w-full py-2.5 pr-3 text-sm font-[400]">
								{menuItem.title}
							</span>
						</Link>
					</Disclosure>
				))}
			</ul>
		)
	}

	const _renderItem = (item: NavItemType, index: number) => {
		return (
			<Disclosure
				key={item.id}
				as="li"
				className="text-neutral-900 dark:text-white"
			>
				<Link
					className="flex w-full rounded-lg px-4 text-sm font-medium uppercase tracking-wide hover:bg-neutral-100 dark:hover:bg-neutral-800"
					href={{
						pathname: item.href || undefined,
					}}
				>
					<span
						className={`py-2.5 pr-3 ${!item.children ? 'block w-full' : ''}`}
					>
						{item.name}
					</span>
					{item.megaMenu && (
						<span className="flex flex-1" onClick={(e) => e.preventDefault()}>
							<Disclosure.Button
								as="span"
								className="flex flex-1 items-center justify-end py-2.5"
							>
								<ChevronDownIcon
									className="ml-2 h-4 w-4 text-neutral-500"
									aria-hidden="true"
								/>
							</Disclosure.Button>
						</span>
					)}
				</Link>
				{item.megaMenu && (
					<Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
				)}
			</Disclosure>
		)
	}

	return (
		<div className="h-screen w-full transform divide-y-2 divide-neutral-100 overflow-y-auto bg-slate-50 py-2 shadow-lg ring-1 transition dark:divide-neutral-800 dark:bg-neutral-900 dark:ring-neutral-700">
			<div className="px-5 py-6">
				<Logo />

				<div className="mt-5 flex flex-col text-sm text-neutral-700 dark:text-neutral-300">
					<span>
						We are one of the top and recognized Holiday home companies in
						Dubai. Providing premium vacation stays with immense knowledge and
						strength
					</span>

					<div className="mt-4 flex items-center justify-between">
						<SocialsList itemClass="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300" />
					</div>
				</div>
				<span className="absolute right-2 top-2 p-1">
					<ButtonClose onClick={onClickClose} />
				</span>
			</div>
			<ul className="flex flex-col space-y-1 px-2 py-6">
				{data.map(_renderItem)}
			</ul>
			<div className="flex items-center justify-between px-5 py-6">
				<Link href={'/Get-Estimate'} className="inline-block">
					<ButtonPrimary>Get Estimate</ButtonPrimary>
				</Link>
			</div>
		</div>
	)
}

export default NavMobile
