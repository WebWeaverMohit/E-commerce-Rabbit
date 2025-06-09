import React from 'react'
import HeroImg from "../../assets/rabbit-hero.webp"
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='relative'>
            <img className='w-full h-[400px] md:h-[600px] lg:[750px] object-cover' src={HeroImg} alt="rabbit" />
            <div className='absolute inset-0 bg-black/60 flex items-center justify-center'>
                <div className='text-center text-white p-6 '>
                    <h1 className='text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4 '>Vacation <br />Ready</h1>
                    <p className='text-sm tracking-tight md:text-lg mb-6' >Explore our vacation ready outfits with fsat wordwide shipping</p>
                    <Link to="#" className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg" >Shop Now</Link>
                </div>
            </div>
        </div>
    )
}

export default Hero