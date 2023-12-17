import * as React from 'react'

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { CloseOutlined } from '@ant-design/icons'
import { Card, Button, Form, Input, Space, Typography } from 'antd'
import { useState } from 'react'

export const StepFamily = (): JSX.Element => {
	const [form] = Form.useForm()

	return (
		<>
			<section>
				<Form
					form={form}
					name='dynamic_form_complex'
					style={{
						maxWidth: 800,
						background: 'transparent',
					}}
					autoComplete='on'
					initialValues={{
						items: [
							{
								firstName: '',
								middleName: '',
								lastName: '',
							},
						],
					}}
				>
					<Form.List name='items'>
						{(fields, { add, remove }) => (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									background: 'transparent',
								}}
							>
								{fields.map((field) => (
									<Card
										title={`Add Family Member ${field.name + 1}`}
										className='my-3'
										key={field.key}
										extra={
											<CloseOutlined
												onClick={() => {
													remove(field.name)
												}}
											/>
										}
									>
										<Form.Item
											label='Relationship'
											name={[field.name, 'relation']}
										>
											<Select>
												<SelectTrigger className='w-[200px]'>
													<SelectValue placeholder='Select Family Member' />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>Relation Type</SelectLabel>
														<SelectItem value='spouse'>Spouse</SelectItem>
														<SelectItem value='child'>Child</SelectItem>
														<SelectItem value='dependent'>Dependant</SelectItem>
														<SelectItem value='heir'>Heir</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
										</Form.Item>
										<div className='flex rounded-lg'>
											{/* Nest Form.List */}
											<Form.Item label='Dependency'>
												<Form.List name={[field.name, 'list']}>
													{(subFields, subOpt) => (
														<div
															style={{
																display: 'flex',
																flexDirection: 'column',
															}}
														>
															{subFields.map((subField) => (
																<>
																	<Space key={subField.key}>
																		<Form.Item
																			name={[subField.name, 'firstName']}
																		>
																			<Input placeholder='First name' />
																		</Form.Item>
																	</Space>
																	<Space key={subField.key}>
																		<Form.Item
																			name={[subField.name, 'middleName']}
																		>
																			<Input placeholder='Middle Name' />
																		</Form.Item>
																	</Space>
																	<Space key={subField.key}>
																		<Form.Item
																			name={[subField.name, 'lastName']}
																		>
																			<Input placeholder='Last name' />
																		</Form.Item>
																		<CloseOutlined
																			onClick={() => {
																				subOpt.remove(subField.name)
																			}}
																		/>
																	</Space>
																</>
															))}
															<Button
																type='dashed'
																onClick={() => subOpt.add()}
																block
															>
																+ Add Dependency/Heir
															</Button>
														</div>
													)}
												</Form.List>
											</Form.Item>
										</div>
									</Card>
								))}

								<Button
									type='dashed'
									className='my-6'
									onClick={() => add()}
									block
								>
									+ Add Family Member
								</Button>
							</div>
						)}
					</Form.List>
				</Form>
			</section>
		</>
	)
}
