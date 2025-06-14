import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PayPalButton from './PayPalButton'

const Cart = {
    products: [
        {
            name: "Stylish Jacket",
            size: "M",
            color: "Black",
            price: 120,
            image: "https://picsum.photos/500/500?random=21"
        },
        {
            name: "Casual Sneakers",
            size: "42",
            color: "White",
            price: 75,
            image: "https://picsum.photos/500/500?random=42"
        }
    ],
    totalPrice: 195
}

const CheckOut = () => {
    const navigate = useNavigate()
    const [checkOutId, setcheckOutId] = useState(null)
    const [shippingAddress, setshippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: ""
    })

    const handleCreateCheckOut = (e) => {
        e.preventDefault()
        setcheckOutId(123)
    }

    const handlePaymentSucess = (details) => {
        console.log("Payment Successful", details)
        navigate("/order-confirmation")
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>
            <div className='rounded-lg bg-white p-6'>
                <h2 className="text-2xl uppercase mb-6">Checkout</h2>
                <form onSubmit={handleCreateCheckOut}>
                    <h3 className='text-lg mb-4'>Contact Details</h3>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Email</label>
                        <input type="email" value="user@example.com" className='w-full p-2 border rounded' disabled />
                    </div>
                    <h3 className='text-lg mb-4'>Delivery</h3>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                value={shippingAddress.firstName}
                                onChange={(e) => setshippingAddress({ ...shippingAddress, firstName: e.target.value })}
                                className='w-full p-2 border rounded'
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                value={shippingAddress.lastName}
                                onChange={(e) => setshippingAddress({ ...shippingAddress, lastName: e.target.value })}
                                className='w-full p-2 border rounded'
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Address</label>
                        <input
                            onChange={(e) => setshippingAddress({ ...shippingAddress, address: e.target.value })}
                            className='w-full p-2 border rounded'
                            type="text"
                            value={shippingAddress.address}
                        />
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">City</label>
                            <input
                                type="text"
                                value={shippingAddress.city}
                                onChange={(e) => setshippingAddress({ ...shippingAddress, city: e.target.value })}
                                className='w-full p-2 border rounded'
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Postal Code</label>
                            <input
                                type="text"
                                value={shippingAddress.postalCode}
                                onChange={(e) => setshippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                                className='w-full p-2 border rounded'
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Country</label>
                        <input
                            onChange={(e) => setshippingAddress({ ...shippingAddress, country: e.target.value })}
                            className='w-full p-2 border rounded'
                            type="text"
                            value={shippingAddress.country}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Phone</label>
                        <input
                            onChange={(e) => setshippingAddress({ ...shippingAddress, phone: e.target.value })}
                            className='w-full p-2 border rounded'
                            type="tel"
                            value={shippingAddress.phone}
                        />
                    </div>
                    <div className="mt-6">
                        {!checkOutId ? (
                            <button type='submit' className='w-full bg-black text-white py-3 rounded'>
                                Continue to Payment
                            </button>
                        ) : (
                            <div >
                                <h3 className='text-lg mb-4'>Pay with Paypal</h3>
                                <PayPalButton
                                    amount={Cart.totalPrice}
                                    currency="USD"
                                    onSuccess={handlePaymentSucess}
                                    onError={() => alert("Payment Failed Try Again")}
                                />
                            </div>
                        )}
                    </div>
                </form>
            </div>

            <div className='bg-gray-50 p-6 rounded-lg'>
                <h3 className='text-lg mb-4'>Order Summary</h3>
                <div className='border-t py-4 mb-4'>
                    {Cart.products.map((product, index) => (
                        <div key={index} className='flex items-start justify-between py-2 border-b'>
                            <div className='flex items'>
                                <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4' />
                                <div>
                                    <h3 className='text-md'>{product.name}</h3>
                                    <p className='text-gray-500'>Size: {product.size}</p>
                                    <p className='text-gray-500'>Color: {product.color}</p>
                                </div>
                            </div>
                            <p className='text-xl'>${product.price?.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center text-lg mb-4">
                    <p>Subtotal</p>
                    <p>${Cart.totalPrice?.toLocaleString()}</p>
                </div>
                <div className='flex justify-between items-center text-lg'>
                    <p>Shipping</p>
                    <p>Free</p>
                </div>
                <div className='flex justify-between items-center text-lg mt-4 border-t pt-4'>
                    <p>Total</p>
                    <p>${Cart.totalPrice?.toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default CheckOut
