import { create } from 'zustand'

const useStore = create((set) => ({
	ListingData: {
		propertyType: '',
		rentalPlace: '',
		propertyTitle: '',
		RentalTags: ['Hot Property'],
		placeName: '',
		Country: '',
		Street: '',
		City: '',
		postalCode: '',
		State: '',
		RoomNum: '',
		Acreage: '',
		towerName: '',
		Description: '',
		discountedPrice: '',
		guestNum: 1,
		bedRoom: 1,
		beds: 1,
		bathroom: 1,
		Address: '',
		marker: { lat: 23.4241, lng: 53.8478 },
		coverImage: null,
		images: [],
		Area: '',
		orgPrice: '',
		listingBadge: {},
		emirates:'',
		checkedAmenities: {
			included: [],
			other: [],
			safe: [],
		},
		additionalRules: [
			'No smoking in common areas',
			'Do not wear shoes in the house',
			'No cooking in the bedroom',
		],
		editId: '',
		houseRules: {
			Pet: 'Allow',
			Cooking: 'Allow',
			'Extra Bed': 'Allow',
			'Baby Crib': 'Allow',
		},
	},

	setHouseRule: (ruleName, value) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				houseRules: {
					...state.ListingData.houseRules,
					[ruleName]: value,
				},
			},
		})),
	setAdditionalRules: (additionalRules) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				additionalRules,
			},
		})),
	setCheckedAmenities: (amenities) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				checkedAmenities: {
					...amenities,
				},
			},
		})),
	setCoverImage: (coverImage) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				coverImage,
			},
		})),
	setPropertyTitle: (propertyTitle) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				propertyTitle,
			},
		})),
	setTowerName: (towerName) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				towerName,
			},
		})),
	setOrgPrice: (orgPrice) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				orgPrice,
			},
		})),
	setImages: (images) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				images,
			},
		})),
	setEditId: (editId) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				editId,
			},
		})),
	setDiscountedPrice: (discountedPrice) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				discountedPrice,
			},
		})),
	setPropertyType: (propertyType) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				propertyType,
			},
		})),
	setArea: (Area) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				Area,
			},
		})),
	setMarker: ({ lat, lng }) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				marker: { lat, lng },
			},
		})),
	setAddress: (Address) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				Address,
			},
		})),
	setListingBadge: (listingBadge) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				listingBadge,
			},
		})),
	setGuestNum: (guestNum) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				guestNum,
			},
		})),
	setBedRoom: (bedRoom) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				bedRoom,
			},
		})),
	setBathroom: (bathroom) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				bathroom,
			},
		})),
	setBeds: (
		beds, // New setter for beds
	) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				beds, // Update bed count
			},
		})),
	setRentalPlace: (
		rentalPlace, // Fixed parameter name
	) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				rentalPlace,
			},
		})),
	setPlaceName: (placeName) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				placeName,
			},
		})),
	setRentalTags: (RentalTags) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				RentalTags,
			},
		})),
	setStreet: (Street) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				Street,
			},
		})),
	setCity: (City) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				City,
			},
		})),
	setState: (State) =>
		set((elem) => ({
			ListingData: {
				...elem.ListingData,
				State,
			},
		})),
	setPin: (postalCode) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				postalCode,
			},
		})),
	setCountry: (Country) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				Country,
			},
		})),
	setRoomNum: (RoomNum) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				RoomNum,
			},
		})),
	setAcreage: (Acreage) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				Acreage,
			},
		})),
	setDescription: (Description) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				Description,
			},
		})),
	setPrice: (Price) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				Price,
			},
		})),
	setPrice: (emirates) =>
		set((state) => ({
			ListingData: {
				...state.ListingData,
				emirates,
			},
		})),
}))

export default useStore // Ensure this is the last line
