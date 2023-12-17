import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Button, InputNumber, Typography } from 'antd'
import { useState } from 'react'

const { Title, Paragraph } = Typography

export const StepBasicInfo = (): JSX.Element => {
	const [showCustomCA, setShowCustomCA] = useState(false)

	const handleShowCustomCA = (): void => {
		setShowCustomCA(!showCustomCA)
	}

	return (
		<>
			<section className='mt-4'>
				<div className='flex flex-col gap-4 '>
					<Input placeholder='First Name' />
					<Input placeholder='Middle Name' />
					<Input placeholder='Last Name' />
					<Input placeholder='Phone number' />
					<Input placeholder='Email' />
				</div>
			</section>
		</>
	)
}
