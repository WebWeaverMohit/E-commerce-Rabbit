import React, { useState } from 'react'

const UserManagement = () => {

    const users = [
        {
            _id: 1232123,
            name: "John Deo",
            email: "john@example.com",
            role: "admin"
        }
    ]

    const [formData, setformData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer", // Default
    })

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // reset the form after submission
        setformData({
            name: "",
            email: "",
            password: "",
            role: "customer",
        })
    }

    const handleRoleChange = (userId, newRole) => {
        console.log({ id: userId, role: newRole })
    }

    const handleDeleteUser = (userId) => {
        if(window.confirm("Are you sure you want to delete this user ?")){
            console.log("deleting user with id", userId)
        }
    }

    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h2 className="text-2xl font-bold mb-6">User Management</h2>
            {/* New user Form */}
            <div className="p-6 rounded mb-6">
                <h3 className='text-lg font-bold mb-4'>Add New User</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className='block text-gray-700'>Name</label>
                        <input type="text" name="name" value={formData.name} className='w-full p-2 border rounded' onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label className='block text-gray-700'>Email</label>
                        <input type="email" name="email" value={formData.email} className='w-full p-2 border rounded' onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label className='block text-gray-700'>Password</label>
                        <input type="password" name="password" value={formData.password} className='w-full p-2 border rounded' onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label className='block text-gray-700'>Role</label>
                        <select name="role" className='w-full p-2 border rounded-lg' value={formData.role} onChange={handleChange}>
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600'>Add User</button>
                </form>
            </div>
            {/* userlist */}
            <div className="overflow-x-auto shadow-md sm:rounded-b-lg">
                <table className="min-w-full text-left text-gray-500">
                    <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                        <tr>
                            <th className='py-2 px-4'>Name</th>
                            <th className='py-2 px-4'>Email</th>
                            <th className='py-2 px-4'>Role</th>
                            <th className='py-2 px-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className='borde-b hover:bg-gray-50'>
                                <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>
                                    {user.name}
                                </td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4">
                                    <select className='p-2 border rounded' value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value)}>
                                        <option value="customer">Customer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="p-4">
                                    <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600' onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserManagement