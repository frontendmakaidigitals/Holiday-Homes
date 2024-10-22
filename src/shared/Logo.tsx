import React from 'react'
import Image, { StaticImageData } from 'next/image'
import logoImg from '@/images/PrimaryLogo.png'
import Link from 'next/link'

export interface LogoProps {
	img?: StaticImageData
	imgLight?: StaticImageData | string
	className?: string
}

const Logo: React.FC<LogoProps> = ({
	img = logoImg,
	imgLight = logoImg,
	className = 'w-20',
}) => {
	return (
		<Link
			href="/"
			className={`text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
		>
			{/* THIS USE FOR MY CLIENT */}
			{/* PLEASE UNCOMMENT BELOW CODE AND USE IT */}
			{img ? (
				<img
					className={`block ${className} ${imgLight ? 'dark:hidden' : ''}`}
					src={'/PrimaryLogo.png'}
					alt="Logo"
				/>
			) : (
				'Logo Here'
			)}
			{imgLight && (
				<img
					className="hidden dark:block"
					src={'/PrimaryLogo.png'}
					alt="Logo-Light"
				 
				/>
			)}
		</Link>
	)
}

export default Logo
