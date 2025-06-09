import React from 'react'
import MyOrderPage from './MyOrderPage'

const Profile = () => {
    return (
        <div className='min-h-screen flex flex-col bg-gray-50'>
            <div className='flex-grow w-full max-w-7xl mx-auto p-4 md:p-6'>
                <div className='flex flex-col md:flex-row gap-6'>
                    {/* Sidebar */}
                    <div className='w-full md:w-1/3 lg:w-1/4 shadow-md bg-white rounded-lg p-6'>
                        <h1 className='text-2xl md:text-3xl font-bold mb-2'>John Doe</h1>
                        <p className='text-gray-600 mb-4 break-words'>john@email.com</p>
                        <button className='w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200'>
                            Logout
                        </button>
                    </div>

                    {/* Orders Section */}
                    <div className='w-full md:w-2/3 lg:w-3/4'>
                        <MyOrderPage />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
