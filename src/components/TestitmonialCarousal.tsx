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
const TestitmonialCarousal = () => {
	const testimonial = [
		{
			name: 'Waddah Kaddour',
			testimony:
				'I am really delighted with brown stone holiday Services, the unite i stayed was clean, shiny cozy and all the service available in the building, besides thier staff treatment was very helpful, informative and respectful, I would highly recommend Brown stone holiday home for people looking for nice stay in dubai',
		},
		{
			name: 'Chusmanch',
			testimony:
				'I am really delighted with brown stone holiday Services, the unite i stayed was clean, shiny cozy and all the service available in the building, besides thier staff treatment was very helpful, informative and respectful, I would highly recommend Brown stone holiday home for people looking for nice stay in dubai',
		},
		{
			name: 'Анна Айдарова',
			testimony:
				'I am really delighted with brown stone holiday Services, the unite i stayed was clean, shiny cozy and all the service available in the building, besides thier staff treatment was very helpful, informative and respectful, I would highly recommend Brown stone holiday home for people looking for nice stay in dubai',
		},
		{
			name: 'Temwekela Mbewe',
			testimony:
				'I am really delighted with brown stone holiday Services, the unite i stayed was clean, shiny cozy and all the service available in the building, besides thier staff treatment was very helpful, informative and respectful, I would highly recommend Brown stone holiday home for people looking for nice stay in dubai',
		},
		{
			name: 'Kevin Wayne',
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
							<div className="p-1">
								<Card>
									<CardContent className="aspect-square flex items-center justify-center p-6">
										{testimony.testimony}
									</CardContent>
									<CardContent className="aspect-square px-6">
										{testimony.name}
									</CardContent>
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
