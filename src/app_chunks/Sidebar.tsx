'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaUserCircle } from 'react-icons/fa'
import { IoIosExit } from 'react-icons/io'
import { MdSpaceDashboard } from 'react-icons/md'
import { FiList } from 'react-icons/fi'
import React, { RefObject } from 'react'

const Sidebar = ({
	path,
	sideRef,
}: {
	path: string
	sideRef: RefObject<HTMLDivElement>
}) => {
	const img =
		'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/1d52d65a-d57f-4b68-b9fe-d7741ff6656c/4c4421c7-822a-46b9-8016-7c057f326af3.png'
	const menus: {
		name: string
		icon: JSX.Element
		link: { pathname: string }
	}[] = [
		{
			name: 'Dashboard',
			icon: <MdSpaceDashboard />,
			link: { pathname: '/admin/dashboard' }, // Use UrlObject
		},
		{
			name: 'Listings',
			icon: <FiList />,
			link: { pathname: '/admin/listings' }, // Use UrlObject
		},
	]

	return (
		<div
			ref={sideRef}
			className="fixed left-0 top-0 z-[999] h-screen w-[280px] overflow-hidden bg-[#070504] py-5"
		>
			<motion.div
				animate={{ scale: [0.5, 1], opacity: [0.5, 1] }}
				transition={{ delay: 0.5, duration: 2.5, ease: 'easeOut' }}
				className="-z-1 absolute -left-10 -top-10 size-48 rounded-full bg-gradient-to-r from-[#dcf2ff9c] to-[#bd816b8f] blur-2xl"
			/>

			<div className="xxl:mt-7 xxxl:mt-10 flex w-full items-center justify-center xl:mt-5">
				<img src={`/Logo.png`} className="xxl:w-44 w-[150px]" />
			</div>

			<div className="mt-10 flex flex-col items-center justify-center gap-2 rounded-xl px-5 transition-all duration-200">
				<div className="xxl:size-20 size-20 cursor-pointer overflow-hidden rounded-full border-4 border-white bg-gray-100 xl:size-14">
					{img ? (
						<img
							alt="profile"
							src={img}
							className="h-full w-full object-cover object-right"
						/>
					) : (
						<FaUserCircle className="text-2xl" />
					)}
				</div>
				<p className="font-Satoshi xxl:text-md xxxl:text-lg mt-1 text-lg font-medium text-white xl:text-sm">
					Faheem
				</p>
			</div>

			<div className="mt-10">
				{menus.map((menu, index) => (
					<Link
						href={menu.link}
						key={index}
						className={`font-Satoshi transiton-all group relative flex items-center gap-3 rounded-md px-10 py-3 duration-300 hover:bg-[#FEE3D4] hover:text-gray-950 ${
							path?.toLowerCase() === menu.name.toLowerCase()
								? 'font-bold-bold text-[#FEE3D4]'
								: 'font-semibold text-gray-100'
						}`}
					>
						{path?.toLowerCase() === menu.name.toLowerCase() ? (
							<div className="absolute left-0 top-1/2 h-1/2 w-1 -translate-y-1/2 rounded-xl bg-[#FEE3D4] group-hover:bg-gray-950"></div>
						) : null}

						<div className="xxl:text-xl xl:text-lg">{menu.icon}</div>
						<p className="font-Satoshi xl:text-md xxl:text-xl xxxl:text-2xl font-[500]">
							{menu.name}
						</p>
					</Link>
				))}
			</div>
			<button
				type="button"
				className="transiton-all absolute bottom-0 left-0 flex w-full items-center gap-3 px-10 py-5 text-gray-100 duration-300 hover:bg-[#FF1744] hover:text-gray-900"
			>
				<IoIosExit className="xxl:text-2xl rotate-180 xl:text-2xl" />
				<span className="font-Satoshi xl:text-md xxl:text-xl xxxl:text-2xl font-[500]">
					Logout
				</span>
			</button>
		</div>
	)
}
export default Sidebar
