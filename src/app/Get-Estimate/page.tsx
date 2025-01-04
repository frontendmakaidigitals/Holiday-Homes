'use client'
import React, { FC, useState, ChangeEvent, FormEvent } from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectGroup,
} from '@/Shadcncomponents/components/ui/select'
import Button from '@/shared/Button'
import Banner from '@/components/Banner'
import Heading from '@/shared/Heading'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { IndexKind } from 'typescript'
import axios from 'axios'
export interface PageContactProps {}

export interface PropertyStandard {
	title: string
	desc: string
	image: string
}

export interface FinalPrice {
	area: string | undefined
	bedroom: string | undefined
	price: string
}

export interface EstimateData {
	name: string
	value: string
	error: boolean
}
const PageContact: FC<PageContactProps> = ({}) => {
	const propertyStandards: PropertyStandard[] = [
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

	const [finalPrice, setFinalPrice] = useState<FinalPrice>({
		area: undefined,
		bedroom: undefined,
		price: '',
	})

	const [isResultShown, setIsResultShown] = useState(false)
	const [estimateData, setEstimateData] = useState<EstimateData[]>([
		{ name: 'area', value: '', error: false },
		{ name: 'bedroom', value: '', error: false },
		{ name: 'furnish', value: '', error: false },
	])

	const AreaDropDown = [
		'Business Bay',
		'Sportcity',
		'Dubai Hills',
		'Town Square',
		'JLT',
		'Mirdif Hills',
		'Al Furjan',
		'Marina',
		'JVC/JVT',
		'Damac Hills',
		'Downtown',
		'JBR',
		'Al Barsha South',
		'Al Jaddaf',
		'Arabian Ranches (Villas)',
		'Bluewaters Island',
		'Citywalk',
		'DIFC',
		'Discovery Gardens',
		'Dubai South',
		'Festival City',
		'Greens',
		'MBR City',
		'MADINAT JUMEIRAH',
		'MEYDAN',
		'PALM JUMEIRAH',
		'RAS AL KHOR',
		'SILICON OASIS',
		'TECOM',
	]

	const BedroomDropDown = ['studio', 'One Bed', 'Two Bed', 'Three Bed']
	const FurnishDropDown = ['Standard', 'Premium']

	const prices = [
		{
			areaName: 'Business Bay',
			studio: 450,
			oneBed: 550,
			twoBed: 675,
			threeBed: 899,
		},
		{
			areaName: 'Sportcity',
			studio: 275,
			oneBed: 325,
			twoBed: 499,
			threeBed: 699,
		},
		{
			areaName: 'Dubai Hills',
			studio: 450,
			oneBed: 550,
			twoBed: 675,
			threeBed: 899,
		},
		{
			areaName: 'Town Square',
			studio: 275,
			oneBed: 325,
			twoBed: 499,
			threeBed: 699,
		},
		{ areaName: 'JLT', studio: 450, oneBed: 550, twoBed: 675, threeBed: 899 },
		{
			areaName: 'Mirdif Hills',
			studio: 450,
			oneBed: 550,
			twoBed: 675,
			threeBed: 899,
		},
		{
			areaName: 'Al Furjan',
			studio: 325,
			oneBed: 375,
			twoBed: 499,
			threeBed: 699,
		},
		{
			areaName: 'Marina',
			studio: 450,
			oneBed: 550,
			twoBed: 675,
			threeBed: 899,
		},
		{
			areaName: 'JVC/JVT',
			studio: 450,
			oneBed: 550,
			twoBed: 675,
			threeBed: 899,
		},
		{
			areaName: 'Damac Hills',
			studio: 325,
			oneBed: 375,
			twoBed: 499,
			threeBed: 699,
		},
		{
			areaName: 'Downtown',
			studio: 550,
			oneBed: 700,
			twoBed: 850,
			threeBed: 1250,
		},
		{
			areaName: 'JBR',
			studio: 550,
			oneBed: 700,
			twoBed: 850,
			threeBed: 1250,
		},
		{
			areaName: 'Al Barsha South',
			studio: 450,
			oneBed: 550,
			twoBed: 675,
			threeBed: 899,
		},
		{
			areaName: 'Al Jaddaf',
			studio: 450,
			oneBed: 550,
			twoBed: 675,
			threeBed: 899,
		},
		{
			areaName: 'Arabian Ranches (Villas)',
			studio: null,
			oneBed: null,
			twoBed: null,
			threeBed: 1200,
		},
		{
			areaName: 'Bluewaters Island',
			studio: 550,
			oneBed: 700,
			twoBed: 850,
			threeBed: 1250,
		},
		{
			areaName: 'Citywalk',
			studio: 550,
			oneBed: 700,
			twoBed: 850,
			threeBed: 1250,
		},
		{
			areaName: 'DIFC',
			studio: 550,
			oneBed: 700,
			twoBed: 850,
			threeBed: 1250,
		},
		{
			areaName: 'Dubai South',
			studio: 325,
			oneBed: 375,
			twoBed: 499,
			threeBed: 699,
		},
		{
			areaName: 'Festival City',
			studio: 450,
			oneBed: 550,
			twoBed: 675,
			threeBed: 899,
		},
		{
			areaName: 'Greens',
			studio: 450,
			oneBed: 550,
			twoBed: 675,
			threeBed: 899,
		},
		{
			areaName: 'MBR City',
			studio: 450,
			oneBed: 550,
			twoBed: 675,
			threeBed: 899,
		},
		{
			areaName: 'Madinat Jumeirah',
			studio: 550,
			oneBed: 700,
			twoBed: 850,
			threeBed: 1250,
		},
		{
			areaName: 'Meydan',
			studio: 450,
			oneBed: 550,
			twoBed: 675,
			threeBed: 899,
		},
		{
			areaName: 'Palm Jumeirah',
			studio: 2000,
			oneBed: 2500,
			twoBed: 3000,
			threeBed: 3000,
		},
		{
			areaName: 'Ras Al Khor',
			studio: 450,
			oneBed: 550,
			twoBed: 675,
			threeBed: 899,
		},
		{
			areaName: 'Silicon Oasis',
			studio: 450,
			oneBed: 550,
			twoBed: 675,
			threeBed: 899,
		},

		{
			areaName: 'Tecom',
			studio: 450,
			oneBed: 550,
			twoBed: 675,
			threeBed: 899,
		},
	]

	const HandleEstimate = () => {
		const hasEmptyFields = estimateData.some((field) => !field.value)

		if (hasEmptyFields) {
			setEstimateData((prevData) =>
				prevData.map((field) => ({ ...field, error: !field.value })),
			)
			return // Stop function execution
		}

		const selectedArea = estimateData.find(
			(item) => item.name === 'area',
		)?.value
		const selectedBedroom = estimateData.find(
			(item) => item.name === 'bedroom',
		)?.value
		const price = getPrice(selectedArea, selectedBedroom)

		if (price !== null) {
			setFinalPrice({
				area: selectedArea,
				bedroom: selectedBedroom,
				price: price.toString(),
			})
			setIsResultShown(true)
		} else {
			console.error('Price not found for the selected area and bedroom type.')
		}
	}

	const getPrice = (
		selectedArea: string | undefined,
		selectedBedroom: string | undefined,
	) => {
		const bedroomMap: Record<string, keyof (typeof prices)[number]> = {
			studio: 'studio',
			'One Bed': 'oneBed',
			'Two Bed': 'twoBed',
			'Three Bed': 'threeBed',
		}

		const bedroomKey = bedroomMap[selectedBedroom as keyof typeof bedroomMap]
		const area = prices.find(
			(area) => area.areaName.toLowerCase() === selectedArea?.toLowerCase(),
		)
		return area ? (area[bedroomKey] ?? null) : null
	}

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [status, setStatus] = useState('')
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		message: '',
	})
	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const submitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault() // Prevent page refresh
		const updatedData = {
			...formData,
			source: 'Estimate Form',
		}

		try {
			setIsSubmitting(true)
			axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/sanctum/csrf-cookie`, {
				withCredentials: true,
			})
			await axios.post(
				`${process.env.NEXT_PUBLIC_SERVER_URL}` + `/api/query`,
				updatedData,
				{
					withCredentials: true,
					headers: { 'Content-Type': 'application/json' },
				},
			)

			setStatus('success')
			setFormData({ name: '', email: '', phone: '', message: '' }) // Clear form
		} catch (error) {
			console.error(error)
			setStatus('failed')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className={`nc-PageContact overflow-hidden`}>
			<div className="mb-24 bg-[url('https://img.freepik.com/free-vector/gradient-blur-pink-blue-abstract-background_53876-117324.jpg?semt=ais_hybrid')] bg-cover bg-center bg-no-repeat py-10 lg:mb-32">
				<h2 className="container !mt-10 flex flex-col items-center justify-center text-center text-3xl font-semibold leading-[115%] text-primary-900 dark:text-neutral-100 sm:my-20 md:text-6xl md:leading-[115%] lg:text-start">
					Short Term Rentals
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
										<Select
											onValueChange={(value) =>
												setEstimateData((val) =>
													val.map((item) =>
														item.name === 'area'
															? { ...item, value, error: false } // Update value and reset error to false
															: item,
													),
												)
											}
										>
											<SelectTrigger
												value={estimateData.map((item) => item.value)[0]}
												className={`${estimateData.find((item) => item.name === 'area')?.error ? 'border-red-500' : 'border-gray-300'} w-full max-w-[450px] border bg-white text-xl font-medium`}
											>
												<SelectValue
													className="placeholder:text-gray-600"
													placeholder="Area"
												/>
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{AreaDropDown.map((item, index) => {
														return (
															<SelectItem key={index} value={item}>
																{item}
															</SelectItem>
														)
													})}
												</SelectGroup>
											</SelectContent>
										</Select>
										{estimateData.find((item) => item.name === 'area')
											?.error ? (
											<p className="absolute left-0 top-full text-red-500">
												This field is required
											</p>
										) : null}
									</div>

									<div className="relative mt-7">
										<Select
											onValueChange={(value) =>
												setEstimateData((val) =>
													val.map((item) =>
														item.name === 'bedroom'
															? { ...item, value, error: false } // Update value and reset error to false
															: item,
													),
												)
											}
										>
											<SelectTrigger
												value={estimateData.map((item) => item.value)[1]}
												className={`${estimateData.find((item) => item.name === 'bedroom')?.error ? 'border-red-500' : 'border-gray-300'} w-full max-w-[450px] border bg-white py-2 text-xl font-medium`}
											>
												<SelectValue
													className="placeholder:text-gray-600"
													placeholder="Bedroom"
												/>
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{BedroomDropDown.map((item, index) => {
														return (
															<SelectItem key={index} value={item}>
																{item}
															</SelectItem>
														)
													})}
												</SelectGroup>
											</SelectContent>
										</Select>
										{estimateData.find((item) => item.name === 'bedroom')
											?.error ? (
											<p className="absolute left-0 top-full text-red-500">
												This field is required
											</p>
										) : null}
									</div>

									<div className="relative mt-7">
										<Select
											onValueChange={(value) =>
												setEstimateData((val) =>
													val.map((item) =>
														item.name === 'furnish'
															? { ...item, value, error: false } // Update value and reset error to false
															: item,
													),
												)
											}
										>
											<SelectTrigger
												value={estimateData.map((item) => item.value)[2]}
												className={`${estimateData.find((item) => item.name === 'furnish')?.error ? 'border-red-500' : 'border-gray-300'} w-full max-w-[450px] border bg-white py-2 text-xl font-medium`}
											>
												<SelectValue
													className="placeholder:text-gray-500"
													placeholder="Furnishing"
												/>
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{FurnishDropDown.map((item, index) => {
														return (
															<SelectItem key={index} value={item}>
																{item}
															</SelectItem>
														)
													})}
												</SelectGroup>
											</SelectContent>
										</Select>
										{estimateData.find((item) => item.name === 'furnish')
											?.error ? (
											<p className="absolute left-0 top-full text-red-500">
												This field is required
											</p>
										) : null}
									</div>

									<Button
										className="mt-10 bg-primary-700 text-white"
										onClick={HandleEstimate}
									>
										Get Estimate
									</Button>
								</div>
							</div>
						</div>
						<div className="col-span-1 flex h-full items-center justify-center rounded-lg border border-gray-100 bg-gray-500 bg-opacity-10 bg-clip-padding p-10 backdrop-blur-md backdrop-filter lg:col-span-2">
							{isResultShown ? (
								<div className="">
									<p className="text-3xl text-primary-900">
										A{' '}
										<span className="font-medium text-primary-500">
											{finalPrice.bedroom}
										</span>{' '}
										property in{' '}
										<span className="font-medium text-primary-500">
											{finalPrice.area}
										</span>{' '}
										can earn
									</p>
									<p className="mt-2 text-5xl font-bold text-primary-6000">
										{finalPrice.price}{' '}
										<span className="text-lg font-bold">AED</span>
									</p>
									<p className="mt-1 text-lg text-primary-900">
										Daily on average*
									</p>
									<p className="mt-4 text-sm text-primary-900">
										*Estimates are based on realistic occupancies and similar
										listings in your area
									</p>
								</div>
							) : (
								<p className="text-center text-3xl font-semibold text-primary-900">
									Count{' '}
									<span className="font-medium text-primary-700">how much</span>{' '}
									you can <br />
									<span className="font-medium text-primary-700">
										Earn
									</span>{' '}
									daily on average
								</p>
							)}
						</div>
					</div>
				</div>
				<div className="container mt-3 w-full">
					<div className="mt-10 grid w-full grid-cols-1 place-items-center gap-10 rounded-lg bg-primary-50/70 px-5 py-10 lg:grid-cols-2">
						<div className="h-[300px] w-full overflow-hidden rounded-lg lg:h-[500px]">
							<img
								className="h-full w-full object-cover"
								src="https://images.unsplash.com/photo-1601638517319-2316349062cf?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							/>
						</div>
						<div className="w-full">
							<p className="text-3xl font-semibold">
								Sign up today and start making Rental Income
							</p>

							<form onSubmit={submitForm} className="mt-7 w-full">
								<div className="w-full">
									<p className="text-sm font-medium">Name</p>
									<input
										className="mt-1 w-full rounded-lg border border-gray-200 bg-primary-200 px-3 py-3 shadow-sm placeholder:text-gray-700"
										placeholder="Enter your name"
										required
										value={formData.name}
										onChange={handleChange}
										name="name"
									/>
								</div>
								<div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
									<div className="mt-4 w-full">
										<p className="text-sm font-medium">Email</p>
										<input
											className="mt-1 w-full rounded-lg border border-gray-200 bg-primary-200 px-3 py-3 shadow-sm placeholder:text-gray-700"
											placeholder="Enter your email"
											required
											value={formData.email}
											onChange={handleChange}
											name="email"
										/>
									</div>
									<div className="mt-4 w-full">
										<p className="text-sm font-medium">Phone</p>
										<input
											type="number"
											className="mt-1 w-full rounded-lg border border-gray-200 bg-primary-200 px-3 py-3 shadow-sm placeholder:text-gray-700"
											placeholder="Enter your Phone number"
											required
											value={formData.phone}
											onChange={handleChange}
											name="phone"
										/>
									</div>
								</div>
								<div className="mt-4 w-full">
									<p className="text-sm font-medium">Message</p>
									<textarea
										className="mt-1 h-24 w-full resize-none rounded-lg border border-gray-200 bg-primary-200 px-3 py-3 shadow-sm placeholder:text-gray-700"
										placeholder="Enter your message"
										required
										value={formData.message}
										onChange={handleChange}
										name="message"
									/>
								</div>
								<ButtonPrimary
									loading={isSubmitting}
									disabled={status === 'success'}
									className={`mt-8 rounded-lg ${status === 'success' ? '!bg-green-500' : status === 'failed' ? 'bg-red-500' : 'bg-blue-500'}`}
								>
									{isSubmitting
										? 'Submitting...'
										: status === 'success'
											? 'Submitted Sucessfully!'
											: status === 'failed'
												? 'Try Again'
												: 'Submit'}
								</ButtonPrimary>
							</form>
						</div>
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
							<div className="mt-3">
								<p className="text-2xl font-semibold">{item.title}</p>
								<p className="font-regular mt-1">{item.desc}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="container my-20">
				<Banner />
			</div>
		</div>
	)
}

export default PageContact
