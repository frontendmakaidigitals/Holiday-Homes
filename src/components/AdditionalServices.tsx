'use client'
import React from 'react'
import Heading from '@/shared/Heading'
// Dummy data type definition
const DEMO_DATA: { name: string; img: string; description: string }[] = [
	{
		name: 'Additional Service 1',
		img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		description: 'Lorem Ipsum Dolor Sit Amet',
	},
	{
		name: 'Additional Service 2',
		img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		description: 'Lorem Ipsum Dolor Sit Amet',
	},
	{
		name: 'Additional Service 3',
		img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		description: 'Lorem Ipsum Dolor Sit Amet',
	},
	{
		name: 'Additional Service 4',
		img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		description: 'Lorem Ipsum Dolor Sit Amet',
	},
]

const AdditionalServices = ({
	apiData,
}: {
	apiData?: { name: string; img: string; description: string }[]
}) => {
	return (
		<div className="container mt-20">
			<Heading desc={'Just a Descripton'}>Additional Services</Heading>
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
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
		<div key={index} className="overflow-hidden rounded-lg">
			<div className="h-60 w-full bg-red-500 overflow-hidden">
				<img className="h-full w-full object-cover" src={item.img} />
			</div>
			<div className="p-4">
				<p className="text-lg font-bold">{item.name}</p>
				<p>{item.description}</p>
			</div>
		</div>
	))
}
