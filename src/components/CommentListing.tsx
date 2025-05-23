import { StarIcon } from '@heroicons/react/24/solid'
import React, { FC } from 'react'

import { LuUserCircle2 } from 'react-icons/lu'
interface CommentListingDataType {
	name: string
	avatar?: string
	date: string
	comment: string
	starPoint: number
}

export interface CommentListingProps {
	className?: string
	data?: CommentListingDataType
	hasListingTitle?: boolean
}

const DEMO_DATA: CommentListingDataType = {
	name: 'Cody Fisher',
	date: 'May 20, 2021',
	comment:
		'There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.',
	starPoint: 5,
}

const CommentListing: FC<CommentListingProps> = ({
	className = '',
	data = DEMO_DATA,
	hasListingTitle,
}) => {
	return (
		<div
			className={`nc-CommentListing flex space-x-4 ${className}`}
			data-nc-id="CommentListing"
		>
			<div className="pt-0.5">
				<LuUserCircle2 className="text-4xl" />
			</div>
			<div className="flex-grow">
				<div className="flex justify-between space-x-3">
					<div className="flex flex-col">
						<div className="text-sm font-semibold">
							<span>{data.name}</span>
							{hasListingTitle && (
								<>
									<span className="font-normal text-neutral-500 dark:text-neutral-400">
										{` review in `}
									</span>
									<a href="/">The Lounge & Bar</a>
								</>
							)}
						</div>
						<span className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
							{data.date}
						</span>
					</div>
					<div className="flex text-yellow-500">
						<StarIcon className="h-4 w-4" />
						<StarIcon className="h-4 w-4" />
						<StarIcon className="h-4 w-4" />
						<StarIcon className="h-4 w-4" />
						<StarIcon className="h-4 w-4" />
					</div>
				</div>
				<span className="mt-3 block text-neutral-6000 dark:text-neutral-300">
					{data.comment}
				</span>
			</div>
		</div>
	)
}

export default CommentListing
