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
		<header className='fixed top-0 h-14 text-primary-black flex justify-end right-0 pr-6 w-screen rounded-b-md bg-neutral-800 '>
			<div className='flex h-full items-center justify-center md:hidden'>
				<span className='text-2xl text-neutral-200 font-thin'>Hippo Docs</span>
				<LiaHippoSolid
					size={28}
					className='text-violet-400 flex items-center justify-center h-full mx-3'
				/>
			</div>
			<ul className='flex items-center gap-3'>
				<li
					className='cursor-pointer text-neutral-200 hover:text-violet-400 transition-all ease-out duration-300'
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
