import React, { useState } from 'react'

const EditProduct = () => {
  const [productData, setproductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [
      {
        url: "http://picsum.photos/150?random=1"
      },
      {
        url: "http://picsum.photos/150?random=2"
      }
    ]
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setproductData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    console.log(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(productData)
  }

  return (
    <div className='max-w-5xl mx-auto p-6 shadow-md rounded-md'>
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="">
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input type="text" className='w-full border border-gray-300 rounded-md p-2' required onChange={handleChange} name='name' value={productData.name} />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Desciption</label>
          <textarea name="description" onChange={handleChange} value={productData.description} className='w-full border border-gray-300 rounded-md p-2' rows={4} required></textarea>
        </div>
        <div className="mb-6">
          <label className='block font-semibold mb-2'>Price</label>
          <input type="number" name="price" value={productData.price} onChange={handleChange} className='w-full border border-gray-300 p-2' />
        </div>
        <div className="mb-6">
          <label className='block font-semibold mb-2'>Count In Stock</label>
          <input type="number" name="countInStock" value={productData.countInStock} onChange={handleChange} className='w-full border border-gray-300 p-2' />
        </div>
        <div className="mb-6">
          <label className='block font-semibold mb-2'>SKU</label>
          <input type="text" name="sku" value={productData.sku} onChange={handleChange} className='w-full border border-gray-300 p-2' />
        </div>
        <div className="mb-6">
          <label className='block font-semibold mb-2'>Sizes (comma-separated)</label>
          <input type="text" name="sizes" value={productData.sizes.join(", ")} onChange={(e) => setproductData({ ...productData, sizes: e.target.value.split(",").map((size) => size.trim()) })} className='w-full border border-gray-300 p-2' />
        </div>
        <div className="mb-6">
          <label className='block font-semibold mb-2'>Colors (comma-separated)</label>
          <input type="text" name="colors" value={productData.colors.join(", ")} onChange={(e) => setproductData({ ...productData, colors: e.target.value.split(",").map((color) => color.trim()) })} className='w-full border border-gray-300 p-2' />
        </div>
        <div className="mb-6">
          <label className='block font-semibold mb-2'>Upload Image</label>
          <input
            type="file"
            name="images"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer p-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <div className="flex gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div key={index} className=''>
                <img src={image.url} alt={image.altText || "product Image"} className='w-20 h-20 object-cover rounded-md shadow-md' />
              </div>
            ))}
          </div>
        </div>
        <button type='submit' className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors'>Update Product</button>
      </form>
    </div>
  )
}

export default EditProduct
