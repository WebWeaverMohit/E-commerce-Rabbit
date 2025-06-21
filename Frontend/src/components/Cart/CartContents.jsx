import React from 'react';
import { RiDeleteBin3Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { updateCartItemQuantity, removeFromCart } from '../../redux/slices/cartSlice';

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;

    if (newQuantity < 1) {
      dispatch(removeFromCart({ productId, guestId, userId, size, color }));
    } else {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };

  return (
    <div className='p-4 space-y-6'>
      {cart.products.map((product, index) => (
        <div key={index} className='flex gap-4 items-start border-b pb-4'>
          <img
            src={product.image}
            alt={product.name}
            className='w-20 h-24 object-cover rounded'
          />

          <div className='flex-1'>
            <h3 className='font-semibold text-base'>{product.name}</h3>
            <p className='text-sm text-gray-500 mb-2'>
              Size: {product.size} | Color: {product.color}
            </p>

            <div className='flex items-center space-x-4'>
              <button
                onClick={() =>
                  handleAddToCart(
                    product.productId,
                    -1,
                    product.quantity,
                    product.size,
                    product.color
                  )
                }
                className='border rounded px-2 py-1 text-lg font-medium'
              >
                -
              </button>
              <span>{product.quantity}</span>
              <button
                onClick={() =>
                  handleAddToCart(
                    product.productId,
                    1,
                    product.quantity,
                    product.size,
                    product.color
                  )
                }
                className='border rounded px-2 py-1 text-lg font-medium'
              >
                +
              </button>
            </div>
          </div>

          <div className='flex flex-col items-end justify-between h-full'>
            <p className='font-semibold text-sm'>
              ₹ {product.price.toLocaleString()}
            </p>
            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.size,
                  product.color
                )
              }
            >
              <RiDeleteBin3Line className='text-red-600 w-5 h-5 mt-4' />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
