'use client'
import { createRoot } from 'react-dom/client'
import dynamic from 'next/dynamic'
import { FC, useState, useEffect } from 'react'
import Checkbox from '@/shared/Checkbox'
import { CarDataType, ExperiencesDataType, StayDataType } from '@/data/types'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

interface MapContainerProps {
	currentHoverID: string | number
	DEMO_DATA: CarDataType[] | ExperiencesDataType[] | StayDataType[]
	listingType: 'car' | 'experiences' | 'stay'
}
const LeafletMapContainer = dynamic(
	() => import('react-leaflet').then((mod) => mod.MapContainer),
	{ ssr: false },
)
const TileLayer = dynamic(
	() => import('react-leaflet').then((mod) => mod.TileLayer),
	{ ssr: false },
)
const Marker = dynamic(
	() => import('react-leaflet').then((mod) => mod.Marker),
	{ ssr: false },
)

// Dynamic import for AnyReactComponent
const AnyReactComponent = dynamic(
	() => import('@/components/AnyReactComponent/AnyReactComponent'),
	{ ssr: false },
)
const MapContainer: FC<MapContainerProps> = ({
	currentHoverID = -1,
	DEMO_DATA,
	listingType,
}) => {
	const [activeItem, setActiveItem] = useState<number | string | null>(null)

	useEffect(() => {
		if (typeof window === 'undefined') return // Ensure we're in the browser

		if (!DEMO_DATA || DEMO_DATA.length === 0) {
			console.warn('DEMO_DATA is empty')
			return
		}

		// Use a timeout to ensure the DOM is ready
		const timeoutId = setTimeout(() => {
			DEMO_DATA.forEach((item) => {
				const markerId = `marker-${item.id}`
				const element = document.getElementById(markerId)
				if (element) {
					const root = createRoot(element)
					root.render(
						<AnyReactComponent
							isSelected={currentHoverID === item.id}
							lat={item.map.lat}
							lng={item.map.lng}
							car={listingType === 'car' ? (item as CarDataType) : undefined}
							experiences={
								listingType === 'experiences'
									? (item as ExperiencesDataType)
									: undefined
							}
							listing={
								listingType === 'stay' ? (item as StayDataType) : undefined
							}
						/>,
					)
				} else {
					console.warn(`Element with ID ${markerId} not found`)
				}
			})
		}, 0)

		return () => clearTimeout(timeoutId) // Cleanup
	}, [DEMO_DATA, currentHoverID, listingType])

	if (typeof window === 'undefined') {
		return null // Prevent rendering on the server
	}

	return (
		<LeafletMapContainer
			style={{ width: '100%', height: '100%' }}
			center={
				DEMO_DATA.length > 0
					? [DEMO_DATA[0].map.lat, DEMO_DATA[0].map.lng]
					: [0, 0]
			}
			zoom={12}
			scrollWheelZoom={false}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<div className="z-10 mt-5 min-w-max rounded-2xl bg-neutral-100 px-4 py-2 shadow-xl dark:bg-neutral-900">
				<Checkbox
					className="text-xs text-neutral-800 xl:text-sm"
					name="search_as_i_move"
					label="Search as I move the map"
				/>
			</div>
			{DEMO_DATA.map((item) => {
				const markerId = `marker-${item.id}`
				const customIcon = L.divIcon({
					className: 'custom-marker',
					html: `<div id="${markerId}"></div>`,
					iconSize: [40, 40],
				})

				return (
					<Marker
						key={item.id}
						position={[item.map.lat, item.map.lng]}
						icon={customIcon}
						eventHandlers={{
							click: () => {
								setActiveItem(item.id)
							},
						}}
					/>
				)
			})}
		</LeafletMapContainer>
	)
}

export default MapContainer
