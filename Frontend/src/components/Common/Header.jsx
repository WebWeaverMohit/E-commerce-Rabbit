import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div>
        {/* {Topbar} */}
        <Topbar />
        {/* {navbar} */}
        <Navbar />
        {/* {cart-drawer} */}
    </div>
  )
}

export default Header