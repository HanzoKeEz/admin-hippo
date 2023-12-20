import { useEffect } from 'react'
import Head from 'next/head'
import AOS from 'aos'
import 'aos/dist/aos.css'
import data from '@/data/data.json'
import { Hero, Nav, Services, Testimonals } from '@/components/Home'
function HomePage() {
	useEffect(() => {
		AOS.init({
			duration: 1000,
		})
	}, [])
	const { services, testimonials } = data
	return (
		<>
			<Head>
				<title>Hippo Docs</title>
			</Head>
			<Nav />
			<Hero />
			<main className='min-h-screen relative '>
				{/* Services */}
				<Services services={services} />
				{/* Testimonals */}
				<Testimonals testimonials={testimonials} />
			</main>
			<footer className='bg-neutral-400 py-2 px-3 text-primary-white text-center'>
				<p>{new Date().getFullYear()}</p>
			</footer>
		</>
	)
}

export default HomePage
