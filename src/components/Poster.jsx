import React from 'react'

function Poster({ movie, onClick }) {

    return (
        <div className='max-w-[180px] hover:scale-105 duration:300 cursor-pointer md:max-w-[200px]' onClick={onClick}>
            <div className='max-w-[180px] md:max-w-[200px]'>
                <img
                    className='object-cover'
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                />
            </div>

            <div className='justify-center items-center text-center pt-4'>
                <h3 className='mb-2 truncate max-w-[180px] md:max-w-[200px] font-bold'>{movie.title}</h3>
                {/* <div>Trailer</div> */}
            </div>
        </div>
    )
}

export default Poster