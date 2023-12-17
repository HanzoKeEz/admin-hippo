import Link from 'next/link'
import { useRouter } from 'next/router'
import { BiSolidNavigation, BiUserCircle } from 'react-icons/bi'
import { LiaHippoSolid } from 'react-icons/lia'
import { ThemeToggle } from '../theme-toggle'

function NavBar() {
	const router = useRouter()
	console.log(router.pathname)
	function pathMatchRoute(route: string): boolean {
		if (route === router.pathname) return true
		return false
	}
	return (
		<nav className='fixed max-md:bottom-0 h-[100px] z-[900] py-5 px-3 w-full border-t border-[#aaaeaa] md:border-r md:border-t-0 md:left-0  md:h-screen md:w-[225px] md:py-8 '>
			<ul className='flex space-x-12 items-center justify-center md:space-x-0 md:flex-col md:justify-start md:items-start md:space-y-4 md:mt-[50px] w-full'>
				<li className='md:hover:bg-gray-300 md:w-full md:px-3 md:rounded-md md:flex md:py-2'>
					<Link
						href='/dashboard'
						className={`flex flex-col space-y-2 items-center justify-center md:space-x-4 md:flex-row md:space-y-0 ${
							pathMatchRoute('/dashboard') ? 'text-gray-900' : 'text-gray-500'
						}`}
					>
						<BiSolidNavigation
							className='max-md:hover:scale-100 transition-all ease-out duration-300'
							size={24}
						/>

						<span>Dashboard</span>
					</Link>
				</li>

				<li className='md:hover:bg-gray-300 md:w-full md:px-3 md:rounded-md md:flex md:py-2'>
					<Link
						href='/profile-customer'
						className={`flex flex-col space-y-2 items-center justify-center md:space-x-4 md:flex-row md:space-y-0 ${
							pathMatchRoute('/profile-customer')
								? 'text-gray-900'
								: 'text-gray-500'
						}`}
					>
						<BiUserCircle
							className='max-md:hover:scale-110 transition-all ease-out duration-300'
							size={24}
						/>
						<span>Profile</span>
					</Link>
				</li>
				<li className='md:hover:bg-gray-300 md:w-full md:px-3 md:rounded-md md:flex md:py-2'>
					<Link
						href='/create-customer'
						className={`flex flex-col space-y-2 items-center justify-center md:space-x-4 md:flex-row md:space-y-0 ${
							pathMatchRoute('/create-customer')
								? 'text-gray-900'
								: 'text-gray-500'
						}`}
					>
						<BiUserCircle
							className='max-md:hover:scale-110 transition-all ease-out duration-300'
							size={24}
						/>
						<span>Customer Profile</span>
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default NavBar
