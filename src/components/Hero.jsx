import { Link } from '@mui/material'
import React from 'react'

const Hero = ({ movie }) => {
    return (
        <div className='w-full max-h-[600px] relative'>
            {/* Poster */}
            <div>
                <div className='absolute w-full h-[600px] bg-gradient-to-r from-black'></div>
                <img className='h-fit w-full object-cover'
                    src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                    alt={movie?.title} />
            </div>

            {/* Info on the poster */}
            <div className='absolute w-full top-[30%] left-[10%]'>
                {/* Title */}
                <h1 className='text-lg sm:text-2xl md:text-3xl lg:text-5xl font-bold pb-5'>{movie?.title}</h1>
            </div>
        </div>
    )
}

export default Hero
