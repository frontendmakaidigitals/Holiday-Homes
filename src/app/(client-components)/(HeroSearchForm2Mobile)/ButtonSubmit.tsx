import React, { FC } from 'react'
import { PathName } from '@/routers/types'
import Link from 'next/link'
interface Props {
	className?: string
	onClick?: () => void
	href?: any
	disabled?: boolean
}
const ButtonSubmit: FC<Props> = ({
	className = '',
	onClick = () => {},
	href,
	disabled = false,
}) => {
	return (
		<Link href={href}>
			<button
				type="submit"
				disabled={disabled}
			 
				className={`flex flex-shrink-0 cursor-pointer items-center justify-center rounded-xl bg-primary-6000 px-4 py-2.5 text-neutral-50 focus:outline-none disabled:bg-slate-300 ${className} relative z-20`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
				<span className="ml-2">Search</span>
			</button>
		</Link>
	)
}

export default ButtonSubmit
