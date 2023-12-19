import CustomersList from './CustomersList'
import AuthLayout from '@/components/AuthLayout'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import Overview from './Overview'

function DashboardPage() {
	return (
		<div className='w-full rounded-lg min-h-screen border border-primary-purple'>
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
			<div className='flex-1 space-y-4 p-6 pt-6'>
				<div className='flex items-center justify-between space-y-2'>
					<h2 className='text-3xl font-bold ml-3 tracking-tight'>Dashboard</h2>
					<div className='flex items-center space-x-2'>
						{/* <CalendarDateRangePicker />
							<Button>Download</Button> */}
					</div>
				</div>
				<Tabs defaultValue='overview' className='space-y-4'>
					<TabsList>
						<div className='flex bg-slate-500 text-violet-100 gap-3 p-2 mx-2 my-1 rounded-lg'>
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
						<div className=''>{/* <AddCustomerForm /> */}</div>
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
