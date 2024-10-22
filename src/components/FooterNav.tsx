'use client'

import {
	HeartIcon,
	MagnifyingGlassIcon,
	UserCircleIcon,
} from '@heroicons/react/24/outline'
import React, { useEffect, useRef } from 'react'
import { PathName } from '@/routers/types'
import MenuBar from '@/shared/MenuBar'
import isInViewport from '@/utils/isInViewport'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/shared/Logo'
let WIN_PREV_POSITION = 0
if (typeof window !== 'undefined') {
	WIN_PREV_POSITION = window.pageYOffset
}

interface NavItem {
	name: string
	link?: PathName
	icon?: any
}

const NAV: NavItem[] = [
	{
		name: 'Logo',
		link: '/',
	},

	{
		name: 'Menu',
		icon: MenuBar,
	},
]

const FooterNav = () => {
	const containerRef = useRef<HTMLDivElement>(null)

	const pathname = usePathname()

	const renderItem = (item: NavItem, index: number) => {
		const isActive = pathname === item.link

		return item.link ? (
			<div
				key={index}
				className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
					isActive ? 'text-neutral-900 dark:text-neutral-100' : ''
				}`}
			>
				<Logo />
			</div>
		) : (
			<div
				key={index}
				className={`flex items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
					isActive ? 'text-neutral-900 dark:text-neutral-100' : ''
				}`}
			>
				<item.icon iconClassName="size-8" className={``} />
			</div>
		)
	}

	return (
		<div
			ref={containerRef}
			className="FooterNav sticky inset-x-0 left-0 top-0 z-30 block border-t border-neutral-300 bg-white p-2 transition-transform duration-300 ease-in-out dark:border-neutral-700 dark:bg-neutral-800 md:!hidden"
		>
			<div className="mx-auto flex w-full max-w-lg justify-between px-4 text-center text-sm">
				{/* MENU */}
				{NAV.map(renderItem)}
			</div>
		</div>
	)
}

export default FooterNav
