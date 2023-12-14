import { Tabs, TabsProps } from 'antd'
import CustomersList from './CustomersList'
import AuthLayout from '@/components/AuthLayout'

const onChange = (key: string) => {
	console.log(key)
}

const items: TabsProps['items'] = [
	{
		key: '1',
		label: 'Customers',
		children: <CustomersList />,
	},
]

function DashboardPage() {
	return (
		<div className='bg-white p-1'>
			<Tabs defaultActiveKey='1' items={items} onChange={onChange} />
		</div>
	)
}

DashboardPage.getLayout = function getLayout(page: JSX.Element) {
	return <AuthLayout>{page}</AuthLayout>
}
export default DashboardPage
