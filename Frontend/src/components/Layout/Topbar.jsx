import React from 'react'
import {TbBrandMeta} from "react-icons/tb"
import {IoLogoInstagram} from "react-icons/io"
import {RiTwitterXLine} from "react-icons/ri"

const Topbar = () => {
  return (
    <div className='bg-[#ea2e0e] text-white'>
        <div className='conatainer mx-auto flex justify-between py-3 px-4'>
            <div className='hidden md:flex items-center space-x-4'>
                <a href="a" className='hover:text-gray-300'>
                    <TbBrandMeta className='h-5 w-5' />
                </a>
                <a href="a" className='hover:text-gray-300'>
                    <IoLogoInstagram className='h-5 w-5' />
                </a>
                <a href="a" className='hover:text-gray-300'>
                    <RiTwitterXLine className='h-4 w-4' />
                </a>
            </div>
            <div className='text-sm text-center flex-grow
            
            
            '>We ship worldwide - Fast and reliable shipping !</div>
            <div className='text-sm hidden md:block'>
                <a className='hover:text-gray-300' href="tel:+1234567890">+1 {234} 567-890</a>
            </div>
        </div>
    </div>
  )
}

export default Topbar