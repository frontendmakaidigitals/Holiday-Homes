'use client'
import Sidebar from '@/app_chunks/Sidebar'
import Navbar from '@/app_chunks/Navbar'
import { usePathname } from 'next/navigation'
import { useRef, useEffect, useState } from 'react'
export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()
	const path = pathname.split('/')[2]
	const [sideWidth, setSideWidth] = useState<number>(0)
	const sideRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (sideRef.current) {
			setSideWidth(sideRef.current?.clientWidth)
		}
	}, [])

	return (
		<div className="relative flex w-full justify-end">
			<Sidebar sideRef={sideRef} path={path} />
			<div
				style={{
					width: `calc(100% - ${sideWidth}px)`,
				}}
				className="relative w-full p-5"
			>
				<div className="w-full">
					<Navbar />
				</div>
				 
				{children}
			</div>
		</div>
	)
}
