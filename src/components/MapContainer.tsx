import {
	MapContainer as LeafletMapContainer,
	TileLayer,
	Marker,
	Popup,
} from 'react-leaflet'
import AnyReactComponent from '@/components/AnyReactComponent/AnyReactComponent'
import { FC, useState } from 'react'
import Checkbox from '@/shared/Checkbox'
import { CarDataType, ExperiencesDataType, StayDataType } from '@/data/types'
import 'leaflet/dist/leaflet.css'

interface MapContainerProps {
	currentHoverID: string | number
	DEMO_DATA: CarDataType[] | ExperiencesDataType[] | StayDataType[]
	listingType: 'car' | 'experiences' | 'stay'
}

const MapContainer: FC<MapContainerProps> = ({
	currentHoverID = -1,
	DEMO_DATA,
	listingType,
}) => {
	const [activeItem, setActiveItem] = useState<number | string | null>(null)

	return (
		<LeafletMapContainer
			style={{ width: '100%', height: '100%' }}
			center={[DEMO_DATA[0].map.lat, DEMO_DATA[0].map.lng]}
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
				const isSelected = currentHoverID === item.id

				return (
					<Marker
						key={item.id}
						position={[item.map.lat, item.map.lng]}
						eventHandlers={{
							click: () => {
								setActiveItem(item.id)
							},
						}}
					>
						<Popup>
							<AnyReactComponent
								isSelected={isSelected}
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
							/>
						</Popup>
					</Marker>
				)
			})}
		</LeafletMapContainer>
	)
}

export default MapContainer
