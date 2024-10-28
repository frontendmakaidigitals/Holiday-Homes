import Heading from '@/shared/Heading'
import React from 'react'
const keyPoints = [
	{
		title: 'Host with ease and efficiency',
		gradient: 'from-violet-400/60 to-purple-300/30',
	},
	{
		title: 'Robust and Reliable Support',
		gradient: 'from-rose-400/80 to-rose-300/50',
	},
	{
		title: 'Unmatched Flexibility and Versatility',
		gradient: ' from-orange-500/60 to-orange-300/30',
	},
	{
		title: 'Keep Control of your property and finances',
		gradient: 'from-gray-300/80 to-gray-100/40',
	},
]
const HostKeyPoints = () => {
	return (
		<>
			<div className="w-full">
				<Heading desc="We gurantee that your property is listed to maximize revenue. We profit only when you profit. It's that straightforward.">
					Why List with us?
				</Heading>

				<div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
					{keyPoints.map((item, index) => (
						<div
							key={index}
							className={`rounded-xl bg-gray-200 bg-gradient-to-br p-6 ${item.gradient}`}
						>
							<p className="text-lg font-semibold xxl:text-3xl">{item.title}</p>
							<p className="mt-3">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat.{' '}
							</p>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default HostKeyPoints
