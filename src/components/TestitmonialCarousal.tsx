import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import Heading from '@/shared/Heading'
import { IoIosStar } from 'react-icons/io'

const TestitmonialCarousal = () => {
	const testimonial = [
		{
			name: 'Waddah Kaddour',
			rating: 5,
			testimony:
				'I am really delighted with brown stone holiday Services, the unite i stayed was clean, shiny cozy and all the service available in the building, besides thier staff treatment was very helpful, informative and respectful, I would highly recommend Brown stone holiday home for people looking for nice stay in dubai',
		},
		{
			name: 'Chusmanch',
			rating: 5,
			testimony:
				'Mr khubaib is providing superb services, what a beautiful apartment and fantastic view from balcony, i appreciate his honest services,... thank you brown stone holiday homes',
		},
		{
			name: 'Анна Айдарова',
			rating: 5,
			testimony:
				'I had a great stay! I’m impressed with the architectures, especially the poolside where I stayed. Waseem treated me really well. I look forward to coming back!',
		},
		{
			name: 'Temwekela Mbewe',
			rating: 5,
			testimony:
				'Thank you ,Shehzad, very much for the speed, quality, and professionalism in the work. This is not the first time we have contacted, and we are always satisfied. I recommend with all my heart!',
		},
		{
			name: 'Kevin Wayne',
			rating: 5,
			testimony:
				'The most amazing stay I’ve ever heard, I recommend Mr. Waseem 💯. He was there all the time I needed him and even gave some extra hours during check out.',
		},
	]

	return (
		<div className="w-full">
			<Heading desc={'Reviewed by our Loyal Customer'}>Google Reviews</Heading>
			<Carousel className="w-full">
				<CarouselContent className="-ml-1">
					{testimonial.map((testimony, index) => (
						<CarouselItem
							key={index}
							className="pl-1 md:basis-1/2 lg:basis-1/3"
						>
							<div className="flex flex-wrap gap-4 p-1">
								<Card className="relative flex h-full min-h-[350px] lg:min-h-[320px]  xxl:min-h-[300px] xxxl:min-h-[260px] flex-col items-start justify-between">
									<img
										className="absolute -top-1 left-0 w-20 opacity-[.3]"
										src="https://cdn-icons-png.flaticon.com/512/10276/10276414.png"
										alt="testimonial background"
									/>
									<CardContent className="aspect-square relative z-10 flex items-center justify-center p-6">
										{testimony.testimony}
									</CardContent>

									<div className="flex   flex-col justify-between">
										<div className="px-6 text-start">{testimony.name}</div>
										<CardContent className="relative z-10 flex justify-start px-6">
											{/* Render stars based on rating */}
											{[...Array(testimony.rating)].map((_, i) => (
												<IoIosStar key={i} className="text-yellow-500" />
											))}
										</CardContent>
									</div>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	)
}

export default TestitmonialCarousal
