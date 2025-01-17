'use client'
import React, { useEffect } from 'react'
import { FC } from 'react'
 
export interface CommonLayoutProps {
	children: React.ReactNode
	params: {
		stepIndex: string
	}
}

const CommonLayout: FC<CommonLayoutProps> = ({ children, params }) => {
	const index = Number(params.stepIndex) || 1
 

	return (
		<div
			className={`nc-PageAddListing1 mt-10 max-w-3xl xl:mt-5 xl:px-3 xxl:mt-7 xxl:px-10 xxxl:mt-10 xxxl:px-10`}
		>
			<div className="space-y-11">
				<div>
					<span className="text-4xl font-semibold">{index}</span>{' '}
					<span className="text-lg text-neutral-500 dark:text-neutral-400">
						/ 8
					</span>
				</div>

				{/* --------------------- */}
				<div className="listingSection__wrap">{children}</div>

				{/* --------------------- */}
			</div>
		</div>
	)
}

export default CommonLayout
