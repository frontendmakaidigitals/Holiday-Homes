'use client'
import Sidebar from '@/app_chunks/Sidebar'
import Navbar from '@/app_chunks/Navbar'
import { usePathname } from 'next/navigation'
import { useRef, useEffect, useState } from 'react'
import { Toaster } from '@/Shadcncomponents/components/ui/toaster'
import { useSearchParams } from 'next/navigation'
import useStore from './EditListing/FormStore'
import axios from 'axios'
export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()
	const path = pathname.split('/')[2]
	const [sideWidth, setSideWidth] = useState<number>(0)
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
	const sideRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (sideRef.current) {
			setSideWidth(sideRef.current?.clientWidth)
		}
	}, [])

	const searchParams = useSearchParams()

	const search = searchParams.get('id')

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
					`${process.env.NEXT_PUBLIC_SERVER_URL}/api/listing/${search}`,
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

		setListing([])
	}
	useEffect(() => {
		getQueries()
	}, [])

	useEffect(() => {
		if (listings && status == 'success') {
			setPropertyType(listings?.propertyType)
			setPlaceName(listings?.placeName)
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
			setCoverImage(listings?.coverImage)

			if (listings?.checkedAmenities) {
				const TempCheckedAmenties = JSON.parse(listings?.checkedAmenities)

				setCheckedAmenities(TempCheckedAmenties)
			}
			if (listings.additionalRules) {
				const parser = JSON.parse(listings?.additionalRules)
				const RuleParser = JSON.parse(listings?.houseRules)
				const imagesParser = JSON.parse(listings?.images)
				const tagsParser = JSON.parse(listings?.RentalTags)
				if (tagsParser) {
					setRentalTags(tagsParser)
				}
				setImages(imagesParser)
				setHouseRule(RuleParser)
				setAdditionalRules(parser)
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
		setStatus('')
	}, [listings, status])
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
				<Toaster />
			</div>
		</div>
	)
}
