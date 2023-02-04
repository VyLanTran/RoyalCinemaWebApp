import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

// Navbar layout for screen sizes that are at least 'lg'
const NavbarShow = () => {

    const { user, logOut } = UserAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logOut();
            navigate('/')
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='bg-[#0f1a28] h-[64px] flex items-center justify-between px-7 w-full fixed top-0 z-10'>
            {/* Logo */}
            <Link to='/'>
                <h1 className='text-[#3b8ac9] font-bold text-md md:text-lg lg:text-2xl'>ROYAL CINEMA</h1>
            </Link>

            {/* Links to other pages */}
            <div className='flex space-x-20'>
                {/* <Link to='/'><p className='text-sm'>MOVIES</p></Link> */}
                {/* <Link to='/food'><p className='text-sm'>FOOD & DRINKS</p></Link>
                <Link to='/contact'><p className='text-sm'>CONTACT</p></Link> */}
            </div>

            {
                user?.email ?
                    (<div>
                        <Link to='/account'><button className='text-white text-sm pr-4'>Account</button></Link>
                        <button onClick={handleLogout} className='bg-[#3b8ac9] text-sm text-white px-6 py-2 rounded'>Logout</button>
                    </div>) :
                    (<div>
                        <Link to='/signin'><button className='text-white text-sm pr-4'>Sign In</button></Link>
                        <Link to='signup'><button className='bg-[#3b8ac9] text-sm text-white px-6 py-2 rounded'>Sign Up</button></Link>
                    </div>)
            }
        </div>
    )
}

export default NavbarShow
