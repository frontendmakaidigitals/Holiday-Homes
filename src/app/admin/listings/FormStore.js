// FormStore.js
import { create } from 'zustand'

const useStore = create((set) => ({
	ListingData: { propertyType: '', rentalPlace: '', propertyName: '' },
	setPropertyType: (propertyType) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				propertyType, // Update propertyType
			},
		})),
	setRentalPlace: (rent) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				rentalPlace, // Update propertyType
			},
		})),
}))

export default useStore // Ensure this is the last line
