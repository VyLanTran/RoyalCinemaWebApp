import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RxTextAlignJustify } from 'react-icons/rx'
import { UserAuth } from '../context/AuthContext'

// Navbar layout for 'xs' and 'md' screen sizes 
const NavbarHide = () => {

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

    const [isOpen, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!isOpen)
    }

    return (
        <div>
            <div className='bg-[#0f1a28] h-[64px] flex items-center justify-between px-7 w-full fixed top-0 z-10'>
                {/* Logo */}
                <Link to='/'>
                    <h1 className='text-[#3b8ac9] font-bold text-md md:text-lg lg:text-2xl'>ROYAL CINEMA</h1>
                </Link>

                {/* Toggle button */}
                <button type='button' onClick={handleToggle}>
                    <RxTextAlignJustify color='white' size={30} />
                </button>
            </div>

            {/* Show links to other pages if user clicks on the toggle button */}
            <div className='flex justify-end pt[64px]'>
                <div className={isOpen ? 'bg-[#0f1a28] h-auto w-auto z-10 fixed' : 'hidden'}>
                    {/* <Link to='/'><div className='nav-item'>MOVIES</div></Link> */}
                    {/* <Link to='/food'><p className='nav-item'>FOOD & DRINKS</p></Link>
                    <Link to='/contact'><p className='nav-item'>CONTACT</p></Link> */}

                    {
                        user?.email ?
                            (<div>
                                <Link to='/account'><div className='nav-item'>ACCOUNT</div></Link>
                                <div onClick={handleLogout} className='nav-item'>LOGOUT</div>
                            </div>) :
                            (<div>
                                <Link to='/signin'><div className='nav-item'>SIGN IN</div></Link>
                                <Link to='/signup'><div className='nav-item'>SIGN UP</div></Link>
                            </div>)
                    }

                </div>
            </div>
        </div>
    )
}

export default NavbarHide
