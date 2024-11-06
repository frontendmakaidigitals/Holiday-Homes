'use client'
import React, { useEffect, useState } from 'react'
import { FC } from 'react'
import axios from 'axios'
import { Route } from '@/routers/types'
import { useRouter } from 'next/navigation'
import useStore from '../../EditListing/FormStore'
export interface CommonLayoutProps {
	children: React.ReactNode
	params: {
		stepIndex: string
	}
}

const CommonLayout: FC<CommonLayoutProps> = ({ children, params }) => {
	const index = Number(params.stepIndex) || 1
	console.log(index)
	const {
		ListingData,
		setPropertyType,
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
	} = useStore()
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [status, setStatus] = useState('')
	const [listings, setListing]: any = useState([])
	const getQueries = () => {
		setIsLoading(true)
		axios
			.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/sanctum/csrf-cookie`, {
				withCredentials: true,
			})
			.then(() => {
				return axios.get(
					`${process.env.NEXT_PUBLIC_SERVER_URL}/api/listing/${1}`,
					{
						withCredentials: true,
					},
				)
			})
			.then((res) => {
				setListing(res.data?.data)
				setStatus('success')
			})
			.catch((error) => {
				console.error(error)
				setStatus('failed')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	useEffect(() => {
		getQueries()
	}, [])
	useEffect(() => {
		if (listings) {
			setPropertyType(listings?.propertyType)
			setPlaceName(listings?.placeName)
			setRentalTags(listings?.RentalTags)
			setDescription(listings?.Description)
			setPrice(listings?.Price)
			setArea(listings?.Area)
			setCity(listings?.City)
			setCountry(listings?.Country)
			setStreet(listings?.Street)
			setState(listings?.State)
			setPin(listings?.Pin)
			setRoomNum(listings?.RoomNum)
			setAddress(listings?.Address)
			let marker = listings?.marker
			setAcreage(listings?.Acreage)
			setBedRoom(Number(listings?.bedRoom))
			setBeds(Number(listings?.beds))
			setGuestNum(Number(listings?.guestNum))
			setBathroom(Number(listings?.bathroom))
			if (listings?.checkedAmenities) {
				const TempCheckedAmenties = JSON.parse(listings?.checkedAmenities)
				console.log(TempCheckedAmenties)
				setCheckedAmenities(TempCheckedAmenties)
			}

			if (typeof marker === 'string') {
				try {
					marker = JSON.parse(marker)
					setMarker({ lat: marker.lat, lng: marker.lng })
				} catch (e) {
					console.error('Error parsing marker string:', e)
				}
			}
		}
	}, [listings])

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
