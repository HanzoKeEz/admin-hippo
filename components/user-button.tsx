import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import useAuthStore from '@/store/useAuthStore'
import { Label } from './ui/label'
import Link from 'next/link'

function UserButton() {
	const user = useAuthStore((state) => state.user)
	return (
		<div className='rounded-md shadow-xl shadow-neutral-900 w-full h-full border border-neutral-500'>
			<Link
				href='/profile'
				className='flex cursor-pointer w-full justify-end gap-2 items-center px-2 py-1 bg-violet-900 text-neutral-200 rounded-sm'
			>
				<Label>{user?.displayName}</Label>
				<Avatar className='cursor-pointer ease-in-out border-2 border-neutral-300'>
					<AvatarImage
						src={user?.photoURL as string}
						alt={user?.displayName as string}
					/>
				</Avatar>
			</Link>
		</div>
	)
}

export default UserButton
