import { ReactNode, useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { onAuthStateChanged } from 'firebase/auth'
import useAuthStore from '@/store/useAuthStore'
import { auth } from '@/firebase/firebase.config'
import { useRouter } from 'next/router'
import Spinner from '../Spinner'
import Header from '../Header'

function AuthLayout({ children }: { children: ReactNode }) {
	const user = useAuthStore((state) => state.user)
	const [loading, setLoading] = useState(true)
	const login = useAuthStore((state) => state.login)
	const logout = useAuthStore((state) => state.logout)
	const router = useRouter()
	useEffect(() => {
		const unSubscribe = onAuthStateChanged(auth, (user) => {
			if (user !== null) {
				login(user)
			} else {
				logout()
				router.push('/signup')
			}
			setLoading(false)
		})
		return () => unSubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (loading) {
		return <Spinner />
	}

	return (
		<>
			<Header />
			<Navbar />
			<main className='md:max-w-[calc(100%-200px)] mt-[57px] lg:pl-8 md:ml-auto md:mb-0 mb-[110px] w-full bg-neutral-800'>
				{children}
			</main>
		</>
	)
}

export default AuthLayout
