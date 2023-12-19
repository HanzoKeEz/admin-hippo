import Link from 'next/link'
import { useRouter } from 'next/router'
import { BiUserCircle } from 'react-icons/bi'
import { LiaHippoSolid } from 'react-icons/lia'
import { LayoutDashboard } from 'lucide-react'
import UserButton from '../user-button'

function NavBar() {
	const router = useRouter()
	console.log(router.pathname)
	function pathMatchRoute(route: string): boolean {
		if (route === router.pathname) return true
		return false
	}
	return (
		<nav className='fixed bg-gray-50 max-md:bottom-0 h-[75px] z-[900] w-screen flex md:flex-col md:justify-between border border-[#aaaeaa] md:border-r md:border-t-0 md:left-0  md:h-screen md:w-[180px]  '>
			<ul className='flex items-center h-full justify-evenly w-full md:space-x-0 md:flex-col md:justify-start md:mt-6 md:space-y-4  '>
				<li className=''>
					<Link
						href='/dashboard'
						className={`sidebarLink ${
							pathMatchRoute('/dashboard')
								? 'text-gray-900 font-semibold'
								: 'text-gray-500 font-semibold'
						}`}
					>
						<LayoutDashboard
							className='hover:scale-125 transition-all ease-out duration-300'
							size={24}
						/>

						<span>Dashboard</span>
					</Link>
				</li>
				<li className='  '>
					<Link
						href='/create-customer'
						className={`sidebarLink ${
							pathMatchRoute('/create-customer')
								? 'text-gray-900 font-semibold'
								: 'text-gray-500 font-semibold'
						}`}
					>
						<LiaHippoSolid
							className='max-md:hover:scale-125 transition-all ease-out duration-300'
							size={24}
						/>
						<span>Customers</span>
					</Link>
				</li>

				<li className=''>
					<Link
						href='/profile-customer'
						className={`sidebarLink ${
							pathMatchRoute('/profile-customer')
								? 'text-gray-900 font-semibold'
								: 'text-gray-500 font-semibold'
						}`}
					>
						<BiUserCircle
							className='max-md:hover:scale-125 transition-all ease-out duration-300'
							size={24}
						/>
						<span>Profile</span>
					</Link>
				</li>
			</ul>
			<UserButton />
		</nav>
	)
}

export default NavBar
