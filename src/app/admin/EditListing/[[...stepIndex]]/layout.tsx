'use client'
import React, { useEffect, useState } from 'react'
import { FC } from 'react'
import axios from 'axios'
import { Route } from '@/routers/types'
import { useRouter, useSearchParams } from 'next/navigation'
import useStore from '../../EditListing/FormStore'
export interface CommonLayoutProps {
	children: React.ReactNode
	params: {
		stepIndex: string
	}
}

const CommonLayout: FC<CommonLayoutProps> = ({ children, params }) => {
	const index = Number(params.stepIndex) || 1
	const [counter, setCounter] = useState(0)
	const {
		setPropertyType,
		ListingData,
		setRentalTags,
		setPlaceName,
		setDescription,
		setPrice,
		setArea,
		setCity,
		setCountry,
		setStreet,
		setState,
		setPin,
		setRoomNum,
		setAddress,
		setMarker,
		setAcreage,
		setBedRoom,
		setBeds,
		setGuestNum,
		setBathroom,
		setCheckedAmenities,
		setAdditionalRules,
		setHouseRule,
		setImages,
		setCoverImage,
	} = useStore()
	const router = useRouter()
	const searchParams = useSearchParams()

	const search = searchParams.get('id')

	

	return (
		<div
			className={`nc-PageAddListing1 mt-10 max-w-3xl xl:mt-5 xl:px-3 xxl:mt-7 xxl:px-10 xxxl:mt-10 xxxl:px-10`}
		>
			<div className="space-y-11">
				<div>
					<span className="text-4xl font-semibold">{index}</span>{' '}
					<span className="text-lg text-neutral-500 dark:text-neutral-400">
						/ 8
					</span>
				</div>

				{/* --------------------- */}
				<div className="listingSection__wrap">{children}</div>

				{/* --------------------- */}
			</div>
		</div>
	)
}

export default CommonLayout
