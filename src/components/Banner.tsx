import React from 'react'

const Banner = () => {
	return (
		<div className="bg-primary-50/80 w-full rounded-lg px-3 py-5 lg:p-7">
			<p className="w-full text-center text-xl font-semibold lg:text-3xl">
				Ready to Host your first BSHH guest?
			</p>
			<p className="mt-3 w-full text-center text-lg font-medium">
				Set up your property listing in less than 15 minutes. We`re here to
				support you every step of the way.
			</p>
			<div className="flex w-full items-center justify-center">
				<button className="mt-5 rounded-md bg-primary-400 px-4 py-2 font-semibold text-white hover:bg-primary-300">
					Register now
				</button>
			</div>
		</div>
	)
}

export default Banner
