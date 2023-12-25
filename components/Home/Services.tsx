import { FaHandsHelping } from 'react-icons/fa'
import { MdOutlineRealEstateAgent } from 'react-icons/md'
import { BsHouseHeart } from 'react-icons/bs'
import { VscLaw } from 'react-icons/vsc'
import { Button } from '../ui/button'

type props = {
	services: { heading: string; paragraph: string }[]
}
function Services({ services }: props) {
	return (
		<section
			id='Services'
			className='bg-zinc-200 min-h-screen pt-16  pb-6 grid place-items-center'
		>
			<div
				data-aos='fade-up'
				className='lg:flex justify-between px-[5%] mb-[150px]  items-center'
			>
				<div className='lg:w-[50%] w-[80%] space-y-3 mb-5 lg:mb-0'>
					<h3>Our Services</h3>
					<h2 className='text-3xl md:text-4xl lg:text-5xl font-bold'>
						Why Choose Us?
					</h2>
				</div>
				<p className='lg:w-[50%] w-[60%] text-slate-600 opacity-80'>
					Experience the Future of Legal Document Preparation: With our app,
					preparing important legal documents like wills, mortgages, and trusts
					becomes a seamless, stress-free process.
				</p>
			</div>
			<div className='flex w-full items-center justify-center px-8  gap-[5%] flex-wrap'>
				{services.map((service, index) => (
					<div
						data-aos='zoom-in'
						key={index}
						className='w-[350px] rounded-md hover:scale-110 text-center h-[360px] mb-[5%] px-6 py-3 shadow-[2px_2px_10px_rgba(0,0,0,0.35)] bg-primary-white'
					>
						<div className='flex items-center pt-3 justify-center'>
							{index === 0 && (
								<FaHandsHelping className='text-violet-400' size={40} />
							)}
							{index === 1 && (
								<MdOutlineRealEstateAgent
									className='text-violet-400'
									size={40}
								/>
							)}
							{index === 2 && (
								<BsHouseHeart className='text-violet-400' size={40} />
							)}
							{index === 3 && <VscLaw className='text-violet-400' size={40} />}
						</div>
						<div className='space-y-4 mt-[50px]'>
							<h3 className='hover:text-primary-purple'>{service.heading}</h3>
							<p className='opacity-80 hover:text-neutral-500 text-slate-500'>
								{service.paragraph}
							</p>
							<Button className='bg-primary-purple rounded-sm transition-all duration-300 hover:opacity-70 px-12 text-primary-white'>
								Find Out More
							</Button>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export default Services
