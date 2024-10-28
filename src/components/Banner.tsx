'use client'
import React from 'react'
import Form from '@/components/PopUp-form/form'
import { useState } from 'react'
const Banner = () => {
	const [status, setStatus] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	return (
		<div className="w-full rounded-lg bg-primary-50/80 px-3 py-5 lg:p-7">
			{isOpen && (
				<Form setIsOpen={setIsOpen} status={status} setStatus={setStatus} />
			)}
			<p className="w-full text-center text-xl font-semibold lg:text-3xl">
				Ready to Host your first <span className="text-primary-700">BSHH</span>{' '}
				guest?
			</p>
			<p className="mt-3 w-full text-center text-[.8rem] font-medium lg:text-lg">
				Set up your property listing in less than 15 minutes. We`re here to
				support you every step of the way.
			</p>
			<div className="flex w-full items-center justify-center">
				<button
					onClick={() => setIsOpen(true)}
					className="mt-5 rounded-md bg-primary-400 px-4 py-2 font-semibold text-white hover:bg-primary-300"
				>
					<a href="/Get-Estimate">Get Estimate</a>
				</button>
			</div>
		</div>
	)
}

export default Banner
