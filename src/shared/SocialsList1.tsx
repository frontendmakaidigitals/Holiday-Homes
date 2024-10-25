import { SocialType } from '@/shared/SocialsShare'
import React, { FC } from 'react'
import { FaFacebookSquare } from 'react-icons/fa'
import { AiFillTikTok } from 'react-icons/ai'
import { RiInstagramFill } from 'react-icons/ri'
import { FaYoutube } from 'react-icons/fa'
export interface SocialsList1Props {
	className?: string
}

const socials: SocialType[] = [
	{ name: 'Facebook', icon: <FaFacebookSquare />, href: '#' },
	{ name: 'Twitter', icon: <AiFillTikTok />, href: '#' },
	{ name: 'Youtube', icon: <FaYoutube />, href: '#' },
	{ name: 'Instagram', icon: <RiInstagramFill />, href: '#' },
]

const SocialsList1: FC<SocialsList1Props> = ({ className = 'space-y-2.5' }) => {
	const renderItem = (item: SocialType, index: number) => {
		return (
			<a
				href={item.href}
				className="group flex items-center space-x-2 rounded-xl bg-primary-100/30 p-1 text-4xl leading-none text-neutral-700 hover:bg-slate-100 hover:text-black dark:text-neutral-300 dark:hover:text-white"
				key={index}
			>
				<div className="text-primary-900">{item.icon}</div>
			</a>
		)
	}

	return (
		<div
			className={`nc-SocialsList1 w-full ${className}`}
			data-nc-id="SocialsList1"
		>
			{socials.map(renderItem)}
		</div>
	)
}

export default SocialsList1
