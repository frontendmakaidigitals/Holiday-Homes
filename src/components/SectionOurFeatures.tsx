import React, { FC } from 'react'
import rightImgPng from '@/images/choose-us.svg'
import Image, { StaticImageData } from 'next/image'
import Badge from '@/shared/Badge'

export interface SectionOurFeaturesProps {
	className?: string
	rightImg?: StaticImageData
	type?: 'type1' | 'type2'
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
	className = 'lg:py-14',
	rightImg = rightImgPng,
	type = 'type1',
}) => {
	return (
		<div
			className={`nc-SectionOurFeatures relative flex flex-col items-center ${
				type === 'type1' ? 'lg:flex-row' : 'lg:flex-row-reverse'
			} ${className}`}
			data-nc-id="SectionOurFeatures"
		>
			<div className="flex-grow bg-red-50">
				<Image src={rightImg} alt="" />
			</div>
			<div
				className={`mt-10 max-w-2xl flex-shrink-0 lg:mt-0 lg:w-2/5 ${
					type === 'type1' ? 'lg:pl-16' : 'lg:pr-16'
				}`}
			>
				<span className="text-sm uppercase tracking-widest text-gray-400">
					Benefits
				</span>
				<h2 className="mt-5 text-4xl font-semibold">WHY CHOOSE US? </h2>
				<span className="text-sm text-gray-700">
					Handpicked collection or properties near{' '}
					<span className="font-bold text-black">Downtown</span> and{' '}
					<span className="font-bold text-black">Marina</span>
				</span>

				<ul className="mt-7 space-y-10">
					<li className="space-y-4">
						<Badge name="Stylish" />
						<span className="block text-xl font-semibold">
							Premium Luxury Living
						</span>
						<span className="!mt-2 block text-neutral-500 dark:text-neutral-400">
							We provide a premium luxury living experience, ensuring unmatched
							comfort and elegance
						</span>
					</li>
					<li className="space-y-4">
						<Badge color="green" name="Competetive " />
						<span className="block text-xl font-semibold">
							Most Flexible Prices
						</span>
						<span className="!mt-2 block text-neutral-500 dark:text-neutral-400">
							We offer competitive pricing without compromising the exceptional
							service quality we guarantee to our valued clients
						</span>
					</li>
					<li className="space-y-4">
						<Badge color="red" name="Living" />
						<span className="block text-xl font-semibold">
							Get Quality and Comfort
						</span>
						<span className="!mt-2 block text-neutral-500 dark:text-neutral-400">
							We uphold the highest standards of quality for our apartments,
							ensuring that all are maintained in compliance with DTCM
							regulations
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default SectionOurFeatures
