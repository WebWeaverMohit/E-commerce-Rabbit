import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import FilterSideBar from '../components/Products/FilterSideBar'
import SortOptions from '../components/Products/SortOptions'
import ProductGrid from '../components/Products/ProductGrid'

const CollectionPages = () => {
  const [products, setproducts] = useState([])
  const sideBarRef = useRef(null)
  const [isSidebarOpen, setisSidebarOpen] = useState(false)

  const toggleSideBar = () => {
    setisSidebarOpen(!isSidebarOpen)
  }

  const handleClickOutside = (e) => {
    if (sideBarRef.current && !sideBarRef.current.contains(e.target)) {
      setisSidebarOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        { _id: 1, name: "Product 1", price: 100, images: [{ url: "https://picsum.photos/500/500?random=7", altText: "Product 1" }] },
        { _id: 2, name: "Product 2", price: 100, images: [{ url: "https://picsum.photos/500/500?random=8", altText: "Product 2" }] },
        { _id: 3, name: "Product 3", price: 100, images: [{ url: "https://picsum.photos/500/500?random=9", altText: "Product 3" }] },
        { _id: 4, name: "Product 4", price: 100, images: [{ url: "https://picsum.photos/500/500?random=10", altText: "Product 4" }] },
        { _id: 5, name: "Product 5", price: 100, images: [{ url: "https://picsum.photos/500/500?random=11", altText: "Product 5" }] },
        { _id: 6, name: "Product 6", price: 100, images: [{ url: "https://picsum.photos/500/500?random=12", altText: "Product 6" }] },
        { _id: 7, name: "Product 7", price: 100, images: [{ url: "https://picsum.photos/500/500?random=13", altText: "Product 7" }] },
        { _id: 8, name: "Product 8", price: 100, images: [{ url: "https://picsum.photos/500/500?random=14", altText: "Product 8" }] }
      ]
      setproducts(fetchedProducts)
    }, 1000);
  }, [])

  return (
    <div className='flex flex-col lg:flex-row relative'>
      {/* Mobile Filter Button */}
      <button
        onClick={toggleSideBar}
        className='lg:hidden border p-2 flex items-center gap-2'
      >
        <FaFilter /> Filters
      </button>

      {/* Sidebar Sliding from Right */}
      <div
        ref={sideBarRef}
        className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSideBar />
      </div>
      <div className='flex-grow-0 p-4'>
        <h2 className='text-2xl uppercase mb-4'>All collectoion</h2>
        <SortOptions />
        <ProductGrid products={products} />
      </div>
    </div>
  )
}

export default CollectionPages
