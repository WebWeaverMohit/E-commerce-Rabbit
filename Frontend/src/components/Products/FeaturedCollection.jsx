import React from 'react'
import featured from "../../assets/featured.webp"
import { Link } from 'react-router-dom'

const FeaturedCollection = () => {
    return (
        <div className='py-16 px-4 lg:px-10'>
            <div className='mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-100 rounded-3xl'>
                <div className='lg:w-1/2 p-8 text-center lg:text-left'>
                    <h2 className='text-lg font-semibold text-gray-700 mb-2'>
                        Comfort and Style
                    </h2>
                    <h2 className='text-4xl lg:text-5xl font-bold mb-6'>
                        Appeal made for your everyday life
                    </h2>
                    <p className='mb-6'>Discover high quality, Comfortable clothing that effortly blends fashion and function. Designed to maken you look and feel great every day</p>
                    <Link to={"/collection/all"} className='bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800'>Shop now</Link>
                </div>
                <div className='lg:w-1/2'>
                <img src={featured} alt="Featued collection" className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl ' />
                </div>
            </div>
        </div>
    )
}

export default FeaturedCollection