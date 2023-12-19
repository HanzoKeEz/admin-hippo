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
	city: string
	state: string
	timestamp: FieldValue | string | Timestamp
	role: string
	status?: string
}

interface ICustomerInput {
	step: number
	firstName: string
	middleName: string
	lastName: string
	email: string
	phone: string
	driversLicense: string
	sex: string
	ssn: string
	birthDate: string
	location: string
	city: string
	state: string
	zip: string
	timestamp: FieldValue | string | Timestamp
	role: string
	status?: string
}

export { category, geoLocation, geoData, IUser, ICustomer, ICustomerInput }
