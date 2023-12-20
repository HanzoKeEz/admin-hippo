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
import { CheckCheck, CircleEllipsis, FileStack, XCircle } from 'lucide-react'

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
		<div className='rounded-sm'>
			{/* <div className='flex items-center'> */}
			<div className='grid gap-4 grid-cols-4'>
				<Card className='border-gray-500'>
					<CardHeader className='overviewCard'>
						<FileStack size={28} className='text-violet-700' />
						<CardTitle className='text-xs w-full font-thin pt-1'>
							( {customers.length} ) Total Orders
						</CardTitle>
					</CardHeader>
				</Card>
				<Card className='border-gray-400'>
					<CardHeader className='overviewCard'>
						<CircleEllipsis size={24} className='text-blue-800' />
						<CardTitle className='text-xs w-full font-thin pt-1'>
							({' '}
							{
								customers.filter((customer) => customer.status == 'pending')
									.length
							}{' '}
							) Pending
						</CardTitle>
					</CardHeader>
				</Card>
				<Card className='border-gray-400'>
					<CardHeader className='overviewCard'>
						<CheckCheck size={24} className='text-green-500' />
						<CardTitle className='text-xs w-full font-thin pt-1'>
							({' '}
							{
								customers.filter((customer) => customer.status == 'approved')
									.length
							}{' '}
							) Approved
						</CardTitle>
					</CardHeader>
				</Card>
				<Card className='border-gray-400'>
					<CardHeader className='overviewCard'>
						<XCircle size={24} className='text-red-500' />
						<CardTitle className='text-xs w-full font-thin pt-1'>
							({' '}
							{
								customers.filter((customer) => customer.status == 'rejected')
									.length
							}{' '}
							) Need Attention
						</CardTitle>
					</CardHeader>
				</Card>
			</div>
			{/* </div> */}
			<div className='mt-6 grid gap-4 md:grid-cols-12'>
				<Card className='col-span-6'>
					<CardHeader>
						<CardTitle className='text-neutral-300'>Overview</CardTitle>
					</CardHeader>
					<CardContent className='pl-2'>{/* <Overview /> */}</CardContent>
				</Card>
				<Card className='col-span-6 border-gray-400'>
					<CardHeader>
						<CardTitle className='text-neutral-300'>
							Most Recent Orders
						</CardTitle>
						<CardDescription>
							{customers.slice(0, 6).map((customer) => (
								<div
									key={customer.id}
									className='flex flex-col gap-4 border p-1 my-3 rounded'
								>
									<div className='flex flex-row p-1'>
										<div className='text-xs w-full font-medium'>
											{customer.firstName} {customer.lastName}
										</div>
										<div className='text-xs w-full font-medium'>
											{customer.status}
										</div>
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
