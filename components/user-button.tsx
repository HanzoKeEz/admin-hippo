import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import useAuthStore from '@/store/useAuthStore'
import { Label } from './ui/label'
import Link from 'next/link'

function UserButton() {
	const user = useAuthStore((state) => state.user)
	return (
		<div className='h-24 md:flex md:flex-none hidden items-center w-[175px] bottom-0 fixed left-0'>
			<Link
				href='/profile'
				className='flex cursor-pointer w-full justify-end items-center gap-3 bg-primary-purple/70 p-3 rounded-lg'
			>
				<Label>{user?.displayName}</Label>
				<Avatar className='cursor-pointer ease-in-out '>
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
