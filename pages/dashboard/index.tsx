import { GetStaticProps } from 'next'
import AuthLayout from '@/components/AuthLayout'
import {
	collection,
	query,
	orderBy,
	getDocs,
	limit,
	Timestamp,
} from 'firebase/firestore'
import { ICustomer, category } from '@/types'
import Link from 'next/link'

import { db } from '@/firebase/firebase.config'
import formatTimestamp from '@/utils/formatTimestamp'
import Head from 'next/head'
type DashboardData = {
	data: ICustomer
	id: string
}
// fetch slider data.
export const getStaticProps: GetStaticProps<{
	customers: DashboardData[]
}> = async () => {
	const docRef = collection(db, 'customers')
	const q = query(docRef, orderBy('timestamp', 'desc'), limit(5))
	const docSnap = await getDocs(q)
	const customers: DashboardData[] = []
	docSnap.forEach((doc) => {
		let timestampString: string = formatTimestamp(doc.data() as ICustomer)
		customers.push({
			data: {
				...(doc.data() as ICustomer),
				timestamp: timestampString,
			},
			id: doc.id,
		})
	})
	return {
		props: {
			customers,
		},
		revalidate: 20,
	}
}
type Categories = {
	category: category
	src: string
	id: number
}

function DashboardPage({ customers }: { customers: DashboardData[] }) {
	return (
		<>
			<Head>
				<title> Dashboard - our available services</title>
			</Head>
			<section className='px-12 md:px-8 lg:px-2 min-h-screen pt-8 pb-6 space-y-12 bg-primary-grey'>
				<div>
					<h3 className='lg:w-[80%] mx-auto mb-5 opacity-80'>Categories</h3>
					<div className='flex items-center space-x-[5%]  lg:space-x-[10%] lg:w-[80%] mx-auto '></div>
				</div>
			</section>
		</>
	)
}

DashboardPage.getLayout = function getLayout(page: JSX.Element) {
	return <AuthLayout>{page}</AuthLayout>
}
export default DashboardPage
