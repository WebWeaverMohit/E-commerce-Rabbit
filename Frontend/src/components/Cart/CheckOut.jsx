import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCheckout,
  markCheckoutPaid,
  finalizeCheckout,
} from "../../redux/slices/checkoutSlice";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";

const CheckOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { checkout, loading, error } = useSelector((state) => state.checkout);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (!cart?.products?.length) {
      navigate("/");
    }
  }, [cart]);

  const handleCheckout = async (e) => {
    e.preventDefault();

    const res = await dispatch(
      createCheckout({
        checkoutItems: cart.products,
        shippingAddress,
        paymentMethod: "PayPal",
        totalPrice: cart.totalPrice,
      })
    );

    if (res.payload?._id) {
      console.log("Checkout created with ID:", res.payload._id);
    }
  };

  const handlePaymentSuccess = async (paymentDetails) => {
    if (!checkout?._id) return;

    await dispatch(
      markCheckoutPaid({
        checkoutId: checkout._id,
        paymentDetails,
      })
    );

    await dispatch(finalizeCheckout(checkout._id));

    navigate("/order-confirmation");
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* FORM */}
      <form onSubmit={handleCheckout} className="bg-white p-6 rounded">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        <input
          type="text"
          placeholder="First Name"
          required
          value={shippingAddress.firstName}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, firstName: e.target.value })
          }
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          type="text"
          placeholder="Last Name"
          required
          value={shippingAddress.lastName}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, lastName: e.target.value })
          }
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          type="text"
          placeholder="Address"
          required
          value={shippingAddress.address}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, address: e.target.value })
          }
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          type="text"
          placeholder="City"
          required
          value={shippingAddress.city}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, city: e.target.value })
          }
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          type="text"
          placeholder="Postal Code"
          required
          value={shippingAddress.postalCode}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
          }
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          type="text"
          placeholder="Country"
          required
          value={shippingAddress.country}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, country: e.target.value })
          }
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          type="text"
          placeholder="Phone"
          required
          value={shippingAddress.phone}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, phone: e.target.value })
          }
          className="w-full border p-2 mb-4 rounded"
        />

        {!checkout ? (
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-3 px-6 rounded w-full mt-4"
          >
            {loading ? "Processing..." : "Continue to Payment"}
          </button>
        ) : (
          <div className="mt-6">
            <h3 className="text-lg mb-2">Pay with PayPal</h3>
            <PayPalButton
              amount={cart.totalPrice}
              currency="USD"
              onSuccess={handlePaymentSuccess}
              onError={() => alert("Payment Failed")}
            />
          </div>
        )}

        {error && <p className="text-red-600 mt-4">{error}</p>}
      </form>

      {/* ORDER SUMMARY */}
      <div className="p-6 bg-gray-50 rounded">
        <h3 className="text-lg mb-4 font-semibold">Order Summary</h3>
        {cart.products.map((item) => (
          <div
            key={item._id}
            className="flex items-start gap-4 mb-6 border-b pb-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-24 object-cover rounded"
              onError={(e) => (e.target.src = "/placeholder.png")} // fallback image
            />
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">
                Size: {item.size} | Color: {item.color}
              </p>
              <p className="text-sm mt-1 text-gray-800 font-medium">
                ${item.price}
              </p>
            </div>
          </div>
        ))}

        <div className="mt-4 flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>${cart.totalPrice?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
