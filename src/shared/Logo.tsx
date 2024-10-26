import React from 'react'
import Image, { StaticImageData } from 'next/image'
import logoImg from '@/images/PrimaryLogo.png'
import Link from 'next/link'

export interface LogoProps {
	img?: StaticImageData
	className?: string
}

const Logo: React.FC<LogoProps> = ({ img = logoImg, className = 'w-20' }) => {
	return (
		<Link
			href="/"
			className={`text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
		>
			{/* THIS USE FOR MY CLIENT */}
			{/* PLEASE UNCOMMENT BELOW CODE AND USE IT */}
			{img ? (
				<img className={`block ${className} `} src={img.src} alt="Logo" />
			) : (
				'Logo Here'
			)}
		</Link>
	)
}

export default Logo
