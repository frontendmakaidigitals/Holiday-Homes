import { create } from 'zustand'

const useStore = create((set) => ({
	Listings: {
		data: [],
		locationInput: '',
		inputPrice: 50,
		Beds: 1,
		Country:'',
		emirates:'',
		arr:'',
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
	setEmirates: (emirates) =>
		set((state) => ({
			Listings: {
				...state.Listings,
				emirates,
			},
		})),
	setArea: (arr) =>
		set((state) => ({
			Listings: {
				...state.Listings,
				arr,
			},
		})),
	setCountry: (Country) =>
		set((state) => ({
			Listings: {
				...state.Listings,
				Country,
			},
		})),
}))

export default useStore // Ensure this is the last line
