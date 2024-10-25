import React, { FC, ReactElement } from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { RiInstagramFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
export interface SocialsShareProps {
	className?: string
	itemClass?: string
}

export interface SocialType {
	name: string
	icon: ReactElement
	href: string
}

const socials: SocialType[] = [
  { name: "Facebook", icon: <FaFacebookSquare />, href: "#" },
  { name: "Twitter", icon: <AiFillTikTok />, href: "#" },
  { name: "Youtube", icon: <FaYoutube />, href: "#" },
  { name: "Instagram", icon: <RiInstagramFill />, href: "#" },
];

const SocialsShare: FC<SocialsShareProps> = ({
	className = 'grid gap-[6px]',
	itemClass = 'w-7 h-7 text-base hover:bg-neutral-100',
}) => {
	const renderItem = (item: SocialType, index: number) => {
		return (
			<a
				key={index}
				href={item.href}
				className={`flex items-center justify-center rounded-full bg-white leading-none text-neutral-6000 ${itemClass}`}
				title={`Share on ${item.name}`}
			>
				{item.icon}
			</a>
		)
	}

	return (
		<div className={`nc-SocialsShare ${className}`} data-nc-id="SocialsShare">
			{socials.map(renderItem)}
		</div>
	)
}

export default SocialsShare
