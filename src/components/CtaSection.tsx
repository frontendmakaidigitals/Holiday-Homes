'use client'
import React, { useState } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
const CtaSection = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	return (
		<div className="container mt-20 w-full">
			<div className="grid w-full grid-cols-1 place-items-center gap-10 py-20 lg:grid-cols-2">
				<div className="h-[300px] w-full overflow-hidden rounded-lg lg:h-full">
					<img
						className="h-full w-full object-cover"
						src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					/>
				</div>
				<div className="w-full">
					<p className="text-3xl font-semibold">
						Get more information on the short term rental market
					</p>
					<p className="text-md mb-4 mt-2">
						Get our brochure delivered to your inbox to get more information on
						the short term rental market so you can get started.
					</p>
					<form className="w-full">
						<div className="w-full">
							<p className="font-semibold">Name</p>
							<input
								className="mt-1 w-full rounded-lg border-0 bg-gray-50/60 px-3 py-3 shadow-sm"
								placeholder="Enter your name"
								required
							/>
						</div>
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
							<div className="mt-4 w-full">
								<p className="font-semibold">Email</p>
								<input
									className="mt-1 w-full rounded-lg border-0 bg-gray-50/60 px-3 py-3 shadow-sm"
									placeholder="Enter your email"
									required
								/>
							</div>
							<div className="mt-4 w-full">
								<p className="font-semibold">Phone</p>
								<input
									type="number"
									className="mt-1 w-full rounded-lg border-0 bg-gray-50/60 px-3 py-3 shadow-sm"
									placeholder="Enter your Phone number"
									required
								/>
							</div>
						</div>
						<div className="mt-4 w-full">
							<p className="font-semibold">Message</p>
							<textarea
								className="mt-1 h-24 w-full resize-none rounded-lg border-0 bg-gray-50/60 px-3 py-3 shadow-sm"
								placeholder="Enter your message"
								required
							/>
						</div>
						<ButtonPrimary loading={isSubmitting} className="mt-8 rounded-lg">
							Submit
						</ButtonPrimary>
					</form>
				</div>
			</div>
		</div>
	)
}

export default CtaSection
