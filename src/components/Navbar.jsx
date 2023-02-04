import React, { useEffect, useState } from 'react'
import NavbarHide from './NavbarHide';
import NavbarShow from './NavbarShow';

const Navbar = () => {

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener('resize', handleWindowResize)

        return () => window.removeEventListener('resize', handleWindowResize)
    }, []);

    return (
        width < 1024 ? <NavbarHide /> : <NavbarShow />
    )
}

export default Navbar
