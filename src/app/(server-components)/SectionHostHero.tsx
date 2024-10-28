import React, { FC } from 'react'
import imagePng from '../public/hostImages/hostBg.jpeg'
import Image from 'next/image'
import ButtonPrimary from '@/shared/ButtonPrimary'
import HeroSearchForm2MobileFactory from '../(client-components)/(HeroSearchForm2Mobile)/HeroSearchForm2MobileFactory'
import HeroSearchFormSmall from '../(client-components)/(HeroSearchForm)/HeroSearchForm'
export interface SectionHero3Props {
	className?: string
}

const SectionHostHero: FC<SectionHero3Props> = ({ className = '' }) => {
	return (
		<div
			className={`nc-SectionHero3 relative ${className}`}
			data-nc-id="SectionHero3"
		>
			<div className="absolute inset-x-0 top-[10%] z-20 mx-auto flex w-full flex-col items-center space-y-4 text-center sm:top-[15%] lg:space-y-5 xl:space-y-8">
				<h3 className="text-3xl font-bold !leading-[115%] text-gray-50 sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl">
					Grow your holiday <br /> rental business with BSHH
				</h3>
				<span className="w-full text-sm font-medium text-gray-200 sm:text-lg md:text-sm lg:w-2/3 xxl:text-lg">
					Becoming a BSHH host goes beyond providing a welcoming place to stay
					for travellers worldwide. It empowers you to run a unique and
					fulfilling business – on your terms.
				</span>
				<button className="rounded-xl bg-primary-6000 px-5 py-3 text-white hover:bg-primary-500">
					Get Started
				</button>
			</div>
			<div className="aspect-h-1 aspect-w-1 relative sm:aspect-h-3 sm:aspect-w-4 lg:aspect-h-9 lg:aspect-w-16 xl:aspect-h-8">
				<img
					className="absolute inset-0 rounded-xl object-cover"
					src="/hostImages/hostBg.jpeg"
					alt={'hero'}
				/>
				<div className="absolute left-0 top-0 z-10 h-full w-full rounded-xl bg-gray-900/20" />
			</div>
		</div>
	)
}

export default SectionHostHero
