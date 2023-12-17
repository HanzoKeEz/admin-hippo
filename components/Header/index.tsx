import { auth } from '@/firebase/firebase.config'
import useAuthStore from '@/store/useAuthStore'
import { signOut } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { LiaHippoSolid } from 'react-icons/lia'
import { toast } from 'react-toastify'

function Header() {
	const logout = useAuthStore((state) => state.logout)
	const router = useRouter()

	async function onLogout() {
		try {
			await signOut(auth)
			logout()
		} catch (err) {
			toast.error('failed to log out')
		}
	}
	return (
		<header className='fixed top-0 h-12 text-primary-black bg-background w-full flex justify-between pr-6 border-b border-violet-200 '>
			<div className='flex h-full items-center justify-center pl-6'>
				<span className='text-xl font-thin'>Hippo Docs</span>
				<LiaHippoSolid
					size={20}
					className='text-violet-800 flex items-center justify-center h-full mx-3'
				/>
			</div>
			<ul className='flex items-center gap-3'>
				<li>
					<Link href='/profile'>User</Link>
				</li>
				<li
					className='cursor-pointer'
					onClick={() => {
						onLogout()
					}}
				>
					Logout
				</li>
			</ul>
		</header>
	)
}

export default Header
