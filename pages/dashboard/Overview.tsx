import { PiCheckFat } from 'react-icons/pi'
import { TiCancelOutline } from 'react-icons/ti'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { FaFileAlt } from 'react-icons/fa'
import { FcApprove, FcDisapprove } from 'react-icons/fc'
import { MdOutlineWorkspaces } from 'react-icons/md'
import React, { useEffect, useState } from 'react'
import { GetAllCustomers } from '@/apicalls/customers'
import { message } from 'antd'

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

function Overview() {
	const [customers, setCustomers] = useState<Customer[]>([])
	const [loading, setLoading] = useState(true)

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

	return (
		<div className='container border-2'>
			<div className='flex items-center'>
				<div className='flex gap-4 m-6'>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 p-6'>
							<CardTitle className='text-sm font-medium'>
								Total Customers
							</CardTitle>
							<FaFileAlt />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>
								{customers.length} Total{' '}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium text-blue-500 flex flex-col justify-center items-center gap-6'>
								<MdOutlineWorkspaces size={20} className='text-blue-500' />
								{
									customers.filter((customer) => customer.status == 'pending')
										.length
								}{' '}
								Currently Pending
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='text-xl font-bold'></div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-col items-center justify-between space-y-0 pb-2'>
							<PiCheckFat />

							<CardTitle className='text-sm font-medium text-green-500'>
								<div className='text-lg'>
									{
										customers.filter(
											(customer) => customer.status == 'approved'
										).length
									}{' '}
									Approved
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent></CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium text-red-500 flex flex-col items-center '>
								<TiCancelOutline />
								{
									customers.filter((customer) => customer.status == 'rejected')
										.length
								}{' '}
								Rejected
							</CardTitle>
						</CardHeader>
					</Card>
				</div>
			</div>
			<div className='m-6 grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
				<Card className='col-span-4'>
					<CardHeader>
						<CardTitle>Overview</CardTitle>
					</CardHeader>
					<CardContent className='pl-2'>{/* <Overview /> */}</CardContent>
				</Card>
				<Card className='col-span-3'>
					<CardHeader>
						<CardTitle>Most Recent Orders</CardTitle>
						<CardDescription>
							{customers.slice(0, 5).map((customer) => (
								<div key={customer.id} className='flex flex-col gap-4'>
									<div className='flex flex-row justify-between'>
										<div className='text-sm font-medium'>
											{customer.firstName} {customer.lastName}
										</div>
										<div className='text-sm font-medium'>{customer.status}</div>
									</div>
								</div>
							))}
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		</div>
	)
}

export default Overview
