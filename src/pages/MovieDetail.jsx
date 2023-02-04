import React, { createContext } from 'react'
import Calendar from '../components/Calendar'

export const MovieContext = createContext();

function MovieDetail({ movie}) {
    
    const genre_dict = {
        28: 'Action',
        12: 'Adventure',
        16: 'Animation',
        35: 'Comedy',
        80: 'Crime',
        99: 'Documentary',
        18: 'Drama',
        10751: 'Family',
        14: 'Fantasy',
        36: 'History',
        27: 'Horror',
        10402: 'Music',
        9648: 'Mystery',
        10749: 'Romance',
        878: 'Science Fiction',
        10770: 'TV Movie',
        53: 'Thriller',
        10752: 'War',
        37: 'Western'
    }

    // Movie's genre
    const genre_ids = movie.genre_ids
    const genres = genre_ids.map((id) => genre_dict[id])
    let genre_str = ''
    for (let i = 0; i < genres.length - 1; i++) {
        genre_str += genres[i] + ", "
    }
    genre_str += genres[genres.length - 1]


    return (
        <MovieContext.Provider value={movie}>
            <div>
                <div className='w-full h-[550px]'>
                    {/* Background image */}
                    <div className='w-full h-[550px]'>
                        <img className='object-cover w-full h-[550px] object-top absolute'
                            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                            alt={movie.title} />
                        <div className='bg-black/80 w-full h-[550px] z-3 absolute'></div>
                    </div>

                    {/* Overlay */}
                    <div className='absolute z-5 top-[64px] grid grid-cols-12 md:gap-[80px] place-items-center md:place-items-start items-center mx-[3%] my-[2%]'>
                        <div className='w-[350px] md:w-[300px] lg:w-[340px] col-span-12 md:col-span-2'>
                            <img
                                className='object-cover rounded-lg'
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt={movie.title}
                            />
                        </div>

                        <div className='md:col-span-2'>
                        </div>

                        <div className='col-span-12 md:col-span-8 h-[400px] md:flex items-center pt-6 md:pt-0'>
                            <div>
                                <h1 className='text-4xl font-bold my-2'>{movie.title}</h1>
                                <p className='text-sm mb-8'>
                                    {movie.release_date} • {genre_str}
                                </p>
                                <h2 className='text-xl font-bold mb-2'>Overview</h2>
                                <p className='text-md font-thin'>{movie.overview}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='h-[300px] md:h-[50px]'></div>

                <div className='p-6'>
                    <Calendar />
                </div>
            </div>


        </MovieContext.Provider>
    )
}

export default MovieDetail

