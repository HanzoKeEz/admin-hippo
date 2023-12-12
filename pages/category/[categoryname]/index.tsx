import AuthLayout from '@/components/AuthLayout'
import CustomerItem from '@/components/CustomerItem'
import LoadMore from '@/components/LoadMore'
import Spinner from '@/components/Spinner'
import { db } from '@/firebase/firebase.config'
import { ICustomer, category } from '@/types'
import formatTimestamp from '@/utils/formatTimestamp'
import {
	DocumentData,
	QueryDocumentSnapshot,
	Timestamp,
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	where,
} from 'firebase/firestore'
// import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
type CategoryData = {
	id: string
	data: ICustomer
}

function CategoryPage() {
	const [fetchedCustomers, setFetchedCustomers] = useState<CategoryData[]>([])
	const [lastCustomer, setLastCustomer] =
		useState<QueryDocumentSnapshot<DocumentData> | null>(null)
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	useEffect(() => {
		async function getCustomers() {
			setLoading(true)
			try {
				const docRef = collection(db, 'customers')

				//firestore query
				const q = query(
					docRef,
					where('type', '==', router.query.categoryname),
					orderBy('timestamp', 'desc'),
					limit(5)
				)
				// fetch data from firebase.
				const docSnap = await getDocs(q)
				const customers: CategoryData[] = []
				const lastVisible = docSnap.docs[docSnap.docs.length - 1]
				docSnap.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
					let timestampString: string = formatTimestamp(doc.data() as ICustomer)
					customers.push({
						id: doc.id,
						data: {
							...(doc.data() as ICustomer),
							timestamp: timestampString,
						},
					})
				})
				setFetchedCustomers(customers)
				setLastCustomer(lastVisible)
			} catch (err) {
			} finally {
				setLoading(false)
			}
		}
		getCustomers()
	}, [router.query.categoryname])
	if (loading) {
		return <Spinner />
	}
	return (
		<>
			{/* <Head>
				<title>
					Find Homes for{' '}
					{router.query.categoryname === 'rent' ? 'Rent' : 'Sale'}
					{router.query.categoryname === 'rent' ? 'Rent' : 'Sale'}
				</title>
			</Head> */}
			<section className='min-h-screen px-[5%] py-6 bg-primary-grey space-y-6 text-primary-black  '>
				<div>
					<h1>
						Documents for{' '}
						{/* {router.query.categoryname === 'rent' ? 'rent' : 'sale'} */}
					</h1>
				</div>
				{/* Customer item come here */}
				<div className='flex flex-col gap-5'>
					{fetchedCustomers.length ? (
						fetchedCustomers.map(({ data, id }) => (
							<CustomerItem
								key={id}
								id={id}
								firstName={data.firstName}
								middleName={data.middleName}
								lastName={data.lastName}
								email={data.email}
								phone={data.phone}
								location={data.location}
								role={data.role}
							/>
						))
					) : (
						<p>
							There are currently no customers for {router.query.categoryname}
						</p>
					)}
				</div>
				{/* Load more button comes here */}

				{lastCustomer && (
					<LoadMore
						setLastCustomer={setLastCustomer}
						lastItem={
							lastCustomer
						} /* the last item to begin client data fetching gotten from the parent component. */
						setNewCustomers={
							setFetchedCustomers
						} /* sets the state of client fetched customers for the parent componet. */
						field={
							router.query.categoryname as category
						} /* offers | rent | sale */
					/>
				)}
			</section>
		</>
	)
}
CategoryPage.getLayout = function getLayout(page: JSX.Element) {
	return <AuthLayout>{page}</AuthLayout>
}
export default CategoryPage
