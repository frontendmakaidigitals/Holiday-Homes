import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css' // Import Swiper styles
import SwiperNavButtons from './SwiperNavButtons'
import Heading from '@/shared/Heading'

const Teams = [
	{ name: 'John Doe', designation: 'Manager', avatar: '' },
	{ name: 'Jane Smith', designation: 'Designer', avatar: '' },
	{ name: 'Sam Wilson', designation: 'Developer', avatar: '' },
	{ name: 'Alice Brown', designation: 'Marketing', avatar: '' },
	{ name: 'Bob Green', designation: 'Sales', avatar: '' },
	{ name: 'Ella Grey', designation: 'HR', avatar: '' },
]

export default function SwiperTeams() {
	const SwiperRef = useRef(null)

	return (
		<div className="w-full py-10">
			<div className="flex w-full items-center justify-between">
				<Heading desc={''}>Meet Our Team</Heading>
				<SwiperNavButtons SwiperRef={SwiperRef} />
			</div>

			<Swiper
				slidesPerView={4} // Show 2 slides at a time
				spaceBetween={20} // Space between slides
				ref={SwiperRef}
				breakpoints={{
					// Adjust for different screen sizes
					640: { slidesPerView: 1.5, spaceBetween: 10 }, // Mobile
					768: { slidesPerView: 3, spaceBetween: 20 }, // Tablet
					1024: { slidesPerView: 4, spaceBetween: 30 }, // Desktop
				}}
				className="w-full" // Add spacing around the Swiper
			>
				{Teams.map((item, index) => (
					<SwiperSlide key={index} className="flex h-auto">
						{' '}
						{/* Ensure slides are flex containers */}
						<div className="w-full rounded-lg bg-gray-50 shadow-lg">
							{' '}
							{/* Adjusted slide content */}
							<div className="overflow-hidden rounded-lg">
								<div className="h-[300px] w-full bg-gray-100"></div>
							</div>
							<div className="px-4 py-7">
								<p className="text-xl font-semibold">{item.name}</p>
								<p className="font-medium text-gray-600">{item.designation}</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
