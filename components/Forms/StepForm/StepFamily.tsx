import { CloseOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, InputNumber, Space, Typography } from 'antd'
import { useState } from 'react'

const { Title, Paragraph } = Typography

export const StepFamily = (): JSX.Element => {
	const [form] = Form.useForm()

	return (
		<>
			<section>
				<Title level={4} className='mb-4'>
					Family Information
				</Title>
				<Form
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 18 }}
					form={form}
					name='dynamic_form_complex'
					style={{ maxWidth: 600 }}
					autoComplete='off'
					initialValues={{ items: [{}] }}
				>
					<Form.List name='items'>
						{(fields, { add, remove }) => (
							<div
								style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}
							>
								{fields.map((field) => (
									<Card
										size='small'
										title={`Item ${field.name + 1}`}
										key={field.key}
										extra={
											<CloseOutlined
												onClick={() => {
													remove(field.name)
												}}
											/>
										}
									>
										<Form.Item label='Add Family' name={[field.name, 'name']}>
											<Input placeholder='Dependency or Heir' />
										</Form.Item>

										{/* Nest Form.List */}
										<Form.Item label='Dependency'>
											<Form.List name={[field.name, 'list']}>
												{(subFields, subOpt) => (
													<div
														style={{
															display: 'flex',
															flexDirection: 'column',
															rowGap: 16,
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
																	<Form.Item name={[subField.name, 'lastName']}>
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
									</Card>
								))}

								<Button type='dashed' onClick={() => add()} block>
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
