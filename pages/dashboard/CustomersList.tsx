import { Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import type { TableProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { GetAllCustomers, UpdateCustomer } from '@/apicalls/customers'
import useAuthStore from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'

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

const CustomersList = () => {
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

	const changeStatus = async (payload = { id: '', status: '' }) => {
		try {
			setLoading(true)
			const response = await UpdateCustomer(payload)
			console.log('response from changeStatus', response)
			setLoading(false)
			if (response?.success) {
				message.success('status updated')
				getData()
			} else {
				throw new Error('error updating status')
			}
		} catch (error) {
			message.error('error updating status')
			setLoading(false)
		}
	}

	useEffect(() => {
		getData()
	}, [])

	const columns: ColumnsType<Customer> = [
		{
			title: 'ID',
			dataIndex: 'id',
			width: 100,
			className: 'font-semibold text-xs',
			fixed: 'left',
		},
		{
			title: 'First Name',
			dataIndex: 'firstName',
			width: 100,
			className: 'capitalize font-semibold',
			fixed: 'left',
		},
		{
			title: 'Middle Name',
			dataIndex: 'middleName',
			width: 90,
			className: 'capitalize font-semibold',
		},
		{
			title: 'Last Name',
			dataIndex: 'lastName',
			width: 120,
			className: 'font-semibold capitalize ',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			width: 120,
			className: 'uppercase font-semibold text-[12px]',
		},

		{
			title: 'Phone Number',
			dataIndex: 'phone',
			width: 120,
			className: 'font-semibold',
		},
		{
			title: 'Location',
			dataIndex: 'location',
			width: 160,
			className: 'capitalize font-semibold',
		},

		{
			title: 'City',
			dataIndex: 'city',
			width: 120,
			className: 'capitalize font-semibold',
		},
		{
			title: 'Role',
			dataIndex: 'role',
			width: 120,
			className: 'capitalize font-semibold',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			width: 140,
			render: (text, record: Customer) => {
				if (record.status === 'pending') {
					return (
						<span className='text-blue-500 border-2 border-blue-500 p-2 rounded-lg bg-blue-100 uppercase font-semibold'>
							{record.status}
						</span>
					)
				}

				if (record.status === 'approved') {
					return (
						<span className='text-green-500 border-2 border-green-500 p-2 rounded-lg bg-green-100 uppercase font-semibold '>
							{record.status}
						</span>
					)
				}

				if (record.status === 'rejected') {
					return (
						<span className='text-red-500 border-2 border-red-500 p-2 rounded-lg bg-red-100 uppercase font-semibold'>
							{record.status}
						</span>
					)
				}
			},
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			render: (text, record) => {
				if (record.status === 'pending') {
					return (
						<div className='flex gap-1'>
							<span
								className='underline cursor-pointer font-semibold'
								onClick={() =>
									changeStatus({
										...record,
										status: 'rejected',
									})
								}
							>
								Reject
							</span>
							<span
								className='underline cursor-pointer font-semibold'
								onClick={() =>
									changeStatus({
										...record,
										status: 'approved',
									})
								}
							>
								Approve
							</span>
						</div>
					)
				}

				if (record.status === 'approved') {
					return (
						<div className='flex gap-1'>
							<span
								className='underline cursor-pointer'
								onClick={() =>
									changeStatus({
										...record,
										status: 'blocked',
									})
								}
							>
								Block
							</span>
						</div>
					)
				}

				if (record.status === 'blocked') {
					return (
						<div className='flex gap-1'>
							<span
								className='underline cursor-pointer'
								onClick={() =>
									changeStatus({
										...record,
										status: 'approved',
									})
								}
							>
								Unblock
							</span>
						</div>
					)
				}
			},
		},
	]

	return (
		<div className='border-2 mt-6'>
			<Table
				columns={columns}
				dataSource={customers}
				scroll={{ x: 1500, y: 900 }}
			/>
		</div>
	)
}

export default CustomersList
