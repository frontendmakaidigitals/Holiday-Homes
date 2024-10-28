import { SocialType } from '@/shared/SocialsShare'
import React, { FC } from 'react'
import { FaFacebookSquare } from 'react-icons/fa'
import { AiFillTikTok } from 'react-icons/ai'
import { RiInstagramFill } from 'react-icons/ri'
import { FaYoutube } from 'react-icons/fa'
export interface SocialsListProps {
	className?: string
	itemClass?: string
	socials?: SocialType[]
}

const socialsDemo: SocialType[] = [
	{
		name: 'Facebook',
		icon: <FaFacebookSquare />,
		href: 'https://www.facebook.com/profile.php?id=61562308124575&mibextid=LQQJ4d',
	},
	{
		name: 'TikTok',
		icon: <AiFillTikTok />,
		href: 'https://www.tiktok.com/@bsholidayhomes?_t=8qunKUcOLgm&_r=1',
	},
	{ name: 'Youtube', icon: <FaYoutube />, href: '#' },
	{
		name: 'Instagram',
		icon: <RiInstagramFill />,
		href: 'https://www.instagram.com/bsholidayhomes?igsh=Mzl6Nzl5ZjV0NHZr&utm_source=qr',
	},
]

const SocialsList: FC<SocialsListProps> = ({
	className = '',
	itemClass = 'block',
	socials = socialsDemo,
}) => {
	return (
		<nav
			className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`}
			data-nc-id="SocialsList"
		>
			{socials.map((item, i) => (
				<a
					key={i}
					className={`${itemClass}`}
					href={item.href}
					target="_blank"
					rel="noopener noreferrer"
					title={item.name}
				>
					{item.icon}
				</a>
			))}
		</nav>
	)
}

export default SocialsList
