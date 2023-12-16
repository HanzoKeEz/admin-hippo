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

interface ICustomer {
	firstName: string
	middleName: string
	lastName: string
	email: string
	phone: string
	location: string
	role: string
	city: string
	timestamp: FieldValue | string | Timestamp
	userRef: string
	speciality?: string
	status?: string
	actions?: string
}

export { category, geoLocation, geoData, IUser, ICustomer }
