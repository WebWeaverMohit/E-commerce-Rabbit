import React from 'react'
import MensCollectionImg from '../../assets/mens-collection.webp'
import WomensCollectionImg from '../../assets/womens-collection.webp'
import { Link } from 'react-router-dom'

const GenderCollections = () => {
  return (
    <div className='py-16 px-4 lg:px-20'>
        <div className="container mx-auto flex flex-col md:flex-row gap-8">
            <div className='relative flex-1'>
                <img className='w-full h-[700px] object-cover' src={WomensCollectionImg} alt="womens-collection" />
                <div className='absolute bottom-8 left-8 bg-white opacity-90 p-4'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                        Womens Collections
                    </h2>
                    <Link to="collections/all/?gender=women" className="text-gray-900 underline">Shop now</Link>
                </div>
            </div>
             <div className='relative flex-1'>
                <img className='w-full h-[700px] object-cover' src={MensCollectionImg} alt="Mens-collection" />
                <div className='absolute bottom-8 left-8 bg-white opacity-90 p-4'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                        Mens Collections
                    </h2>
                    <Link to="collections/all/?gender=men" className="text-gray-900 underline">Shop now</Link>
                </div>
            </div>
        </div>

    </div>
  )
}

export default GenderCollections