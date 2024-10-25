import Heading from '@/shared/Heading'
import React from 'react'

const WhyChoose = () => {
	const keyPoints: { title: JSX.Element }[] = [
		{
			title: (
				<p className="text-lg">
					<span className="text-4xl font-semibold text-primary-300">45% </span>{' '}
					of partners get their first booking within a week.
				</p>
			),
		},
		{
			title: (
				<p className="text-lg">
					<span className="text-4xl font-semibold text-primary-300">2/3 </span>
					of holiday rental guests return to book with us again.
				</p>
			),
		},
		{
			title: (
				<p className="text-lg">
					<span className="text-4xl font-semibold text-primary-300">48%</span>{' '}
					of nights booked by travellers at the end of 2023 were for
					international stays.
				</p>
			),
		},
	]
	return (
		<div className="w-full">
			<Heading>Why Choose Us?</Heading>
			<div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
				{keyPoints.map((point, index) => (
					<div key={index} className="bg-primary-50/80 rounded-lg p-4">
						{point.title}
					</div>
				))}{' '}
			</div>
		</div>
	)
}

export default WhyChoose
