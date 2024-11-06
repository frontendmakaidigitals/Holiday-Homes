'use client'
import React, { useState, useEffect, Suspense } from 'react'
import '../styles/loader.css'

export default function Loading() {
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		// Disable body scroll when loading
		document.body.style.overflow = 'hidden'

		// Set a timeout for the loading state (2 seconds in this case)
		const timer = setTimeout(() => {
			setLoading(false) // Set loading to false after 2 seconds
			document.body.style.overflow = 'auto' // Re-enable scroll once loading is done
		}, 2000) // Adjust this time as necessary

		// Cleanup the timer and reset body scroll on unmount
		return () => {
			clearTimeout(timer)
			document.body.style.overflow = 'auto' // Ensure scroll is re-enabled
		}
	}, [])

	return (
		loading && (
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
