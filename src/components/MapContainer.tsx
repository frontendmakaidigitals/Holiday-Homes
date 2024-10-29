import {
    MapContainer as LeafletMapContainer,
    TileLayer,
    Marker,
} from 'react-leaflet';
import AnyReactComponent from '@/components/AnyReactComponent/AnyReactComponent';
import { FC, useState } from 'react';
import Checkbox from '@/shared/Checkbox';
import { CarDataType, ExperiencesDataType, StayDataType } from '@/data/types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface MapContainerProps {
    currentHoverID: string | number;
    DEMO_DATA: CarDataType[] | ExperiencesDataType[] | StayDataType[];
    listingType: 'car' | 'experiences' | 'stay';
}

const MapContainer: FC<MapContainerProps> = ({
    currentHoverID = -1,
    DEMO_DATA,
    listingType,
}) => {
    const [activeItem, setActiveItem] = useState<number | string | null>(null);

    return (
        <>
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
                {DEMO_DATA.map((item) => (
                    <Marker
                        key={item.id}
                        position={[item.map.lat, item.map.lng]}
                        icon={L.divIcon({
                            className: 'custom-marker',
                            html: `
                                <div style="
                                    background-color: black; 
                                    color: white; 
                                    font-weight: bold; 
                                    padding: 5px 10px; 
                                    border-radius: 10px; 
                                    border: 2px solid gray; 
                                    text-align: center; 
                                    font-size: 14px; 
                                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                                    position: relative;
                                ">
                                    ${item.price}
                                </div>
                            `,
                            iconSize: [60, 40],
                            iconAnchor: [30, 20],
                        })}
                        eventHandlers={{
                            click: () => {
                                setActiveItem(item.id); // Set the active item on marker click
                            },
                        }}
                    />
                ))}
                {/* Render AnyReactComponent directly based on active item */}
                {activeItem && (
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '20px',
                            background: 'white',
                            padding: '10px',
                            borderRadius: '10px',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                            zIndex: 1000,
                        }}
                    >
                        <AnyReactComponent
                            isSelected={currentHoverID === activeItem}
                            key={activeItem}
                            lat={DEMO_DATA.find((item) => item.id === activeItem)?.map.lat}
                            lng={DEMO_DATA.find((item) => item.id === activeItem)?.map.lng}
                            car={listingType === 'car' ? (DEMO_DATA.find(item => item.id === activeItem) as CarDataType) : undefined}
                            experiences={listingType === 'experiences' ? (DEMO_DATA.find(item => item.id === activeItem) as ExperiencesDataType) : undefined}
                            listing={listingType === 'stay' ? (DEMO_DATA.find(item => item.id === activeItem) as StayDataType) : undefined}
                        />
                    </div>
                )}
            </LeafletMapContainer>
        </>
    );
};

export default MapContainer;
