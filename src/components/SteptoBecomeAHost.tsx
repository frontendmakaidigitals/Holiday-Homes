import Heading from '@/shared/Heading'
import React from 'react'

const steps = [
	{
		title: 'Location',
		desc: 'Add your Property`s name and Location',
		icon: 'https://www.iconpacks.net/icons/2/free-location-icon-3409-thumb.png',
	},
	{
		title: 'Facilities and Amenities',
		desc: 'Describe Facilities and Amenities',
		icon: 'https://cdn-icons-png.flaticon.com/512/7909/7909832.png',
	},
	{
		title: 'Photos',
		desc: 'Upload property Photos.',
		icon: 'https://cdn-icons-png.flaticon.com/512/2659/2659360.png',
	},
	{
		title: 'Price and Availability',
		desc: 'Add Pricing and Availability',
		icon: 'https://cdn-icons-png.flaticon.com/512/5526/5526083.png',
	},
]
const SteptoBecomeAHost = () => {
	return (
		<div className="">
			<Heading>Become a Host in 4 easy steps</Heading>
			<div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
				{steps.map((step, index) => (
					<div
						key={index}
						className="bg-primary-100/20 rounded-lg px-4 py-5 shadow-sm"
					>
						<p className="font-Satoshi font-medium capitalize text-primary-6000 underline underline-offset-8">
							step {index + 1}
						</p>

						<div className="bg-primary-100/30 mt-4 flex h-[200px] w-full items-center justify-center overflow-hidden rounded-lg">
							<img className="w-[200px]" src={step.icon} />
						</div>
						<div className="mt-5">
							<p className="text-xl font-semibold text-primary-800">
								{step.title}
							</p>
							<p className="mt-1">{step.desc}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default SteptoBecomeAHost
