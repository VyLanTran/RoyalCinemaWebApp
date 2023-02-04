import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import {MovieContext} from '../pages/MovieDetail'

function TimeSlot({ day, time }) {

    const movie = useContext(MovieContext);
    const auditorium = Math.floor(Math.random() * 10 + 1)
    const unavailableSeats = []
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    {[...Array(12)].map(i => {
        const row = rows[Math.floor(Math.random()*rows.length)];
        const number = Math.floor(Math.random() * 13)
        unavailableSeats.push(row + number)
    })}

    return (
        <Link to={`/${movie.id}/seat`} state={{day: day, time: time, auditorium: auditorium, unavailableSeats: unavailableSeats}}>
            <div className='w-[90px] h-[40px] bg-[#F03030] cursor-pointer rounded-md flex flex-col items-center justify-center grid-item hover:bg-[#b01616]'>
                {time}
            </div>
        </Link>
    )
}

export default TimeSlot
