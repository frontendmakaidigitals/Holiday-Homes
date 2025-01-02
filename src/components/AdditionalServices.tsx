'use client'
import React from 'react'
import Heading from '@/shared/Heading'
// Dummy data type definition
const DEMO_DATA: { name: string; img: string; description: string }[] = [
	{
		name: 'Complete furnishing',
		img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		description:
			'Tailoring your apartment`s furnishings to align with the preferences and needs of your guests is essential. Brownstone Holiday Homes is a licensed holiday home operator in Dubai, dedicated to preparing your vacation home for holiday rentals',
	},
	{
		name: 'Chauffeur Service',
		img: 'https://st3.depositphotos.com/1177973/13591/i/450/depositphotos_135912530-stock-photo-chauffeur-opening-car-door.jpg',
		description:
			'Experience unparalleled convenience with our Chauffeur Service, designed to enhance your stay. Whether you`re heading to the airport, exploring the city, or attending a special event, our luxury vehicles are at your service. ',
	},
	{
		name: 'Rental Estimations',
		img: 'https://www.calibrerealestate.com.au/wp-content/uploads/2023/07/It-Pays-To-Be-In-The-Know-With-An-Accurate-Rental-Appraisal.jpg',
		description:
			'Our expert team provide an estimations with a comprehensive analysis of potential earnings from your property. By evaluating market trends, location specifics, and seasonal demand, we help you set competitive rental prices that maximize your returns',
	},
]

const AdditionalServices = ({
	apiData,
}: {
	apiData?: { name: string; img: string; description: string }[]
}) => {
	return (
		<div className="container mt-20">
			<Heading desc={'Enhance Your Experience with Our Extra Services'}>
				Additional Services
			</Heading>
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				{apiData ? (
					<RenderCards data={apiData} />
				) : (
					<RenderCards data={DEMO_DATA} />
				)}
			</div>
		</div>
	)
}

export default AdditionalServices

// Define the props type for RenderCards
const RenderCards = ({
	data,
}: {
	data: { name: string; img: string; description: string }[]
}) => {
	return data.map((item, index) => (
		<div
			key={index}
			className="overflow-hidden rounded-lg p-2 group transition-all duration-300 hover:bg-slate-100"
		>
			<div className="h-60 w-full overflow-hidden group-hover:shadow-md transition-all duration-200 rounded-lg bg-slate-300 border  border-gray-200">
				<img className="h-full w-full object-cover" src={item.img} />
			</div>
			<div className="py-4">
				<p className="text-lg font-bold">{item.name}</p>
				<p>{item.description}</p>
			</div>
		</div>
	))
}
