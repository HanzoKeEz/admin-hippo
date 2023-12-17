import { TabsProps, message } from 'antd'
import CustomersList from './CustomersList'
import AuthLayout from '@/components/AuthLayout'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import Overview from './Overview'
import { Stepper } from '@/components/Forms/Stepper'
import { useEffect, useState } from 'react'
import { GetAllCustomers } from '@/apicalls/customers'

function DashboardPage() {
	return (
		<div className='bg-slate-100 py-2 px-3 rounded-lg min-h-screen'>
			<Tabs defaultValue='overview'>
				<TabsList>
					<div className='flex bg-slate-500 text-violet-100 gap-3 p-1 mx-3 my-1 border border-violet-500 rounded-lg'>
						<TabsTrigger className='tabsTrigger ' value='overview'>
							Overview
						</TabsTrigger>
						<TabsTrigger className='tabsTrigger' value='customers'>
							Customers
						</TabsTrigger>
						<TabsTrigger className='tabsTrigger' value='forms'>
							Form
						</TabsTrigger>
					</div>
				</TabsList>
				<TabsContent value='overview'>
					<div className='mx-2 my-6 p-3 bg-slate-100 rounded shadow'>
						<Overview />
					</div>
				</TabsContent>
				<TabsContent value='customers'>
					<div className='p-2 bg-white rounded shadow'>
						<h1 className='text-2xl font-semibold'>Customers</h1>
						<CustomersList />
					</div>
				</TabsContent>
				<TabsContent value='forms'>
					<div className=''>
						<Stepper />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}

DashboardPage.getLayout = function getLayout(page: JSX.Element) {
	return <AuthLayout>{page}</AuthLayout>
}
export default DashboardPage
