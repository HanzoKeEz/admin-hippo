import Link from 'next/link'
import React from 'react'
import { LiaHippoSolid } from 'react-icons/lia'

function Header() {
	return (
		<div className='w-full flex justify-between pr-6 h-16 border-b border-indigo-400 '>
			<h4 className=' font-semibold fill-[#fff] text-lg mb-4 px-3 py-2'>
				<span>
					<LiaHippoSolid />
				</span>
				<span>Hippo Docs</span>
			</h4>
			<ul className='flex items-center gap-3'>
				<li>
					<Link href='/profile'>User</Link>
				</li>
				<li>Logout</li>
			</ul>
		</div>
	)
}

export default Header
