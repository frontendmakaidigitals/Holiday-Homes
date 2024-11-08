'use client'
import React from 'react'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { IoNotificationsOutline } from 'react-icons/io5'
import { motion } from 'framer-motion'

const Navbar = () => {
	const name = 'BSHH Admin'
	return (
		<div className="flex w-full items-start justify-between xl:mt-5 xl:px-3 xxl:mt-10 xxl:px-10">
			<div className="w-full">
				<p className="font-Satoshi font-bold xl:text-2xl xxl:text-4xl">
					Welcome back,{' '}
					<span className="font-Spline capitalize text-[#6b3417]">{name}!</span>
				</p>
				<p className="xl:text-md font-Satoshi mt-2 font-medium text-gray-500 xxl:text-lg">
					Take a look at the updated dashboard overview
				</p>
			</div>

			<div>
				<Popover>
					<PopoverTrigger>
						<div className="group relative">
							<motion.div
								animate={{ scale: [0, 1] }}
								transition={{
									delay: 1,
								}}
								className="absolute right-1 top-0 size-[.4rem] rounded-full bg-[#F44336]"
							/>

							<IoNotificationsOutline className="xl:text-xl xxl:text-3xl" />
						</div>
					</PopoverTrigger>
					<PopoverContent>No new notifications</PopoverContent>
				</Popover>
			</div>
		</div>
	)
}

export default Navbar
