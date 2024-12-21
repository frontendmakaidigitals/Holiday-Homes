import Heading from '@/shared/Heading'
import React from 'react'
const keyPoints = [
	{
		title: 'Host with ease and efficiency',
		gradient: 'from-violet-400/60 to-purple-300/30',
		desc: 'Listing your property on our platform is quick, easy, and efficient. With a simple process, you can have your property showcased to a wide audience of potential guests in no time. Our platform allows you to upload photos, set your availability, and manage bookings with ease. ',
	},
	{
		title: 'Robust and Reliable Support',
		gradient: 'from-rose-400/80 to-rose-300/50',
		desc: 'Our dedicated team is available to guide you through every step, ensuring your property is presented beautifully and effectively to potential guests. From uploading high-quality photos to setting rental rates and availability, we provide all the tools you need to manage your listing with ease. ',
	},
	{
		title: 'Unmatched Flexibility and Versatility',
		gradient: ' from-orange-500/60 to-orange-300/30',
		desc: 'Listing your property on our website allows you to customize every aspect of your listing to suit your needs. Whether you`re offering a single room or an entire home, our platform gives you the freedom to adjust pricing, set availability, and choose booking preferences with ease. You can manage multiple properties, and update listings in real-time. ',
	},
	{
		title: 'Keep Control of your property and finances',
		gradient: 'from-gray-300/80 to-gray-100/40',
		desc: 'Listing your property on our holiday homes website gives you complete control over both your property and finances. With full access to your account, you can make adjustments anytime, ensuring that both your property and financial interests are always in your hands.',
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
							<p className="text-lg font-semibold xxl:text-4xl">{item.title}</p>
							<p className="mt-3">
								{item.desc}
							</p>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default HostKeyPoints
