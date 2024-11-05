'use client' // Add this to mark this file as client-side code

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Marker, MapContainer, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Dynamically import the MapContainer with no SSR
const MapWithNoSSR = dynamic(
	() => import('react-leaflet').then((mod) => mod.MapContainer),
	{ ssr: false },
)

const MapViewContainer = ({ marker }: any) => {
	const [mapReady, setMapReady] = useState(false)

	// To avoid rendering until the component is mounted on the client
	useEffect(() => {
		setMapReady(true)
	}, [])

	const customIcon = new L.Icon({
		iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png', // default Leaflet icon
		iconSize: [25, 41], // Size of the marker
		iconAnchor: [12, 41], // Point of the icon where the marker points
		popupAnchor: [1, -34], // Position of the popup
		shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png', // Shadow for the marker
		shadowSize: [41, 41], // Shadow size
	})

	if (!mapReady) return null // Don't render until after mount

	return (
		<div>
			{marker ? (
				<MapWithNoSSR
					className="h-[500px] w-[100vw]"
					center={[marker?.lat, marker?.lng]}
					zoom={8}
				>
					<Marker icon={customIcon} position={[marker.lat, marker.lng]} />
					<TileLayer
						attribution="Google Maps"
						url={`https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}`}
					/>
				</MapWithNoSSR>
			) : null}
		</div>
	)
}

export default MapViewContainer
