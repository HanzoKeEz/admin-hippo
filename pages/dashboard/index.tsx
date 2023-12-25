import CustomersList from './CustomersList'
import AuthLayout from '@/components/AuthLayout'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import Overview from './Overview'
import CreateCustomerPage from '../create-customer'

function DashboardPage() {
	return (
		<div className='w-full rounded-lg min-h-screen'>
			<div className='space-y-4 p-3  rounded-lg border text-neutral-200'>
				<div className='flex items-center pl-3 justify-between'>
					<h2 className='text-lg font-normal tracking-wider text-neutral-400/80'>
						DASHBOARD
					</h2>
				</div>
				<Tabs defaultValue='overview' className=''>
					<TabsList>
						<div className='border-2 bg-neutral-700 border-neutral-400 gap-3 rounded-lg w-[300px] justify-evenly flex py-1 ml-2'>
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
						<div className='mx-2 my-3 p-3 border border-neutral-400 rounded-lg shadow'>
							<Overview />
						</div>
					</TabsContent>
					<TabsContent value='customers'>
						<CustomersList />
					</TabsContent>
					<TabsContent value='forms'>
						<div className=''>
							<CreateCustomerPage />
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}

DashboardPage.getLayout = function getLayout(page: JSX.Element) {
	return <AuthLayout>{page}</AuthLayout>
}
export default DashboardPage
