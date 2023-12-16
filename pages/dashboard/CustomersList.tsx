import { Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import type { TableProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { GetAllCustomers, UpdateCustomer } from '@/apicalls/customers'
import useAuthStore from '@/store/useAuthStore'

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
	actions: string
}

const CustomersList = () => {
	const [customers, setCustomers] = useState([])
	const [loading, setLoading] = useState(true)

	const getData = async () => {
		try {
			setLoading(true)
			const response = await GetAllCustomers()
			setLoading(false)
			if (response?.success) {
				setCustomers(response.data)
			} else {
				throw new Error('error fetching data')
			}
		} catch (error) {
			setLoading(false)
			message.error('error fetching data')
		}
	}

	const changeStatus = async (payload: Customer) => {
		try {
			setLoading(true)
			const response = await UpdateCustomer(payload)
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
		},
		{
			title: 'First Name',
			dataIndex: 'firstName',
			width: 120,
		},
		{
			title: 'Middle Name',
			dataIndex: 'middleName',
			width: 120,
		},
		{
			title: 'Last Name',
			dataIndex: 'lastName',
			width: 120,
		},
		{
			title: 'Email',
			dataIndex: 'email',
			width: 120,
		},

		{
			title: 'Phone Number',
			dataIndex: 'phone',
			width: 120,
		},
		{
			title: 'Location',
			dataIndex: 'location',
			width: 120,
		},

		{
			title: 'City',
			dataIndex: 'city',
			width: 120,
		},
		{
			title: 'Role',
			dataIndex: 'role',
			width: 120,
		},
		{
			title: 'Status',
			dataIndex: 'status',
			width: 120,
			render: (text, record: Customer) => {
				if (record.status === 'pending') {
					return (
						<span className='text-blue-500 border-2 border-blue-500 p-2 rounded-lg'>
							{record.status}
						</span>
					)
				}

				if (record.status === 'approved') {
					return <span className='text-green-500'>{record.status}</span>
				}

				if (record.status === 'rejected') {
					return <span className='text-red-500'>{record.status}</span>
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
								className='underline cursor-pointer'
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
								className='underline cursor-pointer'
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
		<div>
			<Table columns={columns} dataSource={customers} />
		</div>
	)
}

export default CustomersList
