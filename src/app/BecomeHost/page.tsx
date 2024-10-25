import React from 'react'
import SectionHostHero from '../(server-components)/SectionHostHero'
import HostKeyPoints from '@/components/hostKeyPoints'
import SteptoBecomeAHost from '@/components/SteptoBecomeAHost'
import Banner from '@/components/Banner'
import FAQ from '@/components/Faq'
import WhyChoose from '@/components/WhyChoose'
const Page = () => {
	return (
		<div className="mb-24 px-1 sm:px-4">
			<SectionHostHero className='className="pt-3 lg:pb-16' />
			<div className="container relative mb-24 mt-10 space-y-24 lg:mb-28 lg:space-y-28">
				<HostKeyPoints />
				<WhyChoose />
				<SteptoBecomeAHost />
				<FAQ />
				<Banner />
			</div>
		</div>
	)
}

export default Page
