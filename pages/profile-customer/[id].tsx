import AuthLayout from '@/components/AuthLayout'
import React from 'react'

function CustomerPage() {
	return (
		<div className='p-6'>
			<h1>CustomerPage</h1>
		</div>
	)
}

CustomerPage.getLayout = function getLayout(page: JSX.Element) {
	return <AuthLayout>{page}</AuthLayout>
}

export default CustomerPage
