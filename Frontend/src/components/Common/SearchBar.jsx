import React, { useState } from 'react';
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductsByFilters } from '../../redux/slices/productsSlice';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearchToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        dispatch(fetchProductsByFilters({ search: searchTerm }));
        navigate(`/collections/all?search=${encodeURIComponent(searchTerm)}`);

        setIsOpen(false);
    };

    return (
        <div
            className={`transition-all duration-300 ${isOpen
                    ? 'fixed top-0 left-0 w-full h-24 z-50 bg-white flex items-center justify-center px-4'
                    : 'flex items-center'
                }`}
        >
            {isOpen ? (
                <form
                    onSubmit={handleSearch}
                    className="relative w-full max-w-xl flex items-center justify-center"
                >
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-gray-100 px-4 py-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
                    />
                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                    >
                        <HiMagnifyingGlass className="h-6 w-6" />
                    </button>
                    <button
                        type="button"
                        onClick={handleSearchToggle}
                        className="absolute -right-10 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                    >
                        <HiXMark className="h-6 w-6" />
                    </button>
                </form>
            ) : (
                <button onClick={handleSearchToggle} className="ml-2">
                    <HiMagnifyingGlass className="h-6 w-6 text-gray-700" />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
