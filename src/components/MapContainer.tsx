'use client'
import { createRoot } from 'react-dom/client'
import dynamic from 'next/dynamic'
import {
	MapContainer as LeafletMapContainer,
	TileLayer,
	Marker,
} from 'react-leaflet'
import { FC, useState, useEffect } from 'react'
import Checkbox from '@/shared/Checkbox'
import { CarDataType, ExperiencesDataType, StayDataType } from '@/data/types'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import AnyReactComponent from './AnyReactComponent/AnyReactComponent'
interface MapContainerProps {
	currentHoverID: string | number
	DEMO_DATA: CarDataType[] | ExperiencesDataType[] | StayDataType[]
	listingType: 'car' | 'experiences' | 'stay'
}
 
// Dynamic import for AnyReactComponent

const MapContainer: FC<MapContainerProps> = ({
	currentHoverID = -1,
	DEMO_DATA,
	listingType,
}) => {
	const [activeItem, setActiveItem] = useState<number | string | null>(null)

	useEffect(() => {
		if (!DEMO_DATA || DEMO_DATA.length === 0) {
			console.warn('DEMO_DATA is empty')
			return
		}

		// Use a timeout to ensure the DOM is ready
		setTimeout(() => {
			DEMO_DATA.forEach((item) => {
				const markerId = `marker-${item.id}`
				const element = document.getElementById(markerId)
				if (element) {
					// Create a root for the AnyReactComponent
					const root = createRoot(element) // Use createRoot instead of ReactDOM.render

					// Debug: Log the item data being passed
					console.log('Rendering marker for item:', item)

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
	}, [DEMO_DATA, currentHoverID, listingType])


	 

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
