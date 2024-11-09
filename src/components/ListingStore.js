import { create } from 'zustand'

const useStore = create((set) => ({
	Listings: {
		data: [],
		locationInput: '',
		inputPrice: 50,
		Beds: 1,
	},
	setListingsData: (data) =>
		set((state) => ({
			Listings: {
				...state.Listings,
				data,
			},
		})),
	setLocationInput: (locationInput) =>
		set((state) => ({
			Listings: {
				...state.Listings,
				locationInput,
			},
		})),
	setPrice: (inputPrice) =>
		set((state) => ({
			Listings: {
				...state.Listings,
				inputPrice,
			},
		})),
	setBeds: (Beds) =>
		set((state) => ({
			Listings: {
				...state.Listings,
				Beds,
			},
		})),
}))

export default useStore // Ensure this is the last line
