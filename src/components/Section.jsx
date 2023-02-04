import { Link } from 'react-router-dom'
import Poster from './Poster'

function Section({ name, movies }) {

    return (
        <div className='p-6 pt-20 px-20'>
            <h1 className='font-bold text-3xl pb-4'>{name}</h1>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-14 pt-4'>
                {
                    movies.map((movie, id) => (
                        <Link key={id} to={`/${movie.id}`}>
                            <Poster movie={movie} />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Section
