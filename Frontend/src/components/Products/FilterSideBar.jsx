import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FilterSideBar = () => {
    const [searchParams, setsearchParams] = useSearchParams()
    const navigate = useNavigate();
    const [filters, setfilters] = useState({
        category: "",
        gender: "",
        color: "",
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 100
    })
    const [priceRange, setpriceRange] = useState([0, 100])

    const categories = ["Top Wear", "Bottom Wear"]
    const colors = ["Red", "Blue", "Black", "Green", "Yellow", "Gray", "White", "Pink", "Biege", "Navy"]
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
    const materials = ["Cotton", "Wool", "Denim", "Polyster", "Silk", "Linen", "Viscose", "Fleece"]
    const brands = ["Urban Threads", "Modern Fit", "Street Style", "Beach Breeze", "Fashionista", "ChicStyle"]
    const genders = ["Men", "Women"]

    useEffect(() => {
        const params = Object.fromEntries([...searchParams])
        setfilters({
            category: params.category || "",
            gender: params.gender || "",
            color: params.color || "",
            size: params.size ? params.size.split(",") : [],
            material: params.material ? params.material.split(",") : [],
            brand: params.brand ? params.brand.split(",") : [],
            minPrice: params.minPrice || 0,
            maxPrice: params.maxPrice || 100,
        })
        setpriceRange([0, params.maxPrice || 100])
    }, [searchParams])

    const handleFilterChange = (e) => {
        const { name, value, checked, type } = e.target
        const newFilters = { ...filters }

        if (type === "checkbox") {
            if (checked) {
                newFilters[name] = [...(newFilters[name] || []), value]
            } else {
                newFilters[name] = newFilters[name].filter((item) => item !== value)
            }
        } else {
            newFilters[name] = value
        }
        setfilters(newFilters)
        updateUrlParams(newFilters)
    }

    const updateUrlParams = (newFilters) => {
        const params = new URLSearchParams()
        Object.keys(newFilters).forEach((key) => {
            if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
                params.append(key, newFilters[key].join(","))
            } else if (newFilters[key]) {
                params.append(key, newFilters[key])
            }
        })
        setsearchParams(params)
        navigate(`?${params.toString()}`)
    }

    const handlePriceChange = (e) => {
        const newPrice = e.target.value;
        setpriceRange([0, 100])
        const newFilters = {...filters, minPrice:0, maxPrice:newPrice}
        setfilters(filters)
        updateUrlParams(newFilters)
    }

    return (
        <div className='p-4 '>
            <h3 className='text-xl font-medium text-gray-800 mb-4'>Filter</h3>
            <div className="mb-6">
                <label className='block text-gray-600 font-medium '>Category</label>
                {categories.map((category) => {
                    return (
                        <div key={category} className='flex items-center mb-1'>
                            <input type="radio" value={category} onChange={handleFilterChange}
                                checked={filters.category === category}
                                name='category' className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                            <span className='text-gray-700'>{category}</span>
                        </div>
                    )
                })}
            </div>
            <div className="mb-6">
                <label className='block text-gray-600 font-medium '>Gender</label>
                {genders.map((gender) => {
                    return (
                        <div key={gender} className='flex items-center mb-1'>
                            <input value={gender} onChange={handleFilterChange}
                                checked={filters.gender === gender}
                                type="radio" name='gender' className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                            <span className='text-gray-700'>{gender}</span>
                        </div>
                    )
                })}
            </div>
            <div className="mb-6">
                <label className='block text-gray-600 font-medium mb-2'>Color</label>
                <div className='flex flex-wrap gap-2'>
                    {colors.map((color) => (
                        <button
                            value={color} onClick={handleFilterChange}
                            key={color}
                            name='color'
                            className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${filters.color === color ? "ring-2 ring-blue-500" : ""}`}
                            style={{ backgroundColor: color.toLowerCase() }}
                        ></button>
                    ))}
                </div>
            </div>
            <div className='mb-6 '>
                <label className='block text-gray-600 font-medium mb-2'>Size</label>
                {sizes.map((size) => (
                    <div className="flex items-center mb-1" key={size}>
                        <input value={size} onChange={handleFilterChange}
                            checked={filters.size.includes(size)} type="checkbox" name='size' className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300' />
                        <span className='text-gray-700'>{size}</span>
                    </div>
                ))}
            </div>
            <div className='mb-6 '>
                <label className='block text-gray-600 font-medium mb-2'>Material</label>
                {materials.map((material) => (
                    <div className="flex items-center mb-1" key={material}>
                        <input value={material} onChange={handleFilterChange}
                            checked={filters.material.includes(material)}
                            type="checkbox" name='material' className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300' />
                        <span className='text-gray-700'>{material}</span>
                    </div>
                ))}
            </div>
            <div className='mb-6 '>
                <label className='block text-gray-600 font-medium mb-2'>Brand</label>
                {brands.map((brand) => (
                    <div className="flex items-center mb-1" key={brand}>
                        <input value={brand} onChange={handleFilterChange} checked={filters.brand.includes(brand)} type="checkbox" name='brand' className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300' />
                        <span className='text-gray-700'>{brand}</span>
                    </div>
                ))}
            </div>
            <div className="mb-8">
                <label className='block text-gray-600 font-medium mb-2'>Price Range</label>
                <input type="range" name="priceRange" value={priceRange[1]} onChange={handlePriceChange} min={0} max={100} className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer' />
                <div className='flex justify-between text-gray-600 mt-2'>
                    <span>$0</span>
                    <span>$ {priceRange[1]}</span>
                </div>
            </div>
        </div>
    )
}

export default FilterSideBar
