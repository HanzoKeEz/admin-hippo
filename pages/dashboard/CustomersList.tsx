import React, { useEffect, useState } from 'react'
import { Table, message } from 'antd'
import type { TableProps } from 'antd'
import { GetAllCustomers, UpdateCustomer } from '@/apicalls/customers'
import useAuthStore from '@/store/useAuthStore'
import {
	QueryDocumentSnapshot,
	collection,
	DocumentData,
	getDocs,
	orderBy,
	query,
	where,
	Timestamp,
} from 'firebase/firestore'
import { db } from '@/firebase/firebase.config'
import { ICustomer } from '@/types'

type CustomerData = {
	id: string
	data: ICustomer
}

const CustomersList = () => {
	const user = useAuthStore((state) => state.user)
	const [userCustomers, setUserCustomers] = useState<CustomerData[]>([])
	const [customers, setCustomers] = useState([])
	const [loading, setLoading] = useState(true)

	async function fetchCustomers() {
		if (user !== null) {
			setLoading(true)
			try {
				const customersRef = collection(db, 'customers')
				const q = query(
					customersRef,
					where('userRef', '==', user.uid),
					orderBy('timestamp', 'desc')
				)
				const customersSnap = await getDocs(q)
				console.log(customersSnap)
				const customers: CustomerData[] = []

				customersSnap.forEach((doc: QueryDocumentSnapshot<DocumentData>) =>
					customers.push({
						id: doc.id,
						data: {
							...(doc.data() as ICustomer),
							timestamp: (doc.data().timestamp as Timestamp).toString(),
						},
					})
				)
				setUserCustomers([...customers])
			} catch (err) {
				console.log(err)
			} finally {
				setLoading(false)
			}
		}
	}

	useEffect(() => {
		fetchCustomers()
	}, [user])

	// const getData = async () => {
	// 	try {
	// 		setLoading(true)
	// 		const response = await GetAllCustomers()
	// 		setLoading(false)
	// 		if (response?.success) {
	// 			setCustomers(response.data)
	// 		} else {
	// 			throw new Error('error fetching data')
	// 		}
	// 	} catch (error) {
	// 		setLoading(false)
	// 		message.error('error fetching data')
	// 	}
	// }

	const changeStatus = async (payload) => {
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

	const columns: TableProps<CustomerType>['columns'] = [
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
			title: 'Speciality',
			dataIndex: 'speciality',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: (text, record) => {
				return text.toUpperCase()
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
