import { ICustomer } from '@/types'
import {
	ChangeEvent,
	useState,
	MouseEvent,
	ChangeEventHandler,
	FormEvent,
	useRef,
} from 'react'

import { toast } from 'react-toastify'
import Head from 'next/head'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase/firebase.config'
import useAuthStore from '@/store/useAuthStore'
import { useRouter } from 'next/router'
import Spinner from '@/components/Spinner'
import AuthLayout from '@/components/AuthLayout'
import { Form } from 'antd'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type formData = {
	firstName: string
	middleName: string
	lastName: string
	email: string
	phone: string
	driversLicense: string
	birthDate: string
	sex: string
	ssn: string
	location: string
	role: string
	city: string
	state: string
	zip: string
	status: string
}

function CreateCustomerPage(): JSX.Element {
	const [form] = Form.useForm()
	const [alreadyApproved, setAlreadyApproved] = useState<boolean>(false)
	const router = useRouter()
	const imageInput = useRef<HTMLInputElement | null>(null)
	const user = useAuthStore((state) => state.user)
	const [formData, setFormData] = useState<formData>({
		firstName: '',
		middleName: '',
		lastName: '',
		email: '',
		phone: '',
		driversLicense: '',
		birthDate: '',
		sex: '',
		ssn: '',
		location: '',
		role: 'customer',
		city: '',
		state: 'CA',
		zip: '',
		status: 'pending',
	})
	const [loading, setLoading] = useState<boolean>(false)

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
			<section className='bg-neutral-700 flex flex-col items-center border border-gray-400 p-6 rounded-lg relative text-neutral-300'>
				<header className='mb-6'>
					<h1 className='lg:text-3xl'>Add New Customer</h1>
				</header>
				<form className='space-y-5' onSubmit={handleSubmit}>
					<div>
						<Label htmlFor='firstName' className='font-thin mb-3 block'>
							First Name
						</Label>
						<Input
							type='text'
							value={formData.firstName}
							id={'firstName'}
							name={'firstName'}
							onChange={onMutate}
							minLength={1}
							maxLength={32}
							className='input-box min-w-[340px]'
							required
						/>
						<Label htmlFor='middleName' className='font-thin mb-3 block'>
							Middle Name
						</Label>
						<Input
							type='text'
							value={formData.middleName}
							id={'middleName'}
							name={'middleName'}
							onChange={onMutate}
							minLength={1}
							maxLength={32}
							className='input-box min-w-[340px]'
						/>
						<Label htmlFor='lastName' className='font-thin mb-3 block'>
							Last Name
						</Label>
						<Input
							type='text'
							value={formData.lastName}
							id={'lastName'}
							name={'lastName'}
							onChange={onMutate}
							minLength={1}
							maxLength={32}
							className='input-box min-w-[340px]'
							required
						/>
						<Label htmlFor='email' className='font-thin mb-3 block'>
							Email
						</Label>
						<Input
							type='text'
							id='email'
							name='email'
							onChange={onMutate}
							value={formData.email}
							minLength={1}
							maxLength={50}
							className='input-box min-w-[340px]'
							required
						/>
						<Label htmlFor='phone' className='font-thin mb-3 block'>
							Phone
						</Label>
						<Input
							type='text'
							id='phone'
							name='phone'
							onChange={onMutate}
							value={formData.phone}
							minLength={1}
							maxLength={50}
							className='input-box min-w-[340px]'
							required
						/>
					</div>

					<div>
						<Label htmlFor='driversLicense' className='font-thin mb-3 block'>
							Drivers License
						</Label>
						<Input
							type='text'
							id='driversLicense'
							name='driversLicense'
							onChange={onMutate}
							value={formData.driversLicense}
							minLength={1}
							maxLength={50}
							className='input-box min-w-[340px]'
							required
						/>
						<Label htmlFor='birthDate' className='font-thin mb-3 block'>
							Date of Birth
						</Label>
						<Input
							type='date'
							id='birthDate'
							name='birthDate'
							onChange={onMutate}
							value={formData.birthDate}
							minLength={1}
							maxLength={50}
							className='input-box min-w-[340px]'
							required
						/>
						<Label htmlFor='sex' className='font-thin mb-3 block'>
							Sex
						</Label>
						<Input
							type='text'
							id='sex'
							name='sex'
							onChange={onMutate}
							value={formData.sex}
							minLength={1}
							maxLength={50}
							className='input-box min-w-[340px]'
							required
						/>
						<Label htmlFor='ssn' className='font-thin mb-3 block'>
							Social Security Number
						</Label>
						<Input
							type='text'
							className='input-box mb-3 block'
							id='ssn'
							name='ssn'
							onChange={onMutate}
							value={formData.ssn}
							minLength={1}
							maxLength={50}
						/>
						<Label htmlFor='location' className='font-thin mb-3 block'>
							Street Address
						</Label>
						<Input
							type='text'
							name='location'
							id='location'
							onChange={onMutate}
							value={formData.location}
							minLength={1}
							maxLength={50}
							className='input-box min-w-[340px]'
							required
						/>
					</div>
					<div>
						<Label htmlFor='city' className='font-thin mb-3 block'>
							City
						</Label>
						<Input
							type='text'
							value={formData.city}
							id={'city'}
							name={'city'}
							onChange={onMutate}
							minLength={2}
							maxLength={32}
							className='input-box min-w-[340px]'
							required
						/>
					</div>
					<div>
						<Label htmlFor='state' className='font-thin mb-3 block'>
							State
						</Label>
						<Input
							type='text'
							defaultValue={'CA'}
							value={formData.state}
							id={'state'}
							name={'state'}
							onChange={onMutate}
							minLength={2}
							maxLength={32}
							className='input-box min-w-[340px]'
							placeholder='CA'
							required
						/>
					</div>
					<div>
						<Label htmlFor='zip' className='font-thin mb-3 block'>
							ZipCode
						</Label>
						<Input
							type='text'
							value={formData.zip}
							id={'zip'}
							name={'zip'}
							onChange={onMutate}
							minLength={2}
							maxLength={32}
							className='input-box min-w-[340px]'
							required
						/>
					</div>
					<div className='pt-6'>
						<button
							type={'submit'}
							className='primary-btn w-full hover:bg-violet-300 shadow-lg shadow-neutral-800 hover:text-neutral-700 hover:font-medium duration-200'
						>
							Add New Customer
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
