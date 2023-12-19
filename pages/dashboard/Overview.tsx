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
		<div className='container rounded-sm pb-16'>
			{/* <div className='flex items-center'> */}
			<div className='grid gap-4 grid-cols-4'>
				<Card className='border-gray-400'>
					<CardHeader className='overviewCard'>
						<FaFileAlt size={24} className='text-primary-purple' />
						<CardTitle className='text-base text-violet-800 font-semibold'>
							{customers.length} Total Orders
						</CardTitle>
					</CardHeader>
				</Card>
				<Card className='border-gray-400'>
					<CardHeader className='overviewCard'>
						<MdOutlineWorkspaces size={20} className='text-blue-500' />
						<CardTitle className='text-base font-semibold text-blue-800 '>
							{
								customers.filter((customer) => customer.status == 'pending')
									.length
							}{' '}
							Pending
						</CardTitle>
					</CardHeader>
				</Card>
				<Card className='border-gray-400'>
					<CardHeader className='overviewCard'>
						<MdOutlineWorkspaces size={24} className='text-green-500' />
						<CardTitle className='text-base font-semibold text-green-800 '>
							{
								customers.filter((customer) => customer.status == 'approved')
									.length
							}{' '}
							Approved
						</CardTitle>
					</CardHeader>
				</Card>
				<Card className='border-gray-400'>
					<CardHeader className='overviewCard'>
						<TiCancelOutline size={24} className='text-red-500' />
						<CardTitle className='text-base font-semibold text-red-800 '>
							{
								customers.filter((customer) => customer.status == 'rejected')
									.length
							}{' '}
							Need Attention
						</CardTitle>
					</CardHeader>
				</Card>
			</div>
			{/* </div> */}
			<div className='mt-6 grid gap-4 md:grid-cols-12'>
				<Card className='col-span-6'>
					<CardHeader>
						<CardTitle>Overview</CardTitle>
					</CardHeader>
					<CardContent className='pl-2'>{/* <Overview /> */}</CardContent>
				</Card>
				<Card className='col-span-6 border-gray-400'>
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
