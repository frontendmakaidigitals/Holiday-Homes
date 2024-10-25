'use client'
import React, { FC } from 'react'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import SocialsList from '@/shared/SocialsList'
import Label from '@/components/Label'
import Input from '@/shared/Input'
import Textarea from '@/shared/Textarea'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Logo from '@/shared/Logo'
import { useState } from 'react'
import axios from 'axios'
export interface PageContactProps {}

const info = [
	{
		title: ' ADDRESS',
		desc: 'Office - 1802 Exchange Tower, Business Bay, Dubai - UAE',
	},
	{
		title: ' EMAIL',
		desc: ' info@bsholidayhomes.com',
	},
	{
		title: ' PHONE',
		desc: '+971 4339 4273',
	},
]

interface ApiResponse {
	success: boolean
	message: string
	// Add any other properties you expect
}

const PageContact: FC<PageContactProps> = ({}) => {
	const [isLoading, setIsLoading] = useState(false)
	const [response, setResponse] = useState<ApiResponse | null>(null)
	const [formState, setFormState] = useState({
		name: '',
		email: '',
		message: '',
	})
	const SubmitHandler = () => {
		try {
			setIsLoading(true)
			axios
				.post('/api/contact', formState)
				.then((res) => setResponse(res.data.message))
				.finally(() => setIsLoading(false))
		} catch (error: any) {
			setResponse(error.message || error)
		}
	}
	return (
		<div className={`nc-PageContact overflow-hidden`}>
			<div className="mb-24 lg:mb-32">
				<h2 className="my-16 flex items-center justify-center text-3xl font-semibold leading-[115%] text-neutral-900 dark:text-neutral-100 sm:my-20 md:text-5xl md:leading-[115%]">
					Contact
				</h2>
				<div className="container mx-auto max-w-7xl">
					<div className="grid flex-shrink-0 grid-cols-1 gap-12 sm:grid-cols-2">
						<div className="max-w-sm space-y-8">
							<div className="">
								<Logo />
							</div>
							{info.map((item, index) => (
								<div key={index}>
									<h3 className="text-sm font-semibold uppercase tracking-wider dark:text-neutral-200">
										{item.title}
									</h3>
									<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
										{item.desc}
									</span>
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
							<form className="grid grid-cols-1 gap-6" action="#" method="post">
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
										disabled={response && response.success ? true : false}
										type="submit"
									>
										Send Message
									</ButtonPrimary>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PageContact
