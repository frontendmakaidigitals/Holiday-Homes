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
				spaceBetween={20} // Space between slides
				ref={SwiperRef}
				breakpoints={{
					320: { slidesPerView: 1.3 },
					768: { slidesPerView: 3 },
					1024: { slidesPerView: 4 },
					1604: { slidesPerView: 5 },
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
