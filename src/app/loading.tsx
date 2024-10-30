import React from 'react'
import '../styles/loader.css'
export default function Loading() {
	return (
		<div className="fixed left-0 top-0 z-[99999999999999999999999999999999999999999] flex h-screen w-screen items-center justify-center bg-red-500">
			<div className="content">
				<div className="bars">
					<div className="bar"></div>
					<div className="bar"></div>
					<div className="bar"></div> 
					<div className="bar"></div>
					<div className="bar"></div>
					<div className="bar"></div>
					<div className="bar"></div>
				</div>
				<div className="bars">
					<div className="bar"></div>
					<div className="bar"></div>
					<div className="bar"></div>
					<div className="bar"></div>
					<div className="bar"></div>
					<div className="bar"></div>
					<div className="bar"></div>
				</div>
			</div>
		</div>
	)
}
