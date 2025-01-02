'use client'

import React, { FC, useEffect, useState } from 'react'
import { TaxonomyType } from '@/data/types'
import CardCategory3 from '@/components/CardCategory3'
import CardCategory4 from '@/components/CardCategory4'
import CardCategory5 from '@/components/CardCategory5'
import Heading from '@/shared/Heading'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import PrevBtn from './PrevBtn'
import NextBtn from './NextBtn'
import { variants } from '@/utils/animationVariants'
import { useWindowSize } from 'react-use'
import businessBayImg from '@/images/MenuImages/businessbay.webp'
import donwtownImg from '@/images/MenuImages/downtown.webp'
import JLTImg from '@/images/MenuImages/JLT.webp'
import JVCImg from '@/images/MenuImages/JVC.jpeg'
import MarinaImg from '@/images/MenuImages/marina.jpg'
export interface SectionSliderNewCategoriesProps {
	className?: string
	itemClassName?: string
	heading?: string
	subHeading?: string
	categories?: TaxonomyType[]
	categoryCardType?: 'card3' | 'card4' | 'card5'
	itemPerRow?: 4 | 5
	sliderStyle?: 'style1' | 'style2'
}

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
		name: 'Jumeirah Village Circle',
		taxonomy: 'category',
		count: 188288,
		thumbnail: JVCImg,
	},
	{
		id: '5',
		href: '/listing-stay-map',
		name: 'Jumeirah Lake Triangle',
		taxonomy: 'category',
		count: 188288,
		thumbnail: JLTImg,
	},
]

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
	heading = 'Suggestions for discovery',
	subHeading = 'Popular places to recommend to you',
	className = '',
	itemClassName = '',
	categories = Tabs,
	itemPerRow = 5,
	categoryCardType = 'card3',
	sliderStyle = 'style1',
}) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [direction, setDirection] = useState(0)
	const [numberOfItems, setNumberOfitem] = useState(0)

	const windowWidth = useWindowSize().width
	useEffect(() => {
		if (windowWidth < 320) {
			return setNumberOfitem(1)
		}
		if (windowWidth < 500) {
			return setNumberOfitem(itemPerRow - 3)
		}
		if (windowWidth < 1024) {
			return setNumberOfitem(itemPerRow - 2)
		}
		if (windowWidth < 1280) {
			return setNumberOfitem(itemPerRow - 1)
		}

		setNumberOfitem(itemPerRow)
	}, [itemPerRow, windowWidth])

	function changeItemId(newVal: number) {
		if (newVal > currentIndex) {
			setDirection(1)
		} else {
			setDirection(-1)
		}
		setCurrentIndex(newVal)
	}

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (currentIndex < categories?.length - 1) {
				changeItemId(currentIndex + 1)
			}
		},
		onSwipedRight: () => {
			if (currentIndex > 0) {
				changeItemId(currentIndex - 1)
			}
		},
		trackMouse: true,
	})

	const renderCard = (item: TaxonomyType) => {
		switch (categoryCardType) {
			case 'card3':
				return <CardCategory3 taxonomy={item} />
			case 'card4':
				return <CardCategory4 taxonomy={item} />
			case 'card5':
				return <CardCategory5 taxonomy={item} />
			default:
				return <CardCategory3 taxonomy={item} />
		}
	}

	if (!numberOfItems) return null

	return (
		<div className={`nc-SectionSliderNewCategories ${className}`}>
			<Heading desc={subHeading} isCenter={sliderStyle === 'style2'}>
				{heading}
			</Heading>
			<MotionConfig
				transition={{
					x: { type: 'spring', stiffness: 300, damping: 30 },
					opacity: { duration: 0.2 },
				}}
			>
				<div className={`relative flow-root`} {...handlers}>
					<div className={`flow-root overflow-hidden rounded-xl`}>
						<motion.ul
							initial={false}
							className="relative -mx-2 whitespace-nowrap xl:-mx-4"
						>
							<AnimatePresence initial={false} custom={direction}>
								{categories.map((item, indx) => (
									<motion.li
										className={`relative inline-block px-2 xl:px-4 ${itemClassName}`}
										custom={direction}
										initial={{
											x: `${(currentIndex - 1) * -100}%`,
										}}
										animate={{
											x: `${currentIndex * -100}%`,
										}}
										variants={variants(200, 1)}
										key={indx}
										style={{
											width: `calc(1/${numberOfItems} * 100%)`,
										}}
									>
										{renderCard(item)}
									</motion.li>
								))}
							</AnimatePresence>
						</motion.ul>
					</div>

					{currentIndex ? (
						<PrevBtn
							style={{ transform: 'translate3d(0, 0, 0)' }}
							onClick={() => changeItemId(currentIndex - 1)}
							className="absolute -left-3 top-1/3 z-[1] h-9 w-9 -translate-y-1/2 text-lg xl:-left-6 xl:h-12 xl:w-12"
						/>
					) : null}

					{categories.length > currentIndex + numberOfItems ? (
						<NextBtn
							style={{ transform: 'translate3d(0, 0, 0)' }}
							onClick={() => changeItemId(currentIndex + 1)}
							className="absolute -right-3 top-1/3 z-[1] h-9 w-9 -translate-y-1/2 text-lg xl:-right-6 xl:h-12 xl:w-12"
						/>
					) : null}
				</div>
			</MotionConfig>
		</div>
	)
}

export default SectionSliderNewCategories
