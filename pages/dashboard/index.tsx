import { TabsProps } from 'antd'
import CustomersList from './CustomersList'
import AuthLayout from '@/components/AuthLayout'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import Overview from './Overview'
import { Stepper } from '@/components/Forms/Stepper'

const onChange = (key: string) => {
	console.log(key)
}

// const items: TabsProps['items'] = [
// 	{
// 		key: '1',
// 		label: 'Dashboard',
// 		children: <Overview />,
// 		className: 'text-red-500',
// 	},
// 	{
// 		key: '2',
// 		label: 'Customers',
// 		children: <CustomersList />,
// 	},
// ]

function DashboardPage() {
	return (
		<div className='bg-violet-50 py-2 px-6 rounded-lg min-h-screen'>
			<Tabs defaultValue='overview'>
				<TabsList>
					<div className='flex bg-violet-900 text-violet-100 gap-6 p-1 m-1 border border-violet-500 rounded-lg'>
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
					<div className='p-2 bg-white rounded shadow'>
						<h1 className='text-2xl font-semibold'>Overview</h1>
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
					<div className='p-2 bg-white rounded shadow'>
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
