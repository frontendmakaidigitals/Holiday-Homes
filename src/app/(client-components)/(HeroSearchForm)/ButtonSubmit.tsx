import { PathName } from '@/routers/types'
import Link from 'next/link'
import React, { FC } from 'react'
import { CiSearch } from 'react-icons/ci'
import { UrlObject } from 'url'
interface Props {
	href?: UrlObject | PathName
	disabled?: boolean
}

const ButtonSubmit: FC<Props> = ({
	href = '/listing-stay-map',
	disabled = false,
}) => {
	return (
		<Link href={href}>
			<button
				disabled={disabled}
				type="button"
				className="flex h-14 w-full items-center justify-center rounded-3xl bg-primary-6000 text-gray-50 hover:bg-primary-700 focus:outline-none disabled:bg-slate-300 md:h-16 md:w-16"
			>
				<span className="mr-3 md:hidden">Search</span>
				<CiSearch className="text-4xl" />
			</button>
		</Link>
	)
}

export default ButtonSubmit
