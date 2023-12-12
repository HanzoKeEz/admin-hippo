import React, { useState } from 'react'
import { Col, Form, Input, message } from 'antd'

import { useRouter } from 'next/router'

import {
	AddCustomer,
	UpdateCustomer,
	CheckIfCustomerAccountIsApplied,
} from '@/apicalls/customers'

const normFile = (e: any) => {
	if (Array.isArray(e)) {
		return e
	}
	return e?.fileList
}

type FieldType = {
	firstName: string
	middleName: string
	lastName: string
	email: string
	phone: string
	streetAddress: string
	state: string
}
const AddCustomerForm: React.FC = () => {
	const [form] = Form.useForm()
	const [alreadyApproved, setAlreadyApproved] = useState(false)
	const [alreadyApplied, setAlreadyApplied] = useState(false)
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const userItem = localStorage.getItem('user')
	if (userItem === null) {
		throw new Error('No user in local storage')
	}
	const userId = JSON.parse(userItem).id

	const onFinish = async (values: any) => {
		try {
			setLoading(true)
			const payload = {
				...values,
				status: 'pending',
				role: 'customer',
			}
			let response = null
			if (alreadyApproved) {
				payload.status = 'approved'
				response = await UpdateCustomer(payload)
			} else {
				response = await AddCustomer(payload)
			}

			if (response) {
				message.success(response.message)
				router.push('/profile')
			} else {
				message.error(response)
			}
			setLoading(false)
		} catch (error) {
			setLoading(false)
			message.error('error')
		}
	}

	return (
		<div className='bg-white p-6 w-full border-2 rounded-xl'>
			{(!alreadyApplied || alreadyApproved) && (
				<>
					<div className='border-2 p-6 rounded-xl bg-slate-200'>
						<h3 className='uppercase my-1'>
							{alreadyApproved
								? 'Update your information'
								: 'Add A New Customer'}
						</h3>
						<hr />
						<Form
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							style={{ maxWidth: 600 }}
							initialValues={{ remember: true }}
							autoComplete='on'
							layout='horizontal'
							className='my-1'
							onFinish={onFinish}
							form={form}
						>
							{/* personal information */}

							<h4 className='uppercase'>
								<b>Personal Information</b>
							</h4>
							<div className='flex flex-col'>
								<Form.Item
									label='First Name'
									name='firstName'
									rules={[
										{
											required: true,
											message: 'Required',
										},
									]}
								>
									<Input type='text' placeholder='Henry' />
								</Form.Item>
								<Form.Item
									className=''
									label='Middle Name'
									name='middleName'
									rules={[
										{
											required: true,
											message: 'Required',
										},
									]}
								>
									<Input type='text' placeholder='G' />
								</Form.Item>
								<Form.Item
									label='Last Name'
									name='lastName'
									rules={[
										{
											required: true,
											message: 'Required',
										},
									]}
								>
									<Input type='text' placeholder='Bui' />
								</Form.Item>

								<Form.Item
									label='Email'
									name='email'
									rules={[
										{
											required: true,
											message: 'Required',
										},
									]}
								>
									<Input type='email' />
								</Form.Item>

								<Form.Item
									label='Phone'
									name='phone'
									rules={[
										{
											required: true,
											message: 'Required',
										},
									]}
								>
									<Input type='number' />
								</Form.Item>

								<Form.Item<FieldType>
									label='Street Address'
									name='streetAddress'
									rules={[
										{
											required: true,
											message: 'Required',
										},
									]}
								>
									<Input type='text' />
								</Form.Item>
							</div>

							{/* professional information */}

							<Form.Item<FieldType>
								label='State'
								name='state'
								rules={[
									{
										required: true,
										message: 'Required',
									},
								]}
							>
								<Input type='text' />
							</Form.Item>

							<Col span={24}>
								<hr />
							</Col>

							<div className='flex justify-end gap-2'>
								<button className='outlined-btn' type='button'>
									CANCEL
								</button>
								<button className='contained-btn' type='submit'>
									SUBMIT
								</button>
							</div>
						</Form>
					</div>
				</>
			)}

			{alreadyApplied && !alreadyApproved && (
				<div className='flex flex-col items-center gap-2'>
					<h3 className='text-secondary'>
						You have already added this customer, please wait for the admin to
						approve your request
					</h3>
				</div>
			)}
		</div>
	)
}

export default AddCustomerForm
