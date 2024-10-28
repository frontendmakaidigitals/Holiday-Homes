'use client'
import { useEffect, useState, RefObject } from 'react'
import { GoArrowLeft, GoArrowRight } from 'react-icons/go'

export default function SwiperNavButtons({
	SwiperRef,
}: {
	SwiperRef: RefObject<any>
}) {
	const [isFirstSlide, setIsFirstSlide] = useState(true)
	const [isLastSlide, setIsLastSlide] = useState(false)

	const handlePrev = () => {
		if (SwiperRef.current) {
			SwiperRef.current.swiper.slidePrev()
		}
	}

	const handleNext = () => {
		if (SwiperRef.current) {
			SwiperRef.current.swiper.slideNext()
		}
	}

	const updateSlideState = () => {
		if (SwiperRef.current) {
			setIsFirstSlide(SwiperRef.current.swiper.isBeginning)
			setIsLastSlide(SwiperRef.current.swiper.isEnd)
		}
	}

	useEffect(() => {
		const swiper = SwiperRef.current?.swiper
		if (swiper) {
			updateSlideState()
			swiper.on('slideChange', updateSlideState)
		}

		return () => {
			if (swiper) {
				swiper.off('slideChange', updateSlideState)
			}
		}
	}, [SwiperRef])

	return (
		<div className="flex items-center gap-3">
			<button
				className="rounded-full bg-primary-900 p-2 text-3xl text-gray-50 hover:bg-primary-800 disabled:bg-gray-400"
				onClick={handlePrev}
				disabled={isFirstSlide}
			>
				<GoArrowLeft />
			</button>
			<button
				className="rounded-full bg-primary-900 p-2 text-3xl text-gray-50 hover:bg-primary-800 disabled:bg-gray-400"
				onClick={handleNext}
				disabled={isLastSlide}
			>
				<GoArrowRight />
			</button>
		</div>
	)
}
