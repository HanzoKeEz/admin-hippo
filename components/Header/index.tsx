import { auth } from '@/firebase/firebase.config'
import useAuthStore from '@/store/useAuthStore'
import { signOut } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { LiaHippoSolid } from 'react-icons/lia'
import { toast } from 'react-toastify'

function Header() {
	// const logout = useAuthStore((state) => state.logout)
	// const router = useRouter()

	// async function onLogout() {
	// 	try {
	// 		await signOut(auth)
	// 		logout()
	// 	} catch (err) {
	// 		toast.error('failed to log out')
	// 	}
	// }
	return (
		<header className=' h-24 text-primary-black bg-primary-white w-full flex justify-between pr-6 border-b border-violet-200 '>
			<div className='flex flex-col justify-center pl-6'>
				<span className='text-3xl font-bold'>
					<LiaHippoSolid size={24} />
				</span>{' '}
				<span className='text-2xl font-thin'>Hippo Docs</span>
			</div>
			<ul className='flex items-center gap-3'>
				<li>
					<Link href='/profile'>User</Link>
				</li>
				<li>Logout</li>
			</ul>
		</header>
	)
}

export default Header
