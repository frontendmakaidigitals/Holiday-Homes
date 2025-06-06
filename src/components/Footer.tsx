'use client'

import Logo from '@/shared/Logo'
import SocialsList1 from '@/shared/SocialsList1'
import { CustomLink } from '@/data/types'
import React from 'react'
import FooterNav from './FooterNav'
import LogoImg from '@/images/Logo/Logo.png'
export interface WidgetFooterMenu {
	id: string
	title: string
	menus: CustomLink[]
}

const widgetMenus: WidgetFooterMenu[] = [
	{
		id: '5',
		title: 'Site Links',
		menus: [
			{ href: '/About-us', label: 'About & Services' },
			{ href: '/contact', label: 'Contact' },
			{ href: '/BecomeHost', label: 'Become a Host' },
			{ href: '/Get-Estimate', label: 'Get Quote' },
		],
	},
	{
		id: '1',
		title: 'Explore',
		menus: [
			{ href: 'Help-Center', label: 'Help Center' },
			{ href: '/FAQ', label: 'FAQ' },
			{ href: '/Privacy-Policy', label: 'Privacy Policy' },
			{ href: '/Terms-and-Conditions', label: 'Terms & Condition' },
		],
	},
]

const Footer: React.FC = () => {
	const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
		return (
			<div key={index} className="text-sm">
				<h2 className="text-lg font-semibold text-gray-100 dark:text-slate-200">
					{menu.title}
				</h2>
				<ul className="mt-5 list-disc space-y-4">
					{menu.menus.map((item, index) => (
						<div key={index} className="px-4">
							<li className="text-gray-50">
								<a
									key={index}
									className="rounded-xl px-2 py-1 text-gray-100 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
									href={item.href}
								>
									{item.label}
								</a>
							</li>
						</div>
					))}
				</ul>
			</div>
		)
	}

	return (
		<>
			<div className="nc-Footer relative border-t border-neutral-200 bg-primary-900 py-24 dark:border-neutral-700 lg:py-28">
				<div className="container grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-4 lg:gap-x-10">
					<div className="col-span-2 grid grid-cols-4 place-items-center gap-5 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
						<div className="col-span-2 md:col-span-1">
							<Logo
								img={LogoImg}
								className="!h-auto !w-[150px] lg:!w-[100px]"
							/>
							<p className="font-regular mt-3 text-sm text-gray-100">
								We are one of the top and recognized Holiday home companies in Dubai. Providing premium vacation stays with immense knowledge
								and strength
							</p>
						</div>
						<div className="col-span-2 flex w-full flex-col items-start justify-between md:col-span-3">
							<p className="mb-2 font-semibold text-gray-100">Our Presence</p>
							<SocialsList1 className="flex w-full flex-wrap items-center gap-2 lg:flex-row lg:items-center" />
						</div>
					</div>
					{widgetMenus.map(renderWidgetMenuItem)}
					<div className="col-span-2 w-full lg:col-span-1">
						<h2 className="font-semibold text-slate-100">Get in Touch</h2>
						<ul className="mt-5 space-y-4">
							<li className="flex items-start space-x-1">
								<i className="la la-map-marker mt-1 text-xl text-primary-400"></i>
								<p className="text-slate-100">
									Office - 3307 Churchill Towers, Business Bay, Dubai - UAE
								</p>
							</li>
							<li className="flex items-center space-x-1">
								<i className="la la-phone relative text-xl text-primary-400">
									<div className="absolute left-0 top-0 flex size-3 items-center justify-center rounded-full bg-black font-sans text-[.4rem]">
										1
									</div>
								</i>
								<div className="flex items-center gap-1">
									<p className="text-sm text-slate-100">Emergency:</p>
									<a
										href="tel:+971585129847"
										className="text-sm text-slate-100"
									>
										+971 58 512 9847
									</a>
								</div>
							</li>
							<li className="flex items-center space-x-1">
								<i className="la la-phone relative text-xl text-primary-400">
									<div className="absolute left-0 top-0 flex size-3 items-center justify-center rounded-full bg-black font-sans text-[.4rem]">
										2
									</div>
								</i>
								<div className="flex items-center gap-1">
									<p className="text-sm text-slate-100">Customer Support:</p>
									<a
										href="tel:+971585244501"
										className="text-sm text-slate-100"
									>
										+971 58 524 4501
									</a>
								</div>
							</li>
							<li className="flex items-center space-x-1">
								<i className="la la-at text-xl text-primary-400"></i>
								<p className="text-slate-100">info@bsholidayhomes.com</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

export default Footer
