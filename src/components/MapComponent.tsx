'use client'
import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
// Import icons directly

import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png'

// Custom icon setup
const customIcon = L.icon({
	iconUrl:
		'https://static-00.iconduck.com/assets.00/map-marker-icon-797x1024-23bpp7dj.png', // Use a standard marker icon image URL
	iconSize: [30, 41], // Size of the icon
	iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
	popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor // Optional: Shadow
	shadowSize: [41, 41], // Optional: Size of the shadow
})

const MapComponent = ({
	marker,
	setMarker,
	setAddress,
}: {
	marker: any
	setMarker: any
	setAddress: any
}) => {
	const MapEvents = () => {
		useMapEvents({
			click(e) {
				// Update marker position on each click
				setMarker(e.latlng)
			},
		})
		return null // This component doesn't render anything itself
	}
	const fetchAddress = async (lat: number, lng: number) => {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
		)

		const data = await response.json()
		setAddress(data.display_name) // Set the address in state
	}

	useEffect(() => {
		fetchAddress(marker?.lat, marker?.lng)
	}, [marker])
	return (
		<MapContainer
			center={[23.4241, 53.8478]}
			zoom={15}
			style={{ width: '100%', height: '100%' }}
		>
			<TileLayer
				url={`https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}`}
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<MapEvents />
			{marker && <Marker position={marker} icon={customIcon} />}
		</MapContainer>
	)
}

export default MapComponent
