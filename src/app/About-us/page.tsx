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
			question: 'What types of properties does 2ndhome manage in Dubai?',
			answer:
				'BSHH specializes in managing various types of properties in Dubai, including vacation homes, short-term rental properties, and properties suitable for long-term rentals or investments.',
		},
		{
			question: 'How can we help you maximize your return on investment?',
			answer:
				'2ndhome offers full turnkey solutions tailored to each property owner`s needs. We employ effective marketing strategies, handle booking management, optimize rental income through market analysis, and provide comprehensive property maintenance services, all aimed at maximizing the ROI on every property we manage.',
		},
		{
			question: 'Can BSHH assist in purchasing properties in Dubai?',
			answer:
				'Yes, BSHH provides assistance in purchasing properties in Dubai. Our experienced team can guide you through the process, from property selection to closing the deal, ensuring that you make informed decisions that align with your investment goals.',
		},
		{
			question: 'What sets us apart from other property management services?',
			answer:
				'2ndhome stands out due to our extensive expertise in the Dubai real estate market, tailored solutions that cater to individual property owner requirements, professional team of property management experts, focus on achieving maximum ROI for property owners, and our commitment to transparent communication throughout the entire property management process.',
		},
		{
			question:
				'How can I get started with BSHH`s property management services?',
			answer:
				'To get started with 2ndhome`s property management services, simply reach out to their friendly team. You can contact them through our contact page or via WhatsApp, and we will be happy to assist you with any inquiries or concerns you may have.',
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
					<p className="text-xl font-light tracking-wider">
						Our mission is to become the premier provider of strategic guidance
						and innovative solutions for investors and property owners in the
						UAE. We strive to empower our clients to seize the dynamic and
						lucrative real estate opportunities in this thriving region. Backed
						by over 20 years of combined expertise in both tourism and real
						estate, our highly skilled team is dedicated to delivering
						personalized advice and tailored solutions that align with your
						unique investment goals.{' '}
						<span className="mt-3 block">
							With a deep understanding of the market, we are committed to
							ensuring the success of every client we serve.
						</span>
					</p>

					<img
						className="h-[300px] w-full rounded-lg lg:h-[450px]"
						src={
							'https://images.unsplash.com/photo-1628440501245-393606514a9e?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						}
					/>
				</div>
			</div>
			<div className="container w-full rounded-lg bg-primary-50">
				<SwiperTeams />
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
		title: 'Customer-Centric Approach',
		gradient: 'from-violet-400/60 to-purple-300/30',
		desc: 'We prioritize exceptional customer service, ensuring utmost satisfaction through cleanliness, comfort, and personalized experiences.',
	},
	{
		title: 'Transparency, Integrity and Trust',
		gradient: 'from-rose-400/80 to-rose-300/50',
		desc: 'We believe in open communication, fostering trust and transparency with our clients.',
	},
	{
		title: 'Expert Caretaking',
		gradient: ' from-orange-500/60 to-orange-300/30',
		desc: 'Our meticulous care-taking teams are dedicated to maintaining the highest standards across all managed properties.',
	},
	{
		title: 'Round-the-Clock Support',
		gradient: 'from-gray-300/80 to-gray-100/40',
		desc: 'With our 24/7 central staff, we guarantee prompt assistance and peace of mind for our clients, making us their reliable BSHH.',
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
