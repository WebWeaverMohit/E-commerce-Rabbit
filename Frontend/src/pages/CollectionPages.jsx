// --- CollectionPages.jsx ---
import React, { useEffect, useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterSideBar from '../components/Products/FilterSideBar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productsSlice';

const CollectionPages = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const sideBarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 🧠 Extract ALL query params including search, category, etc.
  useEffect(() => {
    const queryParams = Object.fromEntries([...searchParams.entries()]);
    // 🧠 Add collection to params only if it exists in the URL
    const params = collection ? { collection, ...queryParams } : queryParams;
    dispatch(fetchProductsByFilters(params));
  }, [searchParams, collection, dispatch]);

  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sideBarRef.current && !sideBarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='flex flex-col lg:flex-row relative'>
      {/* Mobile Filter Button */}
      <button
        onClick={toggleSideBar}
        className='lg:hidden border p-2 m-2 flex items-center gap-2 bg-white shadow-md rounded'
      >
        <FaFilter /> Filters
      </button>

      {/* Sidebar */}
      <div
        ref={sideBarRef}
        className={`z-50 fixed inset-y-0 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 transform 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:static lg:translate-x-0`}
      >
        <FilterSideBar />
      </div>

      {/* Main Content */}
      <div className='flex-grow w-full p-4'>
        <h2 className='text-2xl uppercase font-semibold mb-4'>All collections</h2>
        <SortOptions />
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPages;
