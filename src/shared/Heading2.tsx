import React from 'react'
import { ReactNode } from 'react'

export interface Heading2Props {
	heading?: ReactNode
	subHeading?: ReactNode
	className?: string
	listing?: {}[]
}

const Heading2: React.FC<Heading2Props> = ({
	className = '',
	heading = 'Stays in Tokyo',
	subHeading,
	listing = [{}]
}) => {
	return (
		<div className={`mb-12 lg:mb-16 ${className}`}>
			<h2 className="text-4xl font-semibold">{heading}</h2>
			{subHeading ? (
				subHeading
			) : (
				<span className="mt-3 block text-neutral-500 dark:text-neutral-400">
					{listing.length > 0 ? `${listing.length}+ stays`  :null} 
				</span>
			)}
		</div>
	)
}

export default Heading2
