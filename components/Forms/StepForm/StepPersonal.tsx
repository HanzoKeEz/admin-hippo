import { Input } from '@/components/ui/input'
import { Slider, Typography } from 'antd'
import { type SliderMarks } from 'antd/es/slider'
import { useState } from 'react'

const { Title } = Typography

export const StepPersonal = (): JSX.Element => {
	const [value, setValue] = useState(5)

	return (
		<>
			<section className='grid gap-4'>
				<div className='flex justify-start'>
					<Title level={4} className='mb-4'>
						Personal Info
					</Title>
				</div>
				<div className='flex flex-col space-y-4'>
					<Input placeholder='Drivers License or ID' />
					<Input placeholder='Social security number' />
					<Input placeholder='Sex' />
					<Input placeholder='Date of birth' />
					<Input placeholder='Street Address' />
					<Input placeholder='City' />
					<Input placeholder='State' />
					<Input placeholder='Zip Code' />
				</div>
			</section>
		</>
	)
}
