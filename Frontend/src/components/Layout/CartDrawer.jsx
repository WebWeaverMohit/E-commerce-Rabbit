import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import CartContents from '../Cart/CartContents'
import { useNavigate } from 'react-router-dom'

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
    const navigate = useNavigate()
    const handleCheckOut = () => {
        toggleCartDrawer()
        navigate("checkout")
    }

    return (
        <div className={`fixed border-l border-gray-700 top-0 right-0 w-3/4 md:w-1/4 h-full bg-white shadow-lg transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "tranlate-x-0" : "translate-x-full"}`}>
            <div className='flex flex-end p-4'>
                <button onClick={toggleCartDrawer}>
                    <IoMdClose className="h-6 w-6 text-gray-600" />
                </button>
            </div>
            <div className='flex-grow p-4 overflow-y-auto'>
                <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
                <CartContents />
            </div>
            <div className='p-4 bg-white sticky bottom-0'>
                <button onClick={handleCheckOut} className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition'>Checkoout</button>
                <p className='text-sm tracking-tighter text-gray-600 mt-2 text-center'>Shipping taxes, and discount codes calculated at checkout.</p>
            </div>
        </div>
    )
}

export default CartDrawer