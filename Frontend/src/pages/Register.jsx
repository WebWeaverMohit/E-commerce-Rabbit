import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import register from "../assets/register.webp"
import { registerUser } from "../redux/slices/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { mergeCart } from '../redux/slices/cartSlice'

const Register = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { user, guestId, loading } = useSelector((state) => state.auth)
    const { cart } = useSelector((state) => state.cart)

    // get redirect parameter and check if its checkout or something
    const redirect = new URLSearchParams(location.search).get("redirect") || "/"
    const isCheckoutRedirect = redirect.includes("checkout")

    useEffect(() => {
        if (user) {
            if (cart?.products.length > 0 && guestId) {
                dispatch(mergeCart({ guestId, user })).then(() => {
                    navigate(isCheckoutRedirect ? "/checkout" : "/")
                })
            } else {
                navigate(isCheckoutRedirect ? "/checkout" : "/")
            }
        }
    }, [user, guestId, cart.navigate, isCheckoutRedirect, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(registerUser({ name, email, password }))
    }

    return (
        <div className='flex '>
            <div className='w-full flex md:w-1/2 flex-col justify-center items-center p-8 md:p-12'>
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm' action="">
                    <div className='flex justify-center mb-6 '>
                        <h2 className='text-xl font-md'>Rabbit</h2>
                    </div>
                    <h2 className='text-2xl font-bold text-center mb-6'> Hey there !</h2>
                    <p className='text-center mb-6 '>
                        Enter your username and passowrd to login
                    </p>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2 ' >Name</label>
                        <input type="text" value={name} onChange={(e) => setname(e.target.value)} className='w-full border  p-2 rounded' placeholder='Enter your Name' />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2 ' >Email</label>
                        <input type="email" value={email} onChange={(e) => setemail(e.target.value)} className='w-full border  p-2 rounded' placeholder='Enter your email address' />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2'>Password</label>
                        <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} className='w-full border  p-2 rounded' placeholder='Enter your password' />
                    </div>
                    <button type='submit' className='w-full bg-black text-white rounded-lg p-2 font-semibold hover:bg-gray-800 transition'>{loading ? "loading..." : "Sign Up"}</button>
                    <p className='mt-6 text-center text-sm '>Already have an account ?
                        <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className='text-blue-500'>  Login</Link>
                    </p>
                </form>
            </div>
            <div className='hidden md:block w-1/2 bg-gray-800'>
                <div className='h-full flex flex-col justify-center items-center'>
                    <img src={register} alt="Login to Account" className='h-[750px] w-full object-cover' />
                </div>
            </div>
        </div>
    )
}

export default Register