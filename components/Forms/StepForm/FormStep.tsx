import { Avatar, Button, Progress, theme, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { type ReactNode } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

const { Title } = Typography
const { useToken } = theme

interface FormStepProps {
	title: string
	children: ReactNode
	onPrev: () => void
	onNext: () => void
	progress: number
	currentStep: number
}

export const FormStep = (props: FormStepProps): JSX.Element => {
	const { title, children, progress, currentStep, onNext, onPrev } = props

	const { token } = useToken()

	const handlePrev = (): void => {
		onPrev()
	}

	const handleNext = (): void => {
		if (currentStep === 4) {
			console.log(JSON.stringify({ data: 'data' }))
		} else {
			onNext()
		}
	}

	return (
		<article className='w-full grid gap-6'>
			<header>
				<Progress percent={progress} strokeColor={token['geekblue-4']} />

				<div className='flex flex-col sm:flex-row items-center gap-4 mt-2'>
					<div className='px-3 py-2 w-[64px]'>
						<Avatar size={44} icon={<UserOutlined />} />
					</div>

					<Title level={3}>{title}</Title>
				</div>
			</header>

			{children}

			<nav
				className={clsx(
					'flex justify-between p-5 sm:p-0',
					'fixed sm:relative inset-x-0 bottom-0'
				)}
			>
				<Button
					className='bg-primary'
					type='primary'
					shape='round'
					size='large'
					onClick={handlePrev}
					disabled={currentStep === 1}
				>
					Back
				</Button>

				<Button
					className='bg-primary'
					type='primary'
					color='primary'
					shape='round'
					size='large'
					onClick={handleNext}
				>
					{currentStep === 4 ? (
						<Link href='/profile-customer'>Return to Dashboard</Link>
					) : (
						'Next'
					)}
				</Button>
			</nav>
		</article>
	)
}
