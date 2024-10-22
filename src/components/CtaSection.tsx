'use client'
import React, { useState } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
const CtaSection = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	return (
		<div className="container mt-20 w-full">
			<div className="grid w-full grid-cols-1 place-items-center gap-10 py-20 lg:grid-cols-2">
				<div className="h-[300px] w-full overflow-hidden rounded-lg lg:h-[500px]">
					<img
						className="h-full w-full object-cover"
						src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					/>
				</div>
				<div className="w-full">
					<p className="text-3xl font-semibold">
						Get more information on the short term rental market
					</p>
					<p className="mb-4 mt-2 text-lg">
						Get our brochure delivered to your inbox to get more information on
						the short term rental market so you can get started.
					</p>
					<form className="w-full">
						<div className="w-full">
							<p>Name</p>
							<input
								className="mt-1 w-full rounded-lg border-0 px-3 py-3 shadow-sm"
								placeholder="Enter your name"
							/>
						</div>
						<div className="mt-4 w-full">
							<p>Email</p>
							<input
								className="mt-1 w-full rounded-lg border-0 px-3 py-3 shadow-sm"
								placeholder="Enter your email"
							/>
						</div>
						<div className="mt-4 w-full">
							<p>Message</p>
							<input
								className="mt-1 w-full rounded-lg border-0 px-3 py-3 shadow-sm"
								placeholder="Enter your message"
							/>
						</div>
						<ButtonPrimary loading={isSubmitting} className="mt-10 rounded-lg">
							Submit
						</ButtonPrimary>
					</form>
				</div>
			</div>
		</div>
	)
}

export default CtaSection
