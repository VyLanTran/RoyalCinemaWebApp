import React from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function PaymentSuccessful() {
    return (
        <div className='flex flex-col pt-[150px] items-center space-y-16'>
            <div className='z-0 flex flex-col justify-center items-center'>
                <div className='w-[40px] h-[40px] bg-white rounded-full absolute'></div>
                <div className='z-3 absolute'><AiFillCheckCircle color='#0AC489' className='w-[80px] h-[80px]' /></div>
            </div>
            <div className='text-[#0AC489] text-[38px]'>Payment Successful</div>
            <Link to='/'>
                <div className='w-[200px] h-[50px] bg-[#0AC489] flex flex-col justify-center items-center rounded-[40px] text-[18px]'>Home</div>
            </Link>
        </div>

    )
}

export default PaymentSuccessful