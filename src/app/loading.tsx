'use client'
import React, { useState, useEffect, Suspense } from 'react'
import '../styles/loader.css'
import { usePathname, useSearchParams } from 'next/navigation'

const Loading = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Loader />
		</Suspense>
	)
}

export default Loading

const Loader = () => {
	const [isLoading, setIsLoading] = useState(true)
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const query = searchParams.get('area')
	useEffect(() => {
		setIsLoading(true)
		document.body.style.overflow = 'hidden'
		const timer = setTimeout(() => {
			setIsLoading(false)
			document.body.style.overflow = 'auto'
		}, 2000)
		return () => {
			clearTimeout(timer)
			document.body.style.overflow = 'auto'
		}
	}, [pathname, query])

	return (
		isLoading && (
			<div className="fixed left-0 top-0 z-[9999999999999999] flex h-screen w-screen items-center justify-center bg-slate-100">
				<div className="contain">
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
				</div>
			</div>
		)
	)
}
