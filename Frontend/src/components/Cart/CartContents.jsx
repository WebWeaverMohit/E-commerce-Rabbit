import React from 'react'
import { RiDeleteBin3Line } from 'react-icons/ri'

const CartContents = () => {
    const cartProducts = [
        {
            productId: 1,
            name: "Tshirt",
            size: "M",
            color: "Red",
            quantity: 1,
            Price: 15,
            image: "https://picsum.photos/200?random=1"
        },
        {
            productId: 2,
            name: "Jeans",
            size: "L",
            color: "Blue",
            quantity: 1,
            Price: 25,
            image: "https://picsum.photos/200?random=2"
        }
    ]

    return (
        <div className='p-4'>
            {
                cartProducts.map((product, index) => (
                    <div key={index} className='flex justify-between items-start py-4 border-b'>
                        {/* Image */}
                        <img src={product.image} alt={product.name} className='w-20 h-24 object-cover rounded mr-4' />

                        {/* Product Info */}
                        <div className='flex-1'>
                            <h3 className='font-semibold'>{product.name}</h3>
                            <p className='text-sm text-gray-500'>Size: {product.size} | Color: {product.color}</p>

                            {/* Quantity Controls */}
                            <div className='flex items-center mt-2'>
                                <button className='border rounded px-2 py-1 text-xl font-medium'>-</button>
                                <span className='mx-4'>{product.quantity}</span>
                                <button className='border rounded px-2 py-1 text-xl font-medium'>+</button>
                            </div>
                        </div>

                        {/* Price + Delete */}
                        <div className='flex flex-col items-end justify-between h-full'>
                            <p className='font-semibold'>$ {product.Price.toLocaleString()}</p>
                            <button>
                                <RiDeleteBin3Line className="text-red-600 w-5 h-5 mt-4" />
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default CartContents
