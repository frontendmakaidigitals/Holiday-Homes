'use client'

import Logo from '@/shared/Logo'
import SocialsList1 from '@/shared/SocialsList1'
import { CustomLink } from '@/data/types'
import React from 'react'
import FooterNav from './FooterNav'

export interface WidgetFooterMenu {
	id: string
	title: string
	menus: CustomLink[]
}

const widgetMenus: WidgetFooterMenu[] = [
	{
		id: '5',
		title: 'Getting started',
		menus: [
			{ href: '#', label: 'Installation' },
			{ href: '#', label: 'Release Notes' },
			{ href: '#', label: 'Upgrade Guide' },
			{ href: '#', label: 'Browser Support' },
			{ href: '#', label: 'Editor Support' },
		],
	},
	{
		id: '1',
		title: 'Explore',
		menus: [
			{ href: '#', label: 'Design features' },
			{ href: '#', label: 'Prototyping' },
			{ href: '#', label: 'Design systems' },
			{ href: '#', label: 'Pricing' },
			{ href: '#', label: 'Security' },
		],
	},
]

const Footer: React.FC = () => {
	const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
		return (
			<div key={index} className="text-sm">
				<h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
					{menu.title}
				</h2>
				<ul className="mt-5 space-y-4">
					{menu.menus.map((item, index) => (
						<li key={index}>
							<a
								key={index}
								className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white"
								href={item.href}
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>
			</div>
		)
	}

	return (
		<>
			<div className="nc-Footer relative border-t border-neutral-200 py-24 dark:border-neutral-700 lg:py-28">
				<div className="container grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-4 lg:gap-x-10">
					<div className="col-span-2 grid grid-cols-4 gap-5 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
						<div className="col-span-2 md:col-span-1">
							<Logo className="!h-auto !w-[150px] lg:!w-[200px]" />
						</div>
						<div className="col-span-2 flex w-full items-center justify-between md:col-span-3">
							<SocialsList1 className="flex w-full flex-wrap items-center gap-2 lg:flex-row lg:items-center" />
						</div>
					</div>
					{widgetMenus.map(renderWidgetMenuItem)}
					<div className="w-full">
						<h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
							Get in Touch
						</h2>
						<ul className="mt-5 space-y-4">
							<li className="flex items-start space-x-1">
								<i className="la la-map-marker mt-1 text-xl text-primary-400"></i>
								<p className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white">
									Some Random Address, City, Country
								</p>
							</li>
							<li className="flex items-center space-x-1">
								<i className="la la-phone text-xl text-primary-400"></i>
								<p className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white">
									+12345 67890
								</p>
							</li>
							<li className="flex items-center space-x-1">
								<i className="la la-at text-xl text-primary-400"></i>
								<p className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white">
									info@gmail.com
								</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

export default Footer
