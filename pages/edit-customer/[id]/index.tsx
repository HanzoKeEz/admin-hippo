import { ICustomer } from '@/types'
import {
	ChangeEvent,
	useState,
	MouseEvent,
	ChangeEventHandler,
	FormEvent,
	useEffect,
	useRef,
} from 'react'
import { toast } from 'react-toastify'
import { getDoc, doc, updateDoc, AddPrefixToKeys } from 'firebase/firestore'
import { db } from '@/firebase/firebase.config'
import useAuthStore from '@/store/useAuthStore'
import { useRouter } from 'next/router'
import Spinner from '@/components/Spinner'
import AuthLayout from '@/components/AuthLayout'
import { GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import formatTimestamp from '@/utils/formatTimestamp'
type notFound = {
	notFound: boolean
}
export const getServerSideProps: GetServerSideProps<
	{ customer: ICustomer } | notFound
> = async (context) => {
	try {
		const { id } = context.params as ParsedUrlQuery
		const docRef = doc(db, 'customers', id as string)
		const docSnap = await getDoc(docRef)
		if (docSnap.exists()) {
			let timestampString: string = formatTimestamp(docSnap.data() as ICustomer)
			return {
				props: {
					customer: {
						...(docSnap.data() as ICustomer),
						timestamp: timestampString,
					},
				},
			}
		}
		throw new Error('customer was not found')
	} catch (err) {
		return {
			notFound: true,
		}
	}
}
type files = { files: FileList }
type formData = ICustomer & {
	city: string
}
function EditCustomerPage({ customer }: { customer: ICustomer }) {
	const router = useRouter()
	const user = useAuthStore((state) => state.user)
	const oldCity = useRef<string>('')
	const [formData, setFormData] = useState<formData>({
		firstName: '',
		middleName: '',
		lastName: '',
		email: '',
		phone: '',
		location: '',
		city: '',
		state: '',
		role: 'customer',
		timestamp: '',
	})
	const [loading, setLoading] = useState<boolean>(false)
	const [deleting, setDeleting] = useState<number>(-1)
	// check if it is the user customer
	// not the logged in users customers then redirect
	// prefill the form with data in the firebase.
	// useEffect(() => {
	// 	if (customer?.userRef !== user?.uid) {
	// 		toast.error(`you cannot edit ${customer.userRef} as it not yours`)
	// 		setTimeout(() => router.push('/dashboard'), 3000)
	// 	} else {
	// 		setFormData((prevState) => ({ ...prevState, ...customer }))
	// 	}
	// }, [customer, user, router])

	// kick user out if not logged in.
	useEffect(() => {
		if (user === null) {
			router.push('/signin')
		}
	}, [user, router])

	// keep the name of the old city.
	// useEffect(() => {
	// 	if (customer.city) {
	// 		oldCity.current = customer.city
	// 	}
	// }, [])

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setLoading(true)
		try {
			if (formData.city === '') {
				throw new Error('the city cannot be empty.')
			}
			// no need to geocode if it is the old city.
			if (formData.city !== oldCity.current) {
				const res = await fetch(
					`https://api.openweathermap.org/geo/1.0/direct?q=${formData.city}&limit=1&appid=${process.env.NEXT_PUBLIC_GEOCODE_KEY}`
				)
			}
			const updatedCustomerData: ICustomer = {
				...formData,
			}
			const docRef = doc(db, 'customers', router.query.id as string)
			const updatedDoc = await updateDoc(
				docRef,
				updatedCustomerData as unknown as {
					[x: string]: any
				} & AddPrefixToKeys<string, any>
			)
			toast.success('Successfully updated Customer.')
			router.push(`/profile-customer/${router.query.id}`)
		} catch (err) {
			let message = 'there was an error while creating the customer.'
			if (err instanceof Error) message = err.message
			toast.error(message)
		} finally {
			setLoading(false)
		}
	}
	// function to store image in firebase

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
		// for the files field.
		if (type === 'file') {
			const { files } = e.target as files
			if (files.length === 0) {
				return
			}

			// instantiate a new FileReader object
			const fileReader = new FileReader()
			fileReader.onload = function (fileReaderEvt) {
				// push our new file to the images array.
				setFormData((prevState) => ({
					...prevState,
				}))
			}
			fileReader.readAsDataURL(files[0])
			return
		}
		// for Booleans, Strings and Numbers.
		setFormData((prevState) => ({
			...prevState,
			[id]: bool ?? value,
		}))
	}
	return (
		<>
			<section className='bg-neutral-700 py-8  relative text-primary-black px-[5%]'>
				<header className='mb-6 '>
					<h1 className='lg:text-4xl'>Edit Customer</h1>
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
							value={formData.email}
							id={'email'}
							name={'email'}
							onChange={onMutate}
							minLength={1}
							maxLength={32}
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
							value={formData.location}
							className='resize-none input-box max-w-[320px] px-2'
							onChange={
								onMutate as unknown as ChangeEventHandler<HTMLTextAreaElement>
							}
						></textarea>
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
							minLength={8}
							maxLength={32}
							className='input-box max-w-[320px]'
							required
						/>
					</div>

					<button
						type={'submit'}
						className='primary-btn w-[80%] mx-auto hover:bg-indigo-500 '
					>
						Edit Customer
					</button>
				</form>
			</section>
			{loading && <Spinner />}
		</>
	)
}
EditCustomerPage.getLayout = function getLayout(page: JSX.Element) {
	return <AuthLayout>{page}</AuthLayout>
}
export default EditCustomerPage
