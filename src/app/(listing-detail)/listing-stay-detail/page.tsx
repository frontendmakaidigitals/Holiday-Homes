'use client'

import { FC, Fragment, useState, useEffect } from 'react'
import { Dialog, Transition, TransitionChild } from '@headlessui/react'
import { ArrowRightIcon, Squares2X2Icon } from '@heroicons/react/24/outline'
import CommentListing from '@/components/CommentListing'
import FiveStartIconForRate from '@/components/FiveStartIconForRate'
import StartRating from '@/components/StartRating'
import Avatar from '@/shared/Avatar'
import Badge from '@/shared/Badge'
import ButtonCircle from '@/shared/ButtonCircle'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import ButtonClose from '@/shared/ButtonClose'
import Input from '@/shared/Input'
import LikeSaveBtns from '@/components/LikeSaveBtns'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import StayDatesRangeInput from './StayDatesRangeInput'
import GuestsInput from './GuestsInput'
import SectionDateRange from '../SectionDateRange'
import { Route } from 'next'
import axios from 'axios'
import dynamic from 'next/dynamic'
import {
	FaKey,
	FaLuggageCart,
	FaShower,
	FaSmoking,
	FaSnowflake,
	FaSpa,
	FaSuitcase,
	FaSuitcaseRolling,
	FaSwimmer,
	FaSwimmingPool,
	FaTv,
	FaUmbrellaBeach,
	FaUtensils,
	FaWheelchair,
	FaWifi,
	FaBabyCarriage,
	FaBath,
	FaBed,
	FaBriefcase,
	FaCar,
	FaCocktail,
	FaCoffee,
	FaConciergeBell,
	FaDice,
	FaDumbbell,
	FaHotTub,
	FaInfinity,
	FaFan,
	FaSoap,
	FaTshirt,
	FaCouch,
	FaFire,
	FaToiletPaper,
	FaFireExtinguisher,
	FaLock,
} from 'react-icons/fa'
import { GiWashingMachine } from 'react-icons/gi'
import { BiFridge } from 'react-icons/bi'
import { GiToothbrush } from 'react-icons/gi'
import { GiLipstick } from 'react-icons/gi'
import 'leaflet/dist/leaflet.css'
import { FaPlateWheat } from 'react-icons/fa6'
import { MdOutdoorGrill } from 'react-icons/md'
import { GiToaster } from 'react-icons/gi'
import { PiTowel } from 'react-icons/pi'
import { MdOutlineRamenDining } from 'react-icons/md'
import { GiFirstAidKit } from 'react-icons/gi'
import { PiSirenFill } from 'react-icons/pi'
const Amenities_demos = [
	{ name: 'Swimming Pool', icon: <FaSwimmingPool /> },
	{ name: 'Gym', icon: <FaDumbbell /> },
	{ name: 'Parking', icon: <FaCar /> },
	{ name: 'Wifi', icon: <FaWifi /> },
	{ name: 'Internet', icon: <FaWifi /> }, // Assuming Wifi icon represents Internet
	{ name: 'TV', icon: <FaTv /> },
	{ name: 'Air conditioning', icon: <FaSnowflake /> },
	{ name: 'Fan', icon: <FaSnowflake /> }, // Assuming Fan icon represents cooling fan
	{ name: 'Private entrance', icon: <FaKey /> },
	{ name: 'Dryer', icon: <FaFan /> }, // Assuming Fan icon for Dryer
	{ name: 'Heater', icon: <FaSnowflake /> }, // Assuming Heater is represented by Snowflake
	{ name: 'Washing machine', icon: <GiWashingMachine /> },
	{ name: 'Detergent', icon: <FaSoap /> }, // Assuming Soap icon for detergent
	{ name: 'Clothes dryer', icon: <FaTshirt /> }, // Assuming T-shirt icon for dryer
	{ name: 'Baby cot', icon: <FaBabyCarriage /> },
	{ name: 'Desk', icon: <FaBriefcase /> },
	{ name: 'Fridge', icon: <BiFridge /> }, // Assuming Fridge icon
	{ name: 'Bed Linen', icon: <FaBed /> }, // Assuming Bed icon for linen
	{ name: 'Wardrobe', icon: <FaSuitcase /> },
	{ name: 'Cloth hook', icon: <FaShower /> }, // Assuming Shower icon for cloth hook
	{ name: 'Extra cushion', icon: <FaCouch /> }, // Assuming Couch icon for cushions
	{ name: 'Gas stove', icon: <FaFire /> }, // Assuming Fire icon for Gas stove
	{ name: 'Toilet paper', icon: <FaToiletPaper /> }, // Assuming ToiletPaper icon
	{ name: 'Free toiletries', icon: <GiToothbrush /> }, // Assuming Toothbrush for toiletries
	{ name: 'Makeup table', icon: <GiLipstick /> }, // Assuming Vanity icon for makeup table
	{ name: 'Hot pot', icon: <FaHotTub /> },
	{ name: 'Bathroom heaters', icon: <FaSnowflake /> }, // Assuming Snowflake icon for heaters
	{ name: 'Kettle', icon: <FaCoffee /> }, // Assuming Coffee icon for Kettle
	{ name: 'Dishwasher', icon: <FaPlateWheat /> }, // Assuming Cutlery icon for Dishwasher
	{ name: 'BBQ grill', icon: <MdOutdoorGrill /> },
	{ name: 'Toaster', icon: <GiToaster /> },
	{ name: 'Towel', icon: <PiTowel /> },
	{ name: 'Dining table', icon: <MdOutlineRamenDining /> },
	{ name: 'First Aid Kit', icon: <GiFirstAidKit /> },
	{ name: 'Fire siren', icon: <PiSirenFill /> },
	{ name: 'Fire extinguisher', icon: <FaFireExtinguisher /> },
	{ name: 'Anti-theft key', icon: <FaLock /> },
	{ name: 'Safe vault', icon: <FaLock /> },
]
export interface ListingStayDetailPageProps {}
const MapViewContainer = dynamic(
	() => import('@/components/MapViewContainer'),
	{
		ssr: false,
	},
)
const ListingStayDetailPage: FC<ListingStayDetailPageProps> = ({}) => {
	let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false)
	const searchParams = useSearchParams()
	const id = searchParams.get('id')
	const [getDay, setGetDay] = useState({ days: 0, minutes: 0, hours: 0 })
	const [houseRule, setHouseRule] = useState([])

	function closeModalAmenities() {
		setIsOpenModalAmenities(false)
	}

	const [isLoading, setIsLoading] = useState(false)
	const [status, setStatus] = useState('')
	const [listings, setListing]: any = useState([])
	const [amenities, setAmenities] = useState<string[]>([])
	console.log(amenities)
	const getQueries = () => {
		setIsLoading(true)
		axios
			.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/sanctum/csrf-cookie`, {
				withCredentials: true,
			})
			.then(() => {
				return axios.get(
					`${process.env.NEXT_PUBLIC_SERVER_URL}/api/listing/${id}`,
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
	const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
		null,
	)

	useEffect(() => {
		if (listings?.marker) {
			// Parse the marker string and set the state
			setMarker(JSON.parse(listings?.marker))
			setHouseRule(JSON.parse(listings?.additionalRules))
			const { included, other, safe } = JSON.parse(listings?.checkedAmenities)
			setAmenities((prev: string[]) => [...included, ...other, ...safe])
		} else {
			// If no marker is available, set it to null
			setMarker(null)
		}
	}, [listings?.marker, listings?.additionalRules])

	const renderSection1 = () => {
		return (
			<div className="listingSection__wrap !space-y-6">
				{/* 1 */}
				<div className="flex items-center justify-between">
					<Badge name={listings?.propertyType} />
				</div>

				{/* 2 */}
				<h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
					{listings?.placeName}
				</h2>

				{/* 3 */}
				<div className="flex items-center space-x-4">
					<StartRating />
					<span>·</span>
					<span>
						<i className="las la-map-marker-alt"></i>
						<span className="ml-1">
							{' '}
							{listings?.State}, {listings?.Country}
						</span>
					</span>
				</div>
				<div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

				{/* 6 */}
				<div className="flex items-center justify-between space-x-8 text-sm text-neutral-700 dark:text-neutral-300 xl:justify-start xl:space-x-12">
					<div className="flex items-center space-x-3">
						<i className="las la-user text-2xl"></i>
						<span className="">
							{listings?.guestNum}{' '}
							<span className="hidden sm:inline-block">guests</span>
						</span>
					</div>
					<div className="flex items-center space-x-3">
						<i className="las la-bed text-2xl"></i>
						<span className=" ">
							{listings.beds}{' '}
							<span className="hidden sm:inline-block">beds</span>
						</span>
					</div>
					<div className="flex items-center space-x-3">
						<i className="las la-bath text-2xl"></i>
						<span className=" ">
							{listings.bathroom}{' '}
							<span className="hidden sm:inline-block">baths</span>
						</span>
					</div>
					<div className="flex items-center space-x-3">
						<i className="las la-door-open text-2xl"></i>
						<span className=" ">
							{listings.bedRoom}{' '}
							<span className="hidden sm:inline-block">bedrooms</span>
						</span>
					</div>
				</div>
			</div>
		)
	}

	const renderSection2 = () => {
		return (
			<div className="listingSection__wrap">
				<h2 className="text-2xl font-semibold">Stay information</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				<div className="text-neutral-6000 dark:text-neutral-300">
					{listings?.Description}
				</div>
			</div>
		)
	}

	const renderSection3 = () => {
		return (
			<div className="listingSection__wrap">
				<div>
					<h2 className="text-2xl font-semibold">Amenities </h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						{` About the property's amenities and services`}
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				{/* 6 */}
				<div className="grid grid-cols-1 gap-6 text-sm text-neutral-700 dark:text-neutral-300 xl:grid-cols-3">
					{amenities.map((amenity, index) => {
						// Find the corresponding icon from the Amenities_demos array
						const matchingAmenity = Amenities_demos.find(
							(demo) => demo.name == amenity,
						)

						return matchingAmenity ? (
							<div key={index} className="flex items-center space-x-3">
								<div className="text-lg">{matchingAmenity.icon}</div>
								<p>{matchingAmenity.name}</p> {/* Render the amenity name */}
							</div>
						) : null // If no match, render nothing
					})}
				</div>

				{/* ----- */}
				{renderMotalAmenities()}
			</div>
		)
	}

	const renderMotalAmenities = () => {
		return (
			<Transition appear show={isOpenModalAmenities} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-50 overflow-y-auto"
					onClose={closeModalAmenities}
				>
					<div className="min-h-screen px-4 text-center">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-black bg-opacity-40" />
						</TransitionChild>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-block h-screen w-full max-w-4xl py-8">
								<div className="inline-flex h-full w-full transform flex-col overflow-hidden rounded-2xl bg-white pb-2 text-left align-middle shadow-xl transition-all dark:border dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100">
									<div className="relative flex-shrink-0 border-b border-neutral-200 px-6 py-4 text-center dark:border-neutral-800">
										<h3
											className="text-lg font-medium leading-6 text-gray-900"
											id="headlessui-dialog-title-70"
										>
											Amenities
										</h3>
										<span className="absolute left-3 top-3">
											<ButtonClose onClick={closeModalAmenities} />
										</span>
									</div>
									<div className="divide-y divide-neutral-200 overflow-auto px-8 text-neutral-700 dark:text-neutral-300">
										{Amenities_demos.filter((_, i) => i < 1212).map((item) => (
											<div
												key={item.name}
												className="flex items-center space-x-5 py-2.5 sm:py-4 lg:space-x-8 lg:py-5"
											>
												<i
													className={`las text-4xl text-neutral-6000 ${item.icon}`}
												></i>
												<span>{item.name}</span>
											</div>
										))}
									</div>
								</div>
							</div>
						</TransitionChild>
					</div>
				</Dialog>
			</Transition>
		)
	}

	const renderSection4 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<div>
					<h2 className="text-2xl font-semibold">Room Rates </h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						Prices may increase on weekends or holidays
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				{/* CONTENT */}
				<div className="flow-root">
					<div className="-mb-4 text-sm text-neutral-6000 dark:text-neutral-300 sm:text-base">
						<div className="flex items-center justify-between space-x-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
							<span>Monday - Thursday</span>
							<span>$199</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
							<span>Friday - Sunday</span>
							<span>$219</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg p-4">
							<span>Rent by month</span>
							<span>-8.34 %</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
							<span>Minimum number of nights</span>
							<span>1 night</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg p-4">
							<span>Max number of nights</span>
							<span>90 nights</span>
						</div>
					</div>
				</div>
			</div>
		)
	}

	const renderSection5 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Host Information</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* host */}
				<div className="flex items-center space-x-4">
					<Avatar
						hasChecked
						hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
						sizeClass="h-14 w-14"
						radius="rounded-full"
					/>
					<div>
						<a className="block text-xl font-medium" href="##">
							Kevin Francis
						</a>
						<div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
							<StartRating />
							<span className="mx-2">·</span>
							<span> 12 places</span>
						</div>
					</div>
				</div>

				{/* desc */}
				<span className="block text-neutral-6000 dark:text-neutral-300">
					Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
					accommodation, an outdoor swimming pool, a bar, a shared lounge, a
					garden and barbecue facilities...
				</span>

				{/* info */}
				<div className="block space-y-2.5 text-neutral-500 dark:text-neutral-400">
					<div className="flex items-center space-x-3">
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
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						<span>Joined in March 2016</span>
					</div>
					<div className="flex items-center space-x-3">
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
								d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
							/>
						</svg>
						<span>Response rate - 100%</span>
					</div>
					<div className="flex items-center space-x-3">
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
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>

						<span>Fast response - within a few hours</span>
					</div>
				</div>

				{/* == */}
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				<div>
					<ButtonSecondary href="/author">See host profile</ButtonSecondary>
				</div>
			</div>
		)
	}

	const renderSection6 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* Content */}
				<div className="space-y-5">
					<FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
					<div className="relative">
						<Input
							fontClass=""
							sizeClass="h-16 px-4 py-3"
							rounded="rounded-3xl"
							placeholder="Share your thoughts ..."
						/>
						<ButtonCircle
							className="absolute right-2 top-1/2 -translate-y-1/2 transform"
							size=" w-12 h-12 "
						>
							<ArrowRightIcon className="h-5 w-5" />
						</ButtonCircle>
					</div>
				</div>

				{/* comment */}
				<div className="divide-y divide-neutral-100 dark:divide-neutral-800">
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<div className="pt-8">
						<ButtonSecondary>View more 20 reviews</ButtonSecondary>
					</div>
				</div>
			</div>
		)
	}

	const renderSection7 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<div>
					<h2 className="text-2xl font-semibold">Location</h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						San Diego, CA, United States of America (SAN-San Diego Intl.)
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* MAP */}
				<div className="aspect-h-5 aspect-w-5 z-0 rounded-xl ring-1 ring-black/10 sm:aspect-h-3">
					<div className="z-0 h-full w-full overflow-hidden rounded-xl">
						<div style={{ display: 'flex' }} className="h-full w-full">
							<MapViewContainer marker={marker} />
						</div>
					</div>
				</div>
			</div>
		)
	}

	const renderSection8 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Things to know</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}
				<div>
					<h4 className="text-lg font-semibold">Cancellation policy</h4>
					<span className="mt-3 block text-neutral-500 dark:text-neutral-400">
						Refund 50% of the booking value when customers cancel the room
						within 48 hours after successful booking and 14 days before the
						check-in time. <br />
						Then, cancel the room 14 days before the check-in time, get a 50%
						refund of the total amount paid (minus the service fee).
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}
				<div>
					<h4 className="text-lg font-semibold">Check-in time</h4>
					<div className="mt-3 max-w-md text-sm text-neutral-500 dark:text-neutral-400 sm:text-base">
						<div className="flex justify-between space-x-10 rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
							<span>Check-in</span>
							<span>08:00 am - 12:00 am</span>
						</div>
						<div className="flex justify-between space-x-10 p-3">
							<span>Check-out</span>
							<span>02:00 pm - 04:00 pm</span>
						</div>
					</div>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}
				<div>
					<h4 className="text-lg font-semibold">Special Note</h4>
					<div className="prose sm:prose">
						<ul className="mt-3 space-y-2 text-neutral-500 dark:text-neutral-400">
							{houseRule.map((rule, index) => (
								<li key={index}>{rule}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		)
	}

	const renderSidebar = () => {
		return (
			<div className="listingSectionSidebar__wrap shadow-xl">
				{/* PRICE */}
				<div className="flex justify-between">
					<span className="text-3xl font-semibold">
						{listings?.Price || 100} AED
						<span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
							/night
						</span>
					</span>
					<StartRating />
				</div>

				{/* FORM */}
				<form className="flex flex-col rounded-3xl border border-neutral-200 dark:border-neutral-700">
					<StayDatesRangeInput
						setGetDay={setGetDay}
						className="z-[11] flex-1"
					/>
					<div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
					<GuestsInput className="flex-1" />
				</form>

				{/* SUM */}
				<div className="flex flex-col space-y-4">
					<div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
						<span>
							AED {listings?.Price} x {getDay?.days} night
						</span>
						<span>AED {listings?.Price * getDay?.days}</span>
					</div>
					<div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
						<span>Service charge</span>
						<span>$0</span>
					</div>
					<div className="border-b border-neutral-200 dark:border-neutral-700"></div>
					<div className="flex justify-between font-semibold">
						<span>Total</span>
						<span>AED {listings?.Price * getDay?.days}</span>
					</div>
				</div>

				{/* SUBMIT */}
				<ButtonPrimary
					href={'https://bookings11.rmscloud.com/Search/Index/20926/59/?Y=1'}
				>
					Reserve
				</ButtonPrimary>
			</div>
		)
	}

	return (
		<div className="nc-ListingStayDetailPage">
			{/*  HEADER */}
			<header className="rounded-md sm:rounded-xl">
				<div className="relative grid grid-cols-3 gap-1 sm:grid-cols-4 sm:gap-2">
					<div className="relative col-span-2 row-span-3 cursor-pointer overflow-hidden rounded-md sm:row-span-2 sm:rounded-xl">
						<Image
							fill
							className="rounded-md object-cover sm:rounded-xl"
							src={listings?.coverImageUrl}
							alt=""
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
						/>
						<div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"></div>
					</div>
					{listings?.imagesUrls
						?.filter((_: any, i: number) => i >= 1 && i < 5)
						.map((item: any, index: number) => (
							<div
								key={index}
								className={`relative overflow-hidden rounded-md sm:rounded-xl ${
									index >= 3 ? 'hidden sm:block' : ''
								}`}
							>
								<div className="aspect-h-3 aspect-w-4 sm:aspect-h-5 sm:aspect-w-6">
									<Image
										fill
										className="rounded-md object-cover sm:rounded-xl"
										src={item || ''}
										alt=""
										sizes="400px"
									/>
								</div>

								{/* OVERLAY */}
								<div className="absolute inset-0 cursor-pointer bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100" />
							</div>
						))}
				</div>
			</header>

			{/* MAIN */}
			<main className="relative z-10 mt-11 flex flex-col lg:flex-row">
				{/* CONTENT */}
				<div className="w-full space-y-8 lg:w-3/5 lg:space-y-10 lg:pr-10 xl:w-2/3">
					{renderSection1()}
					{renderSection2()}
					{renderSection3()}
					{renderSection4()}
					<SectionDateRange />
					{renderSection5()}
					{renderSection6()}
					{renderSection7()}
					{renderSection8()}
				</div>

				{/* SIDEBAR */}
				<div className="mt-14 hidden flex-grow lg:mt-0 lg:block">
					<div className="sticky top-28">{renderSidebar()}</div>
				</div>
			</main>
		</div>
	)
}

export default ListingStayDetailPage
