import AuthLayout from '@/components/AuthLayout'
import DeleteModal from '@/components/DeleteModal'
import CustomerItem from '@/components/CustomerItem'
import { auth, db } from '@/firebase/firebase.config'
import useAuthStore from '@/store/useAuthStore'
import { ICustomer } from '@/types'
import { User, signOut, updateEmail, updateProfile } from 'firebase/auth'
import {
	DocumentData,
	QueryDocumentSnapshot,
	Timestamp,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	updateDoc,
	where,
} from 'firebase/firestore'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
type userData = {
	name: string
	email: string
}
type Optional<T> = {
	[P in keyof T]?: T[P]
}
type CustomersData = {
	id: string
	data: ICustomer
}
function ProfilePage() {
	const user = useAuthStore((state) => state.user)
	const logout = useAuthStore((state) => state.logout)
	const router = useRouter()

	const [userCustomers, setUserCustomers] = useState<CustomersData[]>([])
	const [formData, setFormData] = useState<userData>({
		name: user?.displayName ?? '',
		email: user?.email ?? '',
	})

	const [changeDetails, setChangeDetails] = useState(false)
	const [loading, setLoading] = useState(false)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [selectedCustomer, setSelectedCustomer] = useState({
		id: '',
		name: '',
	})

	async function fetchUserCustomers() {
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
				const customers: CustomersData[] = []

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
		fetchUserCustomers()
	}, [user])

	async function onLogout() {
		try {
			await signOut(auth)
			logout()
		} catch (err) {
			toast.error('failed to log out')
		}
	}
	async function onSubmit() {
		const { name, email } = formData
		try {
			// check if the name or email is empty.
			if (!name || !email) {
				throw new Error('name or email cannot be empty.')
			}
			// this line won't really run but just for security sake.
			if (auth.currentUser === null) {
				throw new Error('the user is not logged in.')
			}
			// the updated object that will be passed to firstore.
			const updated: Optional<userData> = {}
			// if it is not the old name we pass the name to our updated obj and update in fb.
			if (auth.currentUser.displayName !== name) {
				updated.name = name
				await updateProfile(auth.currentUser as User, {
					displayName: name,
				})
			}
			// if it is not the old email we pass the email to our updated obj and update in fb.
			if (auth.currentUser.email !== email) {
				updated.email = email
				await updateEmail(auth.currentUser as User, email)
			}
			// our user ref in firestore to update the db.
			const userRef = doc(db, 'users', auth.currentUser.uid)
			await updateDoc(userRef, updated)
			toast.success("Successfully updated user's profile ")
		} catch (err) {
			let message = 'there was an error while trying to update the profile.'
			if (err instanceof Error) {
				message = err.message
			}
			toast.error(message)
			setFormData({
				name: user?.displayName ?? '',
				email: user?.email ?? '',
			})
		}
	}
	function handleChangeDetails() {
		changeDetails && onSubmit()
		setChangeDetails((prevState) => !prevState)
	}
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}
	async function handleDeleteCustomer(id: string, name: string) {
		if (userCustomers === null) {
			return
		}
		try {
			await deleteDoc(doc(db, 'customers', id))
			const updatedCustomer = userCustomers.filter(
				(customer) => customer.id !== id
			)
			setUserCustomers(updatedCustomer)
			toast.success(`successfully deleted ${name} customer.`)
		} catch (err) {
			toast.error(`failed to deleter ${name} customer`)
		}
	}
	function onEdit(id: string) {
		router.push(`/edit-customer/${id}`)
	}
	return (
		<>
			<Head>
				<title>{formData.name} - Profile</title>
			</Head>
			<section className='px-8 pb-[5%] md:px-[10%] pt-[5%] md:pb-0 min-h-screen w-full text-gray-800 bg-primary-grey'>
				<div className='mb-[5rem] flex items-center justify-between'>
					<h1 className='text-2xl md:text-4xl'>
						Welcome{' '}
						<span className='opacity-70 font-medium '>{formData.name}</span>{' '}
						<span>👋</span>
					</h1>
					<button
						onClick={onLogout}
						className='py-2 px-5 bg-primary-purple text-primary-white rounded-2xl font-semibold hover:opacity-50'
					>
						Logout
					</button>
				</div>
				<form className='max-w-[600px] mb-12 space-y-5'>
					{/* profile  */}
					<div className='flex items-center justify-between'>
						<h3>Profile Details</h3>
						<button
							className='text-primary-purple font-semibold'
							type='button'
							onClick={handleChangeDetails}
						>
							{changeDetails ? 'done' : 'change'}
						</button>
						{/* profile details card */}
					</div>
					<div className='bg-[#fff] text-gray-800 rounded-2xl space-y-6 shadow-[0px_0px_5px_rgba(0,0,0,0.2)] p-4 h-[225px]'>
						<div className='flex flex-col mt-2 space-y-2'>
							<label htmlFor='name' className='pl-4 text-sm opacity-80'>
								Name
							</label>
							<input
								type='text'
								disabled={!changeDetails}
								value={formData.name}
								name='name'
								onChange={handleChange}
								className={`py-2 px-4 text-lg transition-all ease-in duration-300 ${
									changeDetails
										? 'bg-[#e2e0e0] outline-none border-[rgba(44,44,44,0.8)] active:border-2 focus:border-2  rounded-md'
										: 'bg-transparent  '
								}`}
							/>
						</div>
						<div className='flex flex-col  space-y-2'>
							<label htmlFor='email' className='pl-4 text-sm opacity-80'>
								Email
							</label>
							<input
								type='email'
								disabled={!changeDetails}
								value={formData.email}
								name='email'
								onChange={handleChange}
								className={`py-2 px-4  transition-all ease-in duration-300 text-lg ${
									changeDetails
										? 'bg-[#e2e0e0] outline-none border-[rgba(44,44,44,0.8)] active:border-2 focus:border-2  rounded-md'
										: 'bg-transparent '
								}`}
							/>
						</div>
					</div>
				</form>
				<button
					className='bg-primary-white px-8 hover:opacity-70 py-3 h-[50px] shadow-[0px_0px_5px_rgba(0,0,0,0.25)] rounded-3xl flex space-x-3 items-center'
					onClick={() => router.push('/create-customer')}
				>
					<span>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							height='24px'
							viewBox='0 0 24 24'
							width='24px'
							fill='rgb(50,50,50)'
						>
							<path d='M0 0h24v24H0z' fill='none' />
							<path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
						</svg>
					</span>
					<span className='text-primary-black font-medium'>
						Request a new service
					</span>
				</button>
				{/* All the user's customers will be displayed here */}
				<div className='mt-[5rem]'>
					<h2 className='md:text-3xl mb-6'>Service History</h2>
					{loading ? (
						<div className='h-12 w-12 border-t-transparent block border-solid border rounded-[50%] border-primary-purple animate-spin'></div>
					) : userCustomers.length > 0 ? (
						<>
							{userCustomers.map(({ data, id }) => (
								<CustomerItem
									id={id}
									firstName={data.firstName}
									middleName={data.middleName}
									lastName={data.lastName}
									email={data.email}
									phone={data.phone}
									role={data.role}
									location={data.location}
									key={id}
									setSelectedCustomer={setSelectedCustomer}
									showDeleteModal={setShowDeleteModal}
									onEdit={onEdit}
								/>
							))}
						</>
					) : (
						<div className='h-[150px]   text-center '>
							<div className=' text-[60px]  '>
								<span>🙁</span>
							</div>
							<p className='text-gray-400  mt-4 text-center'>
								You currently have no services
								<Link
									href='/create-customer'
									className='text-violet-500 px-3 opacity-100 font-semibold'
								>
									<br />
									Add a new service today!
								</Link>
							</p>
						</div>
					)}
				</div>
				<AnimatePresence>
					{showDeleteModal && (
						<DeleteModal
							id={selectedCustomer.id}
							name={selectedCustomer.name}
							onDelete={handleDeleteCustomer}
							key={'deleteModal'}
							showDeleteModal={setShowDeleteModal}
						/>
					)}
				</AnimatePresence>
			</section>
		</>
	)
}
ProfilePage.getLayout = function getLayout(page: JSX.Element) {
	return <AuthLayout>{page}</AuthLayout>
}
export default ProfilePage
