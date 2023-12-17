import { GetAllCustomers } from '@/apicalls/customers'
import AuthLayout from '@/components/AuthLayout'
import { Label } from '@/components/ui/label'
import useAuthStore from '@/store/useAuthStore'

import { ICustomer } from '@/types'
import { message } from 'antd'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Optional<T> = {
	[P in keyof T]?: T[P]
}
interface Customer {
	id: string
	firstName: string
	middleName: string
	lastName: string
	email: string
	phone: string
	location: string
	role: string
	city: string
	status: string
}
function ProfileCustomerPage() {
	const [customers, setCustomers] = useState<Customer[]>([])
	const [loading, setLoading] = useState(true)

	const user = useAuthStore((state) => state.user)

	const [formData, setFormData] = useState<Optional<ICustomer>>({
		firstName: '',
		middleName: '',
		lastName: '',
		email: '',
		phone: '',
		location: '',
		speciality: '',
		status: '',
		timestamp: '',
		// userRef: '',
	})

	const getData = async () => {
		try {
			setLoading(true)
			const response = await GetAllCustomers()
			console.log(response)
			setLoading(false)
			if (response?.data) {
				setCustomers(response.data)
			} else {
				setCustomers([])
			}
		} catch (error) {
			setLoading(false)
			message.error('error fetching data')
		}
	}

	useEffect(() => {
		getData()
	}, [])

	const customer = customers.find((customer) => customer.id === customer.id)

	return (
		<>
			<section className='px-8 pb-[5%] md:px-[10%] pt-[5%] md:pb-0 min-h-screen w-full text-gray-800 bg-primary-grey'>
				<div className='mb-[5rem] flex items-center justify-between'>
					<h1 className='text-2xl md:text-4xl'>
						Welcome{' '}
						<span className='opacity-70 font-medium '>
							{customer?.firstName}
						</span>{' '}
						<span>👋</span>
					</h1>
					<button className='py-2 px-5 bg-primary-purple text-primary-white rounded-2xl font-semibold hover:opacity-50'>
						Logout
					</button>
				</div>
				<form className='max-w-[600px] mb-12 space-y-5'>
					{/* profile  */}
					<div className='flex items-center justify-between'>
						<h3>Profile Details</h3>
						<button
							className='text-primary-purple font-semibold'
							type='button'
						></button>
						{/* profile details card */}
					</div>
					<div className='bg-[#fff] text-gray-800 rounded-2xl space-y-3 shadow-[0px_0px_5px_rgba(0,0,0,0.2)] p-4 h-[225px]'>
						<div className='flex gap-2 items-center'>
							<Label htmlFor='firstName' className='text-sm opacity-80'>
								Name:
							</Label>
							<Label>{customer?.firstName}</Label>
							<Label>{customer?.middleName}.</Label>
							<Label>{customer?.lastName}</Label>
						</div>
						<div className='flex gap-2 items-center'>
							<Label htmlFor='firstName' className='text-sm opacity-80'>
								Email:
							</Label>
							<Label>{customer?.email}</Label>
						</div>
						<div className='flex gap-2 items-center'>
							<Label
								htmlFor='firstName'
								className='capitalize text-sm opacity-80'
							>
								Property Address: {customer?.location}, {customer?.city}{' '}
							</Label>
						</div>
						<div className='flex gap-2 items-center'>
							<Label htmlFor='firstName' className='text-sm opacity-80'>
								Phone: {customer?.phone}
							</Label>
						</div>
						<div className='flex gap-2 items-center'>
							<Label htmlFor='firstName' className='text-sm opacity-80'>
								Birth Date:
							</Label>
						</div>
					</div>
				</form>
			</section>
		</>
	)
}

ProfileCustomerPage.getLayout = function getLayout(page: JSX.Element) {
	return <AuthLayout>{page}</AuthLayout>
}
export default ProfileCustomerPage
