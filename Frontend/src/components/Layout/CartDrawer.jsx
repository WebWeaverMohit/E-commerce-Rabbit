import React from 'react';
import { IoMdClose } from 'react-icons/io';
import CartContents from '../Cart/CartContents';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const handleCheckOut = () => {
    toggleCartDrawer();
    if (!user) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 md:w-1/4 h-full bg-white border-l border-gray-700 shadow-lg z-50 flex flex-col transition-transform duration-300 transform ${drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
    >
      {/* Close Button */}
      <div className='flex justify-end p-4'>
        <button onClick={toggleCartDrawer}>
          <IoMdClose className='h-6 w-6 text-gray-600' />
        </button>
      </div>

      {/* Cart Contents */}
      <div className='flex-grow p-4 overflow-y-auto'>
        <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
        {cart && cart.products?.length > 0 ? (
          <CartContents cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p className='text-gray-600'>Your cart is empty.</p>
        )}
      </div>

      {/* Checkout Button */}
      {cart && cart.products?.length > 0 && (
        <div className='p-4 bg-white sticky bottom-0'>
          <button
            onClick={handleCheckOut}
            className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition'
          >
            Checkout
          </button>
          <p className='text-sm tracking-tighter text-gray-600 mt-2 text-center'>
            Shipping, taxes, and discount codes calculated at checkout.
          </p>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
