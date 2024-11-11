'use client'
import React, { FC } from 'react'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import SocialsList from '@/shared/SocialsList'
import Label from '@/components/Label'
import Input from '@/shared/Input'
import Textarea from '@/shared/Textarea'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { useState } from 'react'
import axios from 'axios'
import { IoChatbubblesOutline } from 'react-icons/io5'
import { SlLocationPin } from 'react-icons/sl'
import { LuPhoneCall } from 'react-icons/lu'
import Heading from '@/shared/Heading'

export interface PageContactProps {}

const info = [
	{
		title: ' Visit Us',
		desc: 'Office - 3307 Churchill Towers, Business Bay, Dubai - UAE',
		subtitle: 'Come say Hello at our office HQ.',
		icon: <SlLocationPin />,
	},
	{
		title: ' Chat to us',
		desc: <a href="mailto:info@bsholidayhomes.com">info@bsholidayhomes.com</a>,
		subtitle: 'Our friendly team is always here to help.',
		icon: <IoChatbubblesOutline />,
	},
	{
		title: 'Phone',
		desc: (
			<div className="w-full">
				<p className="font-medium">
					Emergency:{' '}
					<span className="text-gray-800">
						<a href="tel:+971585129847">+971 58 512 9847</a>
					</span>
				</p>
				<p className="block font-medium">
					Customer support:{' '}
					<span className="text-gray-800">
						<a href="tel:+971585244501">+971 58 524 4501</a>
					</span>
				</p>
			</div>
		),
		subtitle: '24x7 support available.',
		icon: <LuPhoneCall />,
	},
]

interface ApiResponse {
	success: boolean
	message: string
	// Add any other properties you expect
}

const PageContact: FC<PageContactProps> = ({}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [response, setResponse] = useState<string>('')
	const [formState, setFormState] = useState({
		name: '',
		email: '',
		message: '',
		phone: '',
		source: 'Contact',
	})
	const SubmitHandler = (e: React.FormEvent) => {
		e.preventDefault()
		try {
			setIsLoading(true)
			axios
				.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/sanctum/csrf-cookie`, {
					withCredentials: true,
				})
				.then(() => {
					return axios.post(
						`${process.env.NEXT_PUBLIC_SERVER_URL}/api/query`,
						formState,
					)
				})
				.then((res) => setResponse('success'))
				.finally(() => {
					setIsLoading(false)
				})
		} catch (error: any) {
			setResponse('failed')
		}
	}

	return (
		<div className={`nc-PageContact overflow-hidden`}>
			<div className="mb-24 lg:mb-32">
				<h2 className="my-16 flex items-center justify-center text-3xl font-semibold leading-[115%] text-gray-900 dark:text-neutral-100 sm:my-20 md:text-5xl md:leading-[115%]">
					Contact Us
				</h2>
				<div className="container mx-auto max-w-7xl">
					<div className="grid flex-shrink-0 grid-cols-1 gap-12 sm:grid-cols-2">
						<div className="max-w-sm space-y-8">
							{info.map((item, index) => (
								<div key={index} className="flex items-start gap-2">
									<div className="rounded-lg border border-gray-300 p-2 text-gray-800">
										{item.icon}
									</div>
									<div>
										<h3 className="text-lg font-bold capitalize tracking-wider dark:text-neutral-200">
											{item.title}
										</h3>
										<p className="text-gray-700">{item.subtitle}</p>
										<div className="mt-2 block font-medium text-neutral-500 dark:text-neutral-400">
											{item.desc}
										</div>
									</div>
								</div>
							))}
							<div>
								<h3 className="text-sm font-semibold uppercase tracking-wider dark:text-neutral-200">
									SOCIALS
								</h3>
								<SocialsList className="mt-2" />
							</div>
						</div>
						<div>
							<form onSubmit={SubmitHandler} className="grid grid-cols-1 gap-6">
								<label className="block">
									<Label>
										Full name<span className="text-red-500">*</span>
									</Label>

									<Input
										placeholder="Example Doe"
										value={formState.name}
										required
										onChange={(e) =>
											setFormState({ ...formState, name: e.target.value })
										}
										type="text"
										className="mt-1"
									/>
								</label>
								<div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
									<label className="block">
										<Label>
											Email address <span className="text-red-500">*</span>
										</Label>

										<Input
											value={formState.email}
											type="email"
											required
											onChange={(e) =>
												setFormState({ ...formState, email: e.target.value })
											}
											placeholder="example@example.com"
											className="mt-1"
										/>
									</label>
									<label className="block">
										<Label>
											Phone No. <span className="text-red-500">*</span>
										</Label>

										<Input
											value={formState.phone}
											type="number"
											required
											onChange={(e) =>
												setFormState({ ...formState, phone: e.target.value })
											}
											placeholder="12345 67890"
											className="mt-1"
										/>
									</label>
								</div>
								<label className="block">
									<Label>Message</Label>

									<Textarea
										value={formState.message}
										className="mt-1 resize-none"
										rows={6}
										onChange={(e) =>
											setFormState({ ...formState, message: e.target.value })
										}
									/>
								</label>
								<div>
									<ButtonPrimary
										loading={isLoading}
										disabled={response === 'success'}
										type="submit"
										className={`mt-8 rounded-lg ${response === 'success' ? '!bg-green-500' : response === 'failed' ? 'bg-red-500' : 'bg-blue-500'}`}
									>
										{isLoading
											? 'Submitting...'
											: response === 'success'
												? 'Submitted Sucessfully!'
												: response === 'failed'
													? 'Try Again'
													: 'Submit'}
									</ButtonPrimary>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="container mb-24 lg:mb-32">
				<Heading isCenter={true} desc={''}>
					Reach Us
				</Heading>
				<div className="h-[400px] w-full overflow-hidden rounded-xl shadow-[0px_0px_10px_1px_#d9d9d9] lg:h-[600px]">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d620.1099118177573!2d55.26314221012659!3d25.180958569943602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69ce658fbc5b%3A0x62ca80127bf7e0f6!2sChurchill%20Towers!5e0!3m2!1sen!2sin!4v1730202443622!5m2!1sen!2sin"
						loading="lazy"
						className="h-full w-full"
					></iframe>
				</div>
			</div>
		</div>
	)
}

export default PageContact
