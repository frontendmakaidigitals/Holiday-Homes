'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

const WhatsappContact = () => {
	const pathname = usePathname()
	const isAdminRoute = pathname.startsWith('/admin')
	const icon = (
		<div className="relative z-[999999]">
			<a
				className="fixed bottom-10 right-10 z-[999999] flex size-14 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-green-600 bg-[#25D366] transition-all duration-300 hover:bg-green-400 hover:shadow-lg"
				href="https://wa.me/15551234567"
			>
				<img
					width={30}
					src={
						'https://cdn-icons-png.freepik.com/256/2585/2585165.png?semt=ais_hybrid'
					}
				/>
			</a>
		</div>
	)

	return !isAdminRoute && icon
}

export default WhatsappContact
