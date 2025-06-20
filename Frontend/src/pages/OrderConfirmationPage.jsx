import React from 'react'

const checkOut = {
  _id: "12345",
  createdAt: new Date(),
  checkOutItems: [
    {
      productId: "1",
      name: "Jacket",
      color: "black",
      size: "M",
      price: 150,
      quantity: 1,
      image: "https://picsum.photos/150?random=101"
    },
    {
      productId: "2",
      name: "T-shirt",
      color: "black",
      size: "M",
      price: 100,
      quantity: 2,
      image: "https://picsum.photos/150?random=102"
    }
  ],
  shippingAddress: {
    address: "123 Fashion Street",
    city: "New York",
    country: "USA"
  }
}


const OrderConfirmationPage = () => {

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt)
    orderDate.setDate(orderDate.getDate() + 10)
    return orderDate.toLocaleDateString()
  }
  return (
    <div className='max-w-4xl mx-auto p-6 bg-white'>
      <h1 className='text-4xl font-bold text-center text-emerald-700 mb-8'>
        Thank You for Your Order !
      </h1>
      {checkOut && <div className='p-6 rounded-lg border'>
        <div className="flex justify-between mb-20">
          <div>
            <h2 className="text-xl font-semibold">Order Id: {checkOut._id}</h2>
            <p className='text-gray-500'>
              Order Date: {new Date(checkOut.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div >
            <p className="text-emerald-700 text-sm"> Estimated Delivery: {calculateEstimatedDelivery(checkOut.createdAt)}</p>
          </div>
        </div>
        <div className="mb-20">
          {checkOut.checkOutItems.map((item) => (
            <div className='flex items-center mb-4' key={item.productId}>
              <img src={item.image} alt={item.name} className='w-16 h-16 object-cover rounded-md mr-4' />
              <div>
                <h4 className='text-md font-semibold'>{item.name}</h4>
                <p className='text-sm text-gray-500'>{item.color} | {item.size}</p>
              </div>
              <div className='ml-auto text-right'>
                <p className='text-md'>${item.price}</p>
                <p className='text-sm text-gray-500'>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="">
            <h4 className='text-lg font-semibold mb-2'>Payment</h4>
            <p className='text-gray-600'>PayPal</p>
          </div>
          <div className="">
            <h4 className="text-lg font-semibold mb-2">Delivery</h4>
            <p className='text-gray-600'>{checkOut.shippingAddress.address}</p>
            <p className="text-gray-600">{checkOut.shippingAddress.city}, {" "}{checkOut.shippingAddress.country}</p>
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default OrderConfirmationPage