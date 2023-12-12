import AuthLayout from '@/components/AuthLayout'

import Map from '@/components/Map'
import { db } from '@/firebase/firebase.config'
import useAuthStore from '@/store/useAuthStore'
import { ICustomer } from '@/types'
import { doc, getDoc } from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useState } from 'react'
import formatTimestamp from '@/utils/formatTimestamp'
type customerData = {
	data: ICustomer
	id: string
}
type notFound = {
	notFound: boolean
}
export const getServerSideProps: GetServerSideProps<
	{ customer: customerData } | notFound
> = async (context) => {
	const { customerId, categoryname } = context.params as ParsedUrlQuery
	if (categoryname !== 'rent' && categoryname !== 'sale') {
		return {
			notFound: true,
		}
	}
	const docRef = doc(db, 'customers', customerId as string)
	const docSnap = await getDoc(docRef)
	if (!docSnap.exists()) {
		return {
			notFound: true,
		}
	}
	let timestampString: string = formatTimestamp(docSnap.data() as ICustomer)
	const customer = {
		data: {
			...(docSnap.data() as ICustomer),
			timestamp: timestampString,
		},
		id: docSnap.id,
	}
	return {
		props: {
			customer,
		},
	}
}
function CustomerPage({ customer }: { customer: customerData }) {
	const [linkShare, setLinkShare] = useState(false)
	const router = useRouter()
	const user = useAuthStore((state) => state.user)
	const { data: customerData } = customer
	return (
		<>
			<Head>
				<title>{customerData.lastName}</title>
			</Head>
			<section className='text-primary-black  pb-6'>
				{linkShare && (
					<p className='fixed top-[9%] right-[5%] z-[5] bg-primary-white rounded-2xl py-2 px-4 font-bold shadow-lg'>
						The Link was copied to clipboard!
					</p>
				)}
				<header className='relative'>
					{/* Back icon */}
					<button
						onClick={() => {
							router.back()
						}}
						className='absolute bg-primary-white rounded-full hover:scale-125 transition-all ease-out duration-300 items-center p-2 shadow-[0_2px_5px_rgba(0,0,0,0.3)] flex justify-center z-[999] top-[20px] left-[30px]'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							height='24px'
							id='Layer_1'
							version='1.1'
							viewBox='0 0 512 512'
							width='24px'
						>
							<polygon points='352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 ' />
						</svg>
					</button>

					{/* Clipboard icon */}
				</header>
				<div className='px-[5%] mt-12'>
					<h1 className='lg:text-4xl mb-4'>
						{customerData.firstName} {customerData.middleName}{' '}
						{customerData.lastName}
						<span> - ${customerData.email}</span>
					</h1>
					<p className='mb-[0.9rem] text-gray-600 opacity-80'>
						{customerData.location}
					</p>
					<div className=' mb-6'>
						<p className='py-1 px-2 shadow-[0px_2px_5px_rgb(0,204,102)] bg-primary-purple rounded-[2rem] text-primary-white font-semibold inline mr-2'>
							for {customerData.city}
						</p>
					</div>
					<ul className=' text-gray-600 opacity-80 font-medium space-y-[0.3rem] mb-8'>
						<li>{customerData.phone}</li>
						<li>{customerData.email} Email</li>
						{customerData.role && <li>Role</li>}
					</ul>
				</div>
				<div className='px-[5%] mb-8'>
					<h2 className='mb-3'>Location</h2>
					<p className='mb-3 text-gray-600 opacity-80'>
						{customerData.location}
					</p>
					{/* Leaflet Map comes here. */}
				</div>
				{customerData.userRef !== user?.uid && (
					<button
						className='primary-btn w-[80%] mx-auto'
						onClick={() => {
							router.push(
								`/contact/${customerData.userRef}/?customerName=${customerData.userRef}`
							)
						}}
					>
						Contact Landlord
					</button>
				)}
			</section>
		</>
	)
}
CustomerPage.getLayout = function getLayout(page: JSX.Element) {
	return <AuthLayout>{page}</AuthLayout>
}
export default CustomerPage
