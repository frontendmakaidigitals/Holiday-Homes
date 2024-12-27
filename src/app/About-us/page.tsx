'use client'
import React, { FC, useState } from 'react'
import SwiperTeams from '@/components/SwiperTeam'
export interface PageContactProps {}
import Heading from '@/shared/Heading'
import FAQ from '@/components/Faq'
import Banner from '@/components/Banner'

const PageContact: FC<PageContactProps> = ({}) => {
	const questions: { question: string; answer: string }[] = [
		{
			question:
				'What types of properties does Brownstone Holiday Homes manage in Dubai?',
			answer:
				'Brownstone Holiday Homes specializes in managing a diverse range of properties in Dubai, including vacation homes, short-term rental properties, and long-term residential rentals.',
		},
		{
			question:
				'How can we assist you in maximizing your return on investment?',
			answer:
				'Brownstone Holiday Homes provides complete turnkey solutions customized to meet the unique needs of each property owner. We implement effective marketing strategies, manage bookings, optimize rental income through thorough market analysis, and offer comprehensive property maintenance services, all designed to enhance the ROI for every property we oversee.',
		},
		{
			question: 'What sets us apart from other property management services?',
			answer:
				'Brownstone Holiday Homes stands out due to our extensive expertise in the Dubai real estate market, tailored solutions that cater to individual property owner requirements, professional team of property management experts, focus on achieving maximum ROI for property owners, and our commitment to transparent communication throughout the entire property management process.',
		},
		{
			question: 'How can I get started with property management services?',
			answer:
				'To get started with Brownstone Holiday Homes property management services, simply reach out to our friendly team. You can contact us through our contact page or via WhatsApp, and we will be happy to assist you with any inquiries or concerns you may have.',
		},
		{
			question: 'Do holiday homes appreciate in value?',
			answer:
				'Absolutely! The property appreciates in value according to market trends, and the best part is that you continue to earn income during that time. We’ve noticed that many buyers specifically seek out holiday homes and are willing to pay a premium for properties that are already operating as vacation rentals, allowing them to start generating income immediately after the sale.',
		},
	]
	return (
		<div className={`nc-PageContact overflow-hidden`}>
			<div className="mb-14 lg:mb-14">
				<h2 className="container my-16 flex flex-col items-center justify-center text-center text-3xl font-semibold leading-[115%] text-primary-900 dark:text-neutral-100 sm:my-20 md:text-6xl md:leading-[115%] lg:text-start">
					About Us
				</h2>
			</div>
			<div className="container my-20 w-full">
				<AboutUsCard />
			</div>
			<div className="container my-20 w-full">
				<Heading desc="">Our Goal</Heading>
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
					<p className="order-2 text-lg font-light tracking-wider lg:order-1 lg:text-xl">
						Our mission is to be the leading provider of strategic insights and
						innovative solutions for investors and property owners in the UAE.
						We aim to empower our clients to capitalize on the vibrant and
						profitable real estate opportunities in this flourishing region.
						With over 10 years of combined experience in tourism and real
						estate, our expert team is devoted to offering personalized guidance
						and customized solutions that align with your specific investment
						objectives.{' '}
						<span className="mt-4 block">
							With a profound understanding of the market, we are dedicated to
							ensuring the success of every client we serve.
						</span>
					</p>

					<img
						className="order-1 h-[300px] w-full rounded-lg lg:order-1 lg:h-[450px]"
						src={
							'https://images.unsplash.com/photo-1628440501245-393606514a9e?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						}
					/>
				</div>
			</div>
			
			<div className="container my-20 w-full">
				<FAQ data={questions} />
				<Banner />
			</div>
		</div>
	)
}

export default PageContact

const keyPoints = [
	{
		title: 'Customer-Focused Strategy',
		gradient: 'from-violet-400/60 to-purple-300/30',
		desc: 'We emphasize outstanding customer service, guaranteeing maximum satisfaction by providing cleanliness, comfort, and tailored experiences.',
	},
	{
		title: 'Openness, Honesty, and Trust',
		gradient: 'from-rose-400/80 to-rose-300/50',
		desc: 'We are committed to clear communication, cultivating trust and transparency with our clients.',
	},
	{
		title: 'Professional Caretaking',
		gradient: ' from-orange-500/60 to-orange-300/30',
		desc: 'Our attentive caretaking teams are committed to upholding the highest standards in all managed properties.',
	},
	{
		title: '24/7 Support',
		gradient: 'from-gray-300/80 to-gray-100/40',
		desc: 'With our central staff available around the clock, we ensure quick assistance and peace of mind for our clients, establishing ourselves as their dependable BSHH.',
	},
]

const AboutUsCard = () => {
	return (
		<div className="w-full">
			<div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
				{keyPoints.map((item, index) => (
					<div
						key={index}
						className={`rounded-xl border border-gray-200 bg-gray-100 bg-gradient-to-br p-6 shadow-sm`}
					>
						<p className="text-lg font-semibold xxl:text-3xl">{item.title}</p>
						<p className="text-md mt-3 lg:text-lg">{item.desc}</p>
					</div>
				))}
			</div>
		</div>
	)
}
