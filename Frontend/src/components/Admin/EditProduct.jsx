import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { updateProduct } from '../../redux/slices/adminProductSlice'
import { fetchProductDetails } from '../../redux/slices/productsSlice'

const EditProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { selectedProduct, loading, error } = useSelector((state) => state.products)

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
    images: []
  })

  const [uploading, setuploading] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (selectedProduct) {
      setproductData(selectedProduct)
    }
  }, [selectedProduct])

  const handleChange = (e) => {
    const { name, value } = e.target
    setproductData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("image", file)

    try {
      setuploading(true)
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      setproductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, { url: data.image, altText: "" }]

      }))
    } catch (error) {
      console.error("Image upload failed:", error)
    } finally {
      setuploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(updateProduct({ id, productData }));


    if (updateProduct.fulfilled.match(resultAction)) {
      navigate("/admin/products");
    } else {
      alert("Update failed: " + resultAction.payload);
    }
  };


  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className='max-w-5xl mx-auto p-6 shadow-md rounded-md'>
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows={4}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Count in Stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count In Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Sizes (comma-separated)</label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(", ")}
            onChange={(e) =>
              setproductData({
                ...productData,
                sizes: e.target.value.split(",").map((s) => s.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Colors (comma-separated)</label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(", ")}
            onChange={(e) =>
              setproductData({
                ...productData,
                colors: e.target.value.split(",").map((c) => c.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input
            type="file"
            name="images"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer p-2"
          />
          {uploading && <p>Uploading image...</p>}
          <div className="flex gap-4 mt-4 flex-wrap">
            {productData.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || "product"}
                className="w-20 h-20 object-cover rounded-md shadow-md"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Update Product
        </button>
      </form>
    </div>
  )
}

export default EditProduct
