import BackgroundSection from '@/components/BackgroundSection'
import BgGlassmorphism from '@/components/BgGlassmorphism'
import SectionGridAuthorBox from '@/components/SectionGridAuthorBox'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import React, { ReactNode } from 'react'
import SectionHeroArchivePage from '../(server-components)/SectionHeroArchivePage'
import SectionHero from '../(server-components)/SectionHero'
const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className={`nc-ListingStayPage relative`}>
			<BgGlassmorphism />

			{/* SECTION HERO */}
			<div className="mb-24 px-4">
				<SectionHero className="pt-3 lg:pb-16" />
			</div>

			{children}

			<div className="container overflow-hidden">
				{/* SECTION 1 */}
				<div className="relative py-16">
					<BackgroundSection />
					<SectionSliderNewCategories
						heading="Explore by types of stays"
						subHeading="Explore houses based on 10 types of stays"
						categoryCardType="card5"
						itemPerRow={5}
						sliderStyle="style2"
					/>
				</div>

				{/* SECTION */}
				<SectionSubscribe2 className="py-24 lg:py-28" />

				{/* SECTION */}
				<div className="relative mb-24 py-16 lg:mb-28">
					<BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20" />
					<SectionGridAuthorBox />
				</div>
			</div>
		</div>
	)
}

export default Layout
