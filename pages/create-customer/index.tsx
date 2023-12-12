import { category, geoData, geoLocation, ICustomer } from '@/types'
import {
	ChangeEvent,
	useState,
	MouseEvent,
	MouseEventHandler,
	ChangeEventHandler,
	FormEvent,
	useEffect,
	useRef,
} from 'react'
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
	uploadString,
} from 'firebase/storage'
import { toast } from 'react-toastify'
import Head from 'next/head'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase/firebase.config'
import useAuthStore from '@/store/useAuthStore'
import { useRouter } from 'next/router'
import Spinner from '@/components/Spinner'
import AuthLayout from '@/components/AuthLayout'
import PreviewImage from '@/components/PreviewImage'

type formData = {
	firstName: string
	middleName: string
	lastName: string
	email: string
	phone: string
	location: string
	role: string
	city: string
	userRef: string
}

function CreateCustomerPage(): JSX.Element {
	const router = useRouter()
	const imageInput = useRef<HTMLInputElement | null>(null)
	const user = useAuthStore((state) => state.user)
	const [formData, setFormData] = useState<formData>({
		firstName: '',
		middleName: '',
		lastName: '',
		email: '',
		phone: '',
		location: '',
		role: 'customer',
		city: '',
		userRef: '',
	})
	const [loading, setLoading] = useState<boolean>(false)

	//Get user id | ref (whatever you want to call it) on first mount.

	useEffect(() => {
		if (user) {
			setFormData({ ...formData, userRef: user.uid })
		} else {
			router.push('/signin')
		}
	}, [user])

	// form submission handler.
	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setLoading(true)
		try {
			const customerData: ICustomer = {
				timestamp: serverTimestamp(),
				...formData,
			}

			// add the customer to firebase.
			const docRef = collection(db, 'customers')
			const doc = await addDoc(docRef, customerData)
			toast.success('Successfully added Customer!')
			router.push(`/profile-customer/${doc.id}`)
		} catch (err) {
			let message = 'there was an error while creating the listing.'
			if (err instanceof Error) message = err.message
			toast.error(message)
		} finally {
			setLoading(false)
		}
	}
	// function to store image in firebase
	async function storeImage(image: string) {
		const storage = getStorage()
		// put the actual user id important
		const fileName = `${formData.userRef}-${new Date().getTime()}`
		const storageRef = ref(storage, fileName)
		try {
			const snapShot = await uploadString(storageRef, image, 'data_url')
			const downloadUrl = await getDownloadURL(snapShot.ref)
			return downloadUrl
		} catch (err) {
			throw new Error()
		}
	}
	function onMutate(
		e: MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement>
	) {
		const target = e.target as HTMLInputElement | HTMLButtonElement
		const { value, id, type } = target
		let bool: boolean | null = null
		// for the Boolean fields
		if (type === 'button') {
			if (value === 'true') {
				bool = true
			}
			if (value === 'false') {
				bool = false
			}
		}

		// for Booleans, Strings and Numbers.
		setFormData((prevState) => ({
			...prevState,
			[id]: bool ?? value,
		}))
	}

	return (
		<>
			<Head>
				<title>Create A new Customer</title>
			</Head>
			<section className='bg-primary-grey py-8  relative text-primary-black px-[5%]'>
				<header className='mb-6 '>
					<h1 className='lg:text-3xl'>Add New Customer</h1>
				</header>
				<form className='space-y-5' onSubmit={handleSubmit}>
					<div>
						<label htmlFor='firstName' className='font-semibold mb-3 block'>
							First Name
						</label>
						<input
							type='text'
							value={formData.firstName}
							id={'firstName'}
							name={'firstName'}
							onChange={onMutate}
							minLength={1}
							maxLength={32}
							className='input-box max-w-[320px]'
							required
						/>
						<label htmlFor='middleName' className='font-semibold mb-3 block'>
							Middle Name
						</label>
						<input
							type='text'
							value={formData.middleName}
							id={'middleName'}
							name={'middleName'}
							onChange={onMutate}
							minLength={1}
							maxLength={32}
							className='input-box max-w-[320px]'
							required
						/>
						<label htmlFor='lastName' className='font-semibold mb-3 block'>
							Last Name
						</label>
						<input
							type='text'
							value={formData.lastName}
							id={'lastName'}
							name={'lastName'}
							onChange={onMutate}
							minLength={1}
							maxLength={32}
							className='input-box max-w-[320px]'
							required
						/>
						<label htmlFor='email' className='font-semibold mb-3 block'>
							Email
						</label>
						<input
							type='text'
							id='email'
							name='email'
							onChange={onMutate}
							value={formData.email}
							minLength={1}
							maxLength={50}
							className='input-box max-w-[320px]'
							required
						/>
					</div>

					<div>
						<label htmlFor='location' className='font-semibold mb-3 block'>
							Street Address
						</label>
						<textarea
							name='location'
							id='location'
							cols={35}
							rows={2}
							className='resize-none input-box max-w-[320px] px-2'
							onChange={
								onMutate as unknown as ChangeEventHandler<HTMLTextAreaElement>
							}
						/>
					</div>
					<div>
						<label htmlFor='city' className='font-semibold mb-3 block'>
							City
						</label>
						<input
							type='text'
							value={formData.city}
							id={'city'}
							name={'city'}
							onChange={onMutate}
							minLength={2}
							maxLength={32}
							className='input-box max-w-[320px]'
							required
						/>
					</div>
					<div className='pt-6'>
						<button
							type={'submit'}
							className='primary-btn w-[80%] hover:bg-indigo-400 duration-200'
						>
							Create Listing
						</button>
					</div>
				</form>
			</section>

			{loading && <Spinner />}
		</>
	)
}
CreateCustomerPage.getLayout = function getLayout(page: JSX.Element) {
	return <AuthLayout>{page}</AuthLayout>
}
export default CreateCustomerPage
