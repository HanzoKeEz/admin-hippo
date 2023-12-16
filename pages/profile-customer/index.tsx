import AuthLayout from '@/components/AuthLayout'
import useAuthStore from '@/store/useAuthStore'

import { ICustomer } from '@/types'
import Link from 'next/link'
import { useState } from 'react'

type Optional<T> = {
	[P in keyof T]?: T[P]
}
type userCustomersData = {
	id: string
	data: ICustomer
}
function ProfileCustomerPage() {
	const user = useAuthStore((state) => state.user)
	const [customers, setCustomers] = useState({
		data: [],
		loading: false,
	})
	const [formData, setFormData] = useState<Optional<ICustomer>>({
		firstName: '',
		middleName: '',
		lastName: '',
		email: '',
		phone: '',
		location: '',
		speciality: '',
		status: '',
		timestamp: '',
		// userRef: '',
	})
	return (
		<>
			<section className='px-8 pb-[5%] md:px-[10%] pt-[5%] md:pb-0 min-h-screen w-full text-gray-800 bg-primary-grey'>
				<div className='mb-[5rem] flex items-center justify-between'>
					<h1 className='text-2xl md:text-4xl'>
						Welcome <span className='opacity-70 font-medium '></span>{' '}
						<span>👋</span>
					</h1>
					<button className='py-2 px-5 bg-primary-purple text-primary-white rounded-2xl font-semibold hover:opacity-50'>
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
						></button>
						{/* profile details card */}
					</div>
					<div className='bg-[#fff] text-gray-800 rounded-2xl space-y-6 shadow-[0px_0px_5px_rgba(0,0,0,0.2)] p-4 h-[225px]'>
						<div className='flex flex-col mt-2 space-y-2'>
							<label htmlFor='firstName' className='pl-4 text-sm opacity-80'>
								First Name
							</label>
						</div>
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
					</div>
				</form>
			</section>
		</>
	)
}

ProfileCustomerPage.getLayout = function getLayout(page: JSX.Element) {
	return <AuthLayout>{page}</AuthLayout>
}
export default ProfileCustomerPage
