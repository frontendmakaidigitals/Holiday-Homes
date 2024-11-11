'use client'
import React, { FC } from 'react'
import imagePng from '@/images/heroBg.jpg'
import Image from 'next/image'
import ButtonPrimary from '@/shared/ButtonPrimary'
import HeroSearchForm2MobileFactory from '../(client-components)/(HeroSearchForm2Mobile)/HeroSearchForm2MobileFactory'
import HeroSearchFormSmall from '../(client-components)/(HeroSearchForm)/HeroSearchForm'
import Image1 from '@/images/Hero_Slider_Images/Image_1.webp'
import Image2 from '@/images/Hero_Slider_Images/Image_2.webp'
import Image3 from '@/images/Hero_Slider_Images/Image_3.webp'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'

export interface SectionHero3Props {
	className?: string
	btnRef?: any
}

const SectionHero: FC<SectionHero3Props> = ({ className = '', btnRef }) => {
	const handleScrollToComponent = () => {
		if (btnRef.current) {
			btnRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}
	const sliderImage = [{ img: Image1 }, { img: Image2 }, { img: Image3 }]
	return (
		<div
			className={`nc-SectionHero3 relative ${className}`}
			data-nc-id="SectionHero3"
		>
			<div className="absolute inset-x-0 top-[10%] z-10 mx-auto flex w-full flex-col items-center space-y-4 text-center sm:top-[15%] lg:space-y-5 xl:space-y-8">
				<span className="text-sm font-semibold text-gray-50 sm:text-lg md:text-xl">
					Your next holiday – just one click away!
				</span>
				<h2 className="w-full px-2 text-xl font-bold !leading-[115%] text-gray-100 md:text-5xl lg:px-0 lg:text-6xl xl:text-7xl">
					300+ Most Premium Properties <br />
					in Dubai
				</h2>
				<ButtonPrimary
					onClick={handleScrollToComponent}
					sizeClass="px-6 py-3 lg:px-8 lg:py-4 rounded-xl"
					fontSize="text-sm sm:text-base lg:text-lg font-medium"
				>
					For Short Term Rental
				</ButtonPrimary>
				<div className="!mx-auto flex w-full max-w-lg flex-[3] md:px-3 lg:hidden">
					<div className="mt-3 flex w-full justify-center">
						<HeroSearchForm2MobileFactory />
					</div>
				</div>

				<div className="hidden w-full flex-[3] md:px-3 lg:flex">
					<div className="flex w-full justify-center self-center">
						<HeroSearchFormSmall />
					</div>
				</div>
			</div>
			<div className="aspect-h-1 aspect-w-1 relative overflow-hidden rounded-xl sm:aspect-h-3 sm:aspect-w-4 lg:aspect-h-9 lg:aspect-w-16 xl:aspect-h-8">
				<div className="h-full w-full">
					<Swiper
						className="mySwiper absolute left-0 top-0 h-full w-full"
						allowTouchMove={false} // Disable swiping
						modules={[Autoplay, Pagination]}
						loop={true}
						pagination={{
							clickable: true,
						}}
						autoplay={{
							delay: 5000,
							disableOnInteraction: false,
						}}
					>
						{sliderImage.map((slider, index) => (
							<SwiperSlide key={index}>
								<div className="h-full w-full">
									{' '}
									<Image
										src={slider.img}
										className="h-full w-full object-cover"
										alt={'image'}
									/>{' '}
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<div className="absolute left-0 top-0 h-full w-full bg-slate-900/40" />
			</div>
		</div>
	)
}

export default SectionHero
