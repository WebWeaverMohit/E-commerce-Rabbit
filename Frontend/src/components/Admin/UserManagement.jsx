import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    addUser,
    deleteUser,
    updateUser,
    fetchUsers,
} from "../../redux/slices/adminSlice";

const UserManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    const { users = [], loading, error } = useSelector((state) => state.admin);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer",
    });

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
        }
    }, [user, navigate, dispatch]);

    useEffect(() => {
        if (user && user.role === "admin") {
            dispatch(fetchUsers())
        }
    }, [dispatch, user])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // wait until user is added
            await dispatch(addUser(formData)).unwrap();

            // now fetch updated user list
            dispatch(fetchUsers());

            // reset form
            setFormData({
                name: "",
                email: "",
                password: "",
                role: "customer",
            });
        } catch (err) {
            console.error("Error creating user:", err);
        }
    };


    const handleRoleChange = (userId, newRole) => {
        dispatch(updateUser({ id: userId, role: newRole }));
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(userId));
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">User Management</h2>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {/* Add User Form */}
            <div className="p-6 rounded mb-6 border shadow-md bg-white">
                <h3 className="text-lg font-bold mb-4">Add New User</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            className="w-full p-2 border rounded"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            className="w-full p-2 border rounded"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            className="w-full p-2 border rounded"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <select
                            name="role"
                            className="w-full p-2 border rounded-lg"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                        Add User
                    </button>
                </form>
            </div>

            {/* User List */}
            <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white">
                <table className="min-w-full text-left text-gray-500">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Role</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(users) && users.length > 0 ? (
                            users.map((u) =>
                                u && u._id ? (
                                    <tr key={u._id} className="border-b hover:bg-gray-50 text-sm">
                                        <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                                            {u.name || "N/A"}
                                        </td>
                                        <td className="p-4">{u.email || "N/A"}</td>
                                        <td className="p-4">
                                            <select
                                                className="p-2 border rounded"
                                                value={u.role}
                                                onChange={(e) =>
                                                    handleRoleChange(u._id, e.target.value)
                                                }
                                            >
                                                <option value="customer">Customer</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                        <td className="p-4">
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                                onClick={() => handleDeleteUser(u._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ) : null
                            )
                        ) : (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="text-center py-4 text-gray-500 text-sm"
                                >
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
