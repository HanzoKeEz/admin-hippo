import { motion } from 'framer-motion'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { LiaHippoSolid } from 'react-icons/lia'

export default function LoadingPage() {
	const router = useRouter()
	useEffect(() => {
		setTimeout(() => router.push('/home'), 3500)
	}, [router])

	return (
		<>
			<Head>
				<title>Hippo Docs</title>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta name='description' content='A web application legal prep.' />
				<meta
					name='keywords'
					content='Trust, Mortgages, Wills, Estate Management'
				/>
			</Head>

			<motion.main
				className='bg-primary-purple overflow-hidden h-screen w-full grid place-items-center'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, delayChildren: 0.7 }}
			>
				<motion.svg
					initial={{ scale: 0.7 }}
					animate={{
						scale: [0.7, 1, 0.7, 1, 0.7, 1, 1, 100],
					}}
					transition={{
						duration: 3,
						times: [0, 0.8, 1],
						ease: 'easeIn',
					}}
					className='fill-primary-white'
					viewBox='0 0 24 24'
					width='70px'
					height='70px'
					xmlns='http://www.w3.org/2000/svg'
				>
					<LiaHippoSolid />
				</motion.svg>
			</motion.main>
		</>
	)
}
