import { message, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { ICustomer } from '@/types'

import { GetAllCustomers } from '@/apicalls/customers'

import { useDispatch } from 'react-redux'
import { ShowLoader } from '@/redux/loaderSlice'
import useAuthStore from '@/store/useAuthStore'
import {
	collection,
	DocumentData,
	getDocs,
	orderBy,
	query,
	QueryDocumentSnapshot,
	Timestamp,
	where,
} from 'firebase/firestore'
import { db } from '@/firebase/firebase.config'

type customerData = {
	firstName: string
	middleName: string
	lastName: string
	email: string
	role: string
}

type customerListingsData = {
	id: string
	data: ICustomer
}

function CustomersList() {
	const user = useAuthStore((state) => state.user)
	const [customerList, setCustomerList] = useState<ICustomer[]>([])
	const [selectCustomer, setSelectCustomer] = useState<ICustomer | null>(null)
	const [loading, setLoading] = useState(false)
	const [customers, setCustomers] = useState([])
	const dispatch = useDispatch()

	async function fetchCustomerList() {
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
				const customers: ICustomer[] = []

				customersSnap.forEach((doc: QueryDocumentSnapshot<DocumentData>) =>
					customers.push({
						id: doc.id,
						data: {
							...(doc.data() as ICustomer),
							timestamp: (doc.data().timestamp as Timestamp).toString(),
						},
					})
				)
				setCustomerList([...customers])
			} catch (err) {
				console.log(err)
			} finally {
				setLoading(false)
			}
		}
	}

	useEffect(() => {
		fetchCustomerList()
	}, [user])

	// const getData = async () => {
	// 	try {
	// 		dispatch(ShowLoader(true))
	// 		const response = await GetAllCustomers()
	// 		dispatch(ShowLoader(false))
	// 		if (response?.success) {
	// 			setCustomers(response.data)
	// 		} else {
	// 			throw new Error(response.message)
	// 		}
	// 	} catch (error) {
	// 		dispatch(ShowLoader(false))
	// 		message.error('error fetching customers')
	// 	}
	// }

	// useEffect(() => {
	// 	getData()
	// }, [])

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			render: (text: string) => <a>{text}</a>,
		},
		{
			title: 'First Name',
			dataIndex: 'firstName',
			key: 'firstName',
		},
		{
			title: 'Middle Name',
			dataIndex: 'middleName',
			key: 'middleName',
		},
		{
			title: 'Last Name',
			dataIndex: 'lastName',
			key: 'lastName',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Role',
			dataIndex: 'role',
			key: 'role',
			render: (text: string) => <a>{text}</a>,
		},

		{
			title: 'Action',
			key: 'action',
			render: (text: string, record: ICustomer) => (
				<Space size='middle'>
					<a>Invite {record.lastName}</a>
					<a>Delete</a>
				</Space>
			),
		},
	]
	return (
		<div>
			<Table columns={columns} dataSource={customers} />
		</div>
	)
}

export default CustomersList
