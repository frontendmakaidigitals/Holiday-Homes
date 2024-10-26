import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

type Inputs = {
	name: string
	email: string
	phone: string
	company: string
	message: string
}
const Form = ({
	setIsOpen,
	setStatus,
	status,
}: {
	status: string
	setStatus: any
	setIsOpen: any
}) => {
	const { register, handleSubmit } = useForm<Inputs>()
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
	interface FormData {
		name: string
		email: string
		phone: string
		company: string
		message: string
	}
	const submitBlog = (data: FormData, e: any) => {
		const updatedData = {
			...data,
			source: 'contact page',
		}

		if (true) {
			setIsSubmitting(true)
			axios.get('https://admin.yatriclubs.com/sanctum/csrf-cookie', {
				withCredentials: true,
			})
			axios
				.post(`https://admin.yatriclubs.com/api/query`, updatedData, {
					withCredentials: true,
					headers: { 'Content-Type': 'multipart/form-data' },
				})
				.then((res) => {
					setStatus('success')
					setIsSubmitting(false)
					setIsOpen(false)
					setTimeout(() => {
						setStatus(null)
					}, 2000)
				})
				.catch((error) => {
					console.error(error)
					setStatus('failed')
					setTimeout(() => {
						setStatus(null)
					}, 2000)
				})
				.finally(() => {
					console.log('finally')
					setIsSubmitting(false)
				})
		}
	}
	return (
		<div className="fixed left-0 top-0 z-[99999999999999999999] h-screen w-full bg-gray-900/60">
			<div className="flex h-full w-full items-center justify-center px-4 py-10">
				{/* Contact Form */}
				<form
					onSubmit={handleSubmit(submitBlog)}
					className="relative flex w-full flex-col gap-y-5 overflow-auto rounded-lg bg-primary-50 px-[30px] py-6 shadow-[0_4px_60px_0_rgba(0,0,0,0.1)] lg:w-auto"
				>
					<IoMdClose
						onClick={() => setIsOpen(false)}
						className="absolute right-5 top-5 cursor-pointer rounded-full p-1 text-3xl hover:bg-red-500 hover:text-slate-50"
					/>
					<div>
						<p className="font-Satoshi text-3xl font-bold">Contact Us</p>
					</div>
					{/* Form Group */}
					<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
						{/* Form Single Input */}
						<div className="flex flex-col gap-y-[10px]">
							<label
								htmlFor="contact-name"
								className="font-Satoshi text-lg font-medium leading-[1.6]"
							>
								Enter your name
							</label>
							<input
								type="text"
								{...register('name')}
								placeholder="Adam Smith"
								className="rounded-[10px] border-0 bg-primary-100/40 px-4 py-2 font-medium text-black outline-none transition-all placeholder:text-primary-900 focus:border-primary-500 focus:shadow-sm"
								required
							/>
						</div>
						{/* Form Single Input */}
						{/* Form Single Input */}
						<div className="flex flex-col gap-y-[10px]">
							<label
								htmlFor="contact-email"
								className="font-Satoshi text-lg font-medium leading-[1.6]"
							>
								Email address
							</label>
							<input
								type="email"
								{...register('email')}
								placeholder="adam@BSHH.ae"
								className="rounded-[10px] border-0 bg-primary-100/40 px-4 py-2 font-medium text-black outline-none transition-all placeholder:text-primary-900 focus:border-primary-500 focus:shadow-sm"
								required
							/>
						</div>
						{/* Form Single Input */}
					</div>
					{/* Form Group */}
					{/* Form Group */}
					<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
						{/* Form Single Input */}
						<div className="flex flex-col gap-y-[10px]">
							<label
								htmlFor="contact-phone"
								className="font-Satoshi text-lg font-medium leading-[1.6]"
							>
								Phone number
							</label>
							<input
								type="tel"
								{...register('phone')}
								placeholder="12345 67890"
								className="rounded-[10px] border-0 bg-primary-100/40 px-4 py-2 font-medium text-black outline-none transition-all placeholder:text-primary-900 focus:border-primary-500 focus:shadow-sm"
								required
							/>
						</div>
						{/* Form Single Input */}
						{/* Form Single Input */}
						<div className="flex flex-col gap-y-[10px]">
							<label
								htmlFor="contact-company"
								className="font-Satoshi text-lg font-medium leading-[1.6]"
							>
								Company
							</label>
							<input
								type="text"
								{...register('company')}
								placeholder="facebook"
								className="rounded-[10px] border-0 bg-primary-100/40 px-4 py-2 font-medium text-black outline-none transition-all placeholder:text-primary-900 focus:border-primary-500 focus:shadow-sm"
								required
							/>
						</div>
						{/* Form Single Input */}
					</div>
					{/* Form Group */}
					{/* Form Group */}
					<div className="grid grid-cols-1 gap-6">
						{/* Form Single Input */}
						<div className="flex flex-col gap-y-[10px]">
							<label
								htmlFor="contact-message"
								className="font-Satoshi text-lg font-medium leading-[1.6]"
							>
								Message
							</label>
							<textarea
								id="contact-message"
								{...register('message')}
								className="h-24 resize-none rounded-[10px] border-0 bg-primary-100/40 px-4 py-2 font-medium text-black outline-none transition-all placeholder:text-primary-900 focus:border-primary-500 focus:shadow-sm xxl:h-[180px]"
								placeholder="Write your message here..."
							/>
						</div>
						{/* Form Single Input */}
					</div>
					<div className="fl focus:shadow-smex justify-star focus:shadow-smt mt-7 w-full">
						<button
							type="submit"
							className="primary-primary-400 rounded-xl border bg-primary-200 px-4 py-2 text-lg font-semibold text-primary-800 hover:text-gray-900"
						>
							{isSubmitting ? (
								<div className="flex items-center gap-3">
									<svg
										className="h-6 w-6 animate-spin text-gray-300"
										viewBox="0 0 64 64"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
									>
										<path
											d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
											stroke="currentColor"
											strokeWidth="5"
											strokeLinecap="round"
											strokeLinejoin="round"
										></path>
										<path
											d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
											stroke="currentColor"
											strokeWidth="5"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="text-gray-900"
										></path>
									</svg>
									<span>Submitting...</span>
								</div>
							) : (
								'Submit'
							)}
						</button>
					</div>
					{/* Form Group */}
				</form>
				{/* Contact Form */}
			</div>
		</div>
	)
}

export default Form
