import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const OrderDetailsPage = () => {
    const { id } = useParams()
    const [orderDetails, setorderDetails] = useState(null)

    useEffect(() => {
        const mockOrderDetails = {
            _id: id,
            createdAt: new Date(),
            isPaid: true,
            isDelivered: false,
            paymentMethod: "PayPal",
            shippingMethod: "Standard",
            shippingAddress: { city: "New York", country: "USA" },
            orderItems: [
                {
                    productId: "1",
                    name: "Jacket",
                    price: 120,
                    quantity: 1,
                    image: "https://picsum.photos/150?random=1"
                },
                {
                    productId: "2",
                    name: "Shirt",
                    price: 150,
                    quantity: 1,
                    image: "https://picsum.photos/150?random=2"
                }
            ]
        }
        setorderDetails(mockOrderDetails)
    }, [id])

    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>

            {!orderDetails ? (
                <p>No Order details found</p>
            ) : (
                <div className='p-6 rounded border shadow-md bg-white'>
                    <div className="flex flex-col sm:flex-row justify-between mb-8">
                        <div>
                            <h3 className='text-lg md:text-xl font-semibold'>Order ID: #{orderDetails._id}</h3>
                            <p className="text-gray-600">
                                {new Date(orderDetails.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
                            <span className={`${orderDetails.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                                {orderDetails.isPaid ? "Approved" : "Pending"}
                            </span>
                            <span className={`${orderDetails.isDelivered ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"} px-3 py-1 rounded-full text-sm font-medium`}>
                                {orderDetails.isDelivered ? "Delivered" : "Pending Delivery"}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
                            <p>Method: <span className='text-gray-700'>{orderDetails.paymentMethod}</span></p>
                            <p>Status: <span className='text-gray-700'>{orderDetails.isPaid ? "Paid" : "Unpaid"}</span></p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
                            <p>Method: <span className='text-gray-700'>{orderDetails.shippingMethod}</span></p>
                            <p>Address: <span className='text-gray-700'>{`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}</span></p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <h4 className='text-lg font-semibold mb-4'>Products</h4>
                        <table className="min-w-full border text-gray-700 text-sm">
                            <thead className="bg-gray-100 border-b">
                                <tr>
                                    <th className='text-left px-4 py-3'>Product</th>
                                    <th className='text-left px-4 py-3'>Unit Price</th>
                                    <th className='text-left px-4 py-3'>Quantity</th>
                                    <th className='text-left px-4 py-3'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.orderItems.map((item) => (
                                    <tr key={item.productId} className='border-b hover:bg-gray-50'>
                                        <td className="px-4 py-3 flex items-center gap-3">
                                            <img className='w-12 h-12 rounded object-cover' src={item.image} alt={item.name} />
                                            <Link to={`/product/${item.productId}`} className='text-blue-600 hover:underline'>
                                                {item.name}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                                        <td className="px-4 py-3">{item.quantity}</td>
                                        <td className="px-4 py-3 font-medium">${(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Link to="/my-orders" className='text-blue-500 hover:underline'>Back to my orders</Link>
                </div>
            )}
        </div>
    )
}

export default OrderDetailsPage
