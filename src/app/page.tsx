import React from 'react'
import SectionHero from '@/app/(server-components)/SectionHero'
import BgGlassmorphism from '@/components/BgGlassmorphism'
import { TaxonomyType } from '@/data/types'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionOurFeatures from '@/components/SectionOurFeatures'
import SectionGridFeaturePlaces from '@/components/SectionGridFeaturePlaces'
import SectionOfferCard from '@/components/SectionOffer'
import CtaSection from '@/components/CtaSection'
import AdditionalServices from '@/components/AdditionalServices'
import { MdArrowOutward } from 'react-icons/md'
import TestitmonialCarousal from '@/components/TestitmonialCarousal'
import businessBayImg from '@/images/MenuImages/businessbay.webp'
import donwtownImg from '@/images/MenuImages/downtown.webp'
import JLTImg from '@/images/MenuImages/JLT.webp'
import JVCImg from '@/images/MenuImages/JVC.jpeg'
import MarinaImg from '@/images/MenuImages/marina.jpg'
import Heading from '@/shared/Heading'
const Tabs: TaxonomyType[] = [
	{
		id: '1',
		href: '/listing-stay-map',
		name: 'Business Bay',
		taxonomy: 'category',
		count: 188288,
		thumbnail: businessBayImg,
	},
	{
		id: '2',
		href: '/listing-stay-map',
		name: 'Marina',
		taxonomy: 'category',
		count: 188288,
		thumbnail: MarinaImg,
	},
	{
		id: '3',
		href: '/listing-stay-map',
		name: 'Downtown',
		taxonomy: 'category',
		count: 188288,
		thumbnail: donwtownImg,
	},
	{
		id: '4',
		href: '/listing-stay-map',
		name: 'Jumeriah Village Circle',
		taxonomy: 'category',
		count: 188288,
		thumbnail: JVCImg,
	},
	{
		id: '5',
		href: '/listing-stay-map',
		name: 'Jumeriah Lake Triangle',
		taxonomy: 'category',
		count: 188288,
		thumbnail: JLTImg,
	},
]

function PageHome() {
	return (
		<main className="nc-PageHome relative overflow-hidden">
			{/* GLASSMOPHIN */}
			<BgGlassmorphism />

			<div className="mb-24 px-4">
				{/* SECTION HERO */}
				<SectionHero className="pt-3 lg:pb-16" />
			</div>
			<div className="container relative mb-24 mt-10 space-y-24 lg:mb-28 lg:space-y-28">
				<SectionSliderNewCategories categories={Tabs} />
				<SectionOurFeatures />
				<SectionGridFeaturePlaces cardType="card2" />

				<PromotinalOffers />
				<TestitmonialCarousal />
			</div>

			<AdditionalServices />
			<div className="w-full bg-gradient-to-r from-orange-200/60 to-pink-200/70 !px-0">
				<CtaSection />
			</div>
		</main>
	)
}

export default PageHome

const PromotinalOffers = () => {
	return (
		<div>
			<Heading desc="Promotional Offer">Promotional Offer</Heading>
			<div className="grid h-[400px] w-full grid-cols-1 gap-5 lg:grid-cols-2">
				<div className="relative flex h-full w-full cursor-pointer items-end overflow-hidden rounded-xl border border-gray-300 p-5 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
					<img
						src={'/OfferImage/1.png'}
						className="absolute left-0 top-0 h-full w-full object-cover"
					/>
					<button className="relative z-10 flex items-center gap-2 rounded-lg bg-primary-6000 px-3 py-2 text-slate-50 transition-all duration-300 hover:bg-primary-400 hover:shadow-lg">
						Know more <MdArrowOutward />
					</button>
				</div>
				<div className="relative flex h-full w-full cursor-pointer items-end overflow-hidden rounded-xl border border-gray-300 p-5 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
					<img
						src={'/OfferImage/2.png'}
						className="absolute left-0 top-0 h-full w-full object-cover"
					/>
					<button className="relative z-10 flex items-center gap-2 rounded-lg bg-primary-6000 px-3 py-2 text-slate-50 transition-all duration-300 hover:bg-primary-400 hover:shadow-lg">
						Know more <MdArrowOutward />
					</button>
				</div>
			</div>
		</div>
	)
}
