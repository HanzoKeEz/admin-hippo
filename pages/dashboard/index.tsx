import CustomersList from './CustomersList'
import AuthLayout from '@/components/AuthLayout'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import Overview from './Overview'
import CreateCustomerPage from '../create-customer'

function DashboardPage() {
	return (
		<div className='w-full rounded-lg min-h-screen'>
			<div className='flex-col md:flex'>
				<div className='flex items-center px-4'>
					{/* <TeamSwitcher />
						<MainNav className='mx-6' /> */}
					<div className='ml-auto flex items-center space-x-4'>
						{/* <Search />
							<UserNav /> */}
					</div>
				</div>
			</div>
			<div className='space-y-4 p-3 bg-neutral-700 rounded-lg text-neutral-200'>
				<div className='flex items-center pl-3 justify-between'>
					<h2 className='text-lg font-normal tracking-wider text-neutral-400/90'>
						DASHBOARD
					</h2>
					<div className='flex items-center space-x-2'>
						{/* <CalendarDateRangePicker />
							<Button>Download</Button> */}
					</div>
				</div>
				<Tabs defaultValue='overview' className='space-y-4'>
					<TabsList>
						<div className='flex bg-neutral-900 border-2 border-neutral-500 text-violet-100 gap-3 p-2 mx-2 rounded-lg'>
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
						<div className='p-2 rounded shadow'>
							<h1 className='text-2xl font-semibold uppercase'>Customers</h1>
							<CustomersList />
						</div>
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
