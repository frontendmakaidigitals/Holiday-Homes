'use client'
import React, { FC, useState } from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/Shadcncomponents/components/ui/select'
import Button from '@/shared/Button'
import Banner from '@/components/Banner'
import Heading from '@/shared/Heading'
import ButtonPrimary from '@/shared/ButtonPrimary'
export interface PageContactProps {}

const PageContact: FC<PageContactProps> = ({}) => {
	const propertyStandards: { title: string; desc: string; image: string }[] = [
		{
			title: 'Design Quality',
			desc: 'Ensure the property is aesthetically pleasing with a cohesive design that reflects modern trends. A well-designed space enhances user experience and leaves a lasting impression.',
			image:
				'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		},
		{
			title: 'Content Quality',
			desc: 'Ensure the property description is well-written, clear, and engaging. Accurate and compelling content helps build trust and communicates key information.',
			image:
				'https://images.pexels.com/photos/3945363/pexels-photo-3945363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		},
		{
			title: 'Maintenance',
			desc: 'Ensure the property is clean, well-maintained, and regularly inspected. A well-kept property not only increases value but also ensures safety and longevity for occupants.',
			image:
				'https://images.pexels.com/photos/6195955/pexels-photo-6195955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		},
		{
			title: 'Pricing',
			desc: 'Ensure the property is competitively priced based on market analysis and value-added features. Proper pricing maximizes returns while appealing to the right audience.',
			image:
				'https://images.pexels.com/photos/8071648/pexels-photo-8071648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		},
	]
	const [isResultShown, setIsResultShown] = React.useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const AreaDropDown = ['Light', 'Dark']
	const Bedrooms = ['Light', 'Dark', 'System']
	const Furnishing = ['Light', 'Dark']
	return (
		<div className={`nc-PageContact overflow-hidden`}>
			<div className="mb-24 lg:mb-32">
				<h2 className="container my-16 flex flex-col items-center justify-center text-center text-3xl font-semibold leading-[115%] text-primary-900 dark:text-neutral-100 sm:my-20 md:text-6xl md:leading-[115%] lg:text-start">
					Get Estimate Revenue
					<span className="text-3xl font-medium text-black">
						for Airbnb & Holiday Home
					</span>
				</h2>

				<div className="container mx-auto">
					<div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-3">
						<div className="flex w-full flex-col items-center justify-center rounded-lg border border-gray-300 bg-gray-100 p-10">
							<p className="text-3xl font-semibold text-primary-900">
								Vacation Rental Calculator
							</p>
							<div className="mt-8 flex w-full justify-center">
								<div className="w-full">
									<div className="">
										<Select>
											<SelectTrigger className="!h-auto w-full max-w-[450px] border-0 bg-white py-2 text-xl font-medium">
												<SelectValue
													className="placeholder:text-gray-600"
													placeholder="Area"
												/>
											</SelectTrigger>
											<SelectContent>
												{AreaDropDown.map((item, index) => {
													return (
														<SelectItem key={index} value={item}>
															{item}
														</SelectItem>
													)
												})}
											</SelectContent>
										</Select>
									</div>

									<div className="mt-7">
										<Select>
											<SelectTrigger className="!h-auto w-full max-w-[450px] border-0 bg-white py-2 text-xl font-medium">
												<SelectValue
													className="placeholder:text-gray-600"
													placeholder="Bedroom"
												/>
											</SelectTrigger>
											<SelectContent>
												{AreaDropDown.map((item, index) => {
													return (
														<SelectItem key={index} value={item}>
															{item}
														</SelectItem>
													)
												})}
											</SelectContent>
										</Select>
									</div>

									<div className="mt-7">
										<Select>
											<SelectTrigger className="!h-auto w-full max-w-[450px] border-0 bg-white py-2 text-xl font-medium">
												<SelectValue
													className="placeholder:text-gray-500"
													placeholder="Furnishing"
												/>
											</SelectTrigger>
											<SelectContent>
												{AreaDropDown.map((item, index) => {
													return (
														<SelectItem key={index} value={item}>
															{item}
														</SelectItem>
													)
												})}
											</SelectContent>
										</Select>
									</div>

									<Button
										className="mt-7 bg-primary-700 text-white"
										href="/Get-Estimate"
									>
										Get Estimate
									</Button>
								</div>
							</div>
						</div>
						<div className="col-span-1 flex h-full items-center justify-center rounded-lg bg-[#9c613765] p-10 lg:col-span-2">
							{isResultShown ? (
								<div className="">
									<p className="text-2xl">
										A <span className="font-semibold">DASH DASH</span> property
										in <span className="font-semibold">DASH DASH</span> can earn
									</p>
									<p className="mt-2 text-4xl font-bold">Price + curr</p>
									<p className="mt-1 text-lg">Daily on average*</p>
									<p className="mt-4 text-sm">
										*Estimates are based on realistic occupancies and similar
										listings in your area
									</p>
								</div>
							) : (
								<p className="text-center text-3xl font-semibold text-primary-900">
									Count{' '}
									<span className="font-semibold text-primary-700">
										how much
									</span>{' '}
									you can <br />
									<span className="font-semibold text-primary-700">
										Earn
									</span>{' '}
									daily on average
								</p>
							)}
						</div>
					</div>
				</div>
				<div className="container mt-20 w-full">
					<div className="grid w-full grid-cols-1 place-items-center gap-10 py-20 lg:grid-cols-2">
						<div className="h-[300px] w-full overflow-hidden rounded-lg lg:h-[600px]">
							<img
								className="h-full w-full object-cover"
								src="https://images.unsplash.com/photo-1546412414-28524ac58329?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1546412414-c2658fffe7d9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							/>
						</div>
						<div className="w-full">
							<p className="text-3xl font-semibold">
								Sign up today and start making money
							</p>

							<form className="mt-7 w-full">
								<div className="w-full">
									<p className="font-semibold">Name</p>
									<input
										className="mt-1 w-full rounded-lg border border-gray-700 px-3 py-3 shadow-sm"
										placeholder="Enter your name"
										required
									/>
								</div>
								<div className="mt-4 w-full">
									<p className="font-semibold">Email</p>
									<input
										className="mt-1 w-full rounded-lg border border-gray-700 px-3 py-3 shadow-sm"
										placeholder="Enter your email"
										required
									/>
								</div>
								<div className="mt-4 w-full">
									<p className="font-semibold">Phone</p>
									<input
										type="number"
										className="mt-1 w-full rounded-lg border border-gray-700 px-3 py-3 shadow-sm"
										placeholder="Enter your Phone number"
										required
									/>
								</div>
								<div className="mt-4 w-full">
									<p className="font-semibold">Message</p>
									<textarea
										className="mt-1 h-24 w-full resize-none rounded-lg border border-gray-700 px-3 py-3 shadow-sm"
										placeholder="Enter your message"
										required
									/>
								</div>
								<ButtonPrimary
									loading={isSubmitting}
									className="mt-8 rounded-lg"
								>
									Submit
								</ButtonPrimary>
							</form>
						</div>
					</div>
				</div>
				<div className="container mt-20">
					<Heading
						className=""
						desc={'You can maximize your returns in several ways:'}
					>
						How to <span className="font-bold">Maximise</span> your returns
					</Heading>
					<div className="mt-10 grid w-full grid-cols-1 gap-6 lg:grid-cols-4">
						{propertyStandards.map((item, index) => (
							<div className="" key={index} data-nc-id="">
								<div className="h-[250px] w-full overflow-hidden rounded-lg bg-slate-200">
									<img
										alt={'image'}
										src={item.image}
										className="h-full w-full object-cover"
									/>
								</div>
								<div className="mt-2">
									<p className="text-2xl font-semibold">{item.title}</p>
									<p className="font-regular mt-1">{item.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="container mt-20">
					<Banner />
				</div>
			</div>
		</div>
	)
}

export default PageContact
