import { FieldValue, Timestamp } from 'firebase/firestore'
type category = 'rent' | 'sale'
type geoData = {
	name: string
	lat: number
	lon: number
	country: string
	state: string
}
type geoLocation = {
	lat: string
	lng: string
}
interface IUser {
	name: string
	email: string
	timestamp: Timestamp | string | FieldValue
}
interface IListing {
	name: string
	type: category
	userRef: string
	bedrooms: number
	bathrooms: number
	parking: boolean
	furnished: boolean
	offer: boolean
	regularPrice: number
	discountedPrice?: number
	location: string
	geoLocation: geoLocation
	imgUrls: string[]
	timestamp: Timestamp | string | FieldValue
	city?: string
}

interface ICustomer {
	id: string
	firstName: string
	middleName: string
	lastName: string
	email: string
	role: string
	timestamp: Timestamp | string | FieldValue
}

export { IListing, category, geoLocation, geoData, IUser, ICustomer }
