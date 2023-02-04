import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Tickets({ movie, day, time, auditorium, seats }) {

    const [tickets, setTickets] = useState({
        adult: 0,
        child: 0,
        senior: 0
    })

    const handleClick = (type, operation) => {
        setTickets((prev) => {
            return {
                ...prev,
                [type]: operation === 'increase' ? tickets[type] + 1 : tickets[type] - 1
            }
        })
    }

    return (
        <div className='w-full h-[800px] grid grid-cols-12'>

            {/* Left pane */}
            <div className='w-full col-span-12 lg:col-span-8 bg-[#EEEEEE] p-2'>
                <div className='font-bold text-black text-[30px] text-center p-10'>Select tickets</div>

                <div className='flex flex-col items-center divide-y divide-gray-300 pt-[50px]'>
                    <div></div>
                    <TicketRow type="Adult" price="$14.50" handleClick={handleClick} tickets={tickets} maxNum={seats.length} />
                    <TicketRow type="Child" price="$8.00" handleClick={handleClick} tickets={tickets} maxNum={seats.length} />
                    <TicketRow type="Senior" price="$8.00" handleClick={handleClick} tickets={tickets} maxNum={seats.length} />
                </div>
            </div>

            {/* Right pane */}
            <div className='col-span-12 pb-20 lg:col-span-4'>
                <div className='divide-y divide-gray-600'>
                    <div className='font-bold text-[22px] font-sans pt-10 pb-6 flex flex-col items-center'>Your Summary</div>
                    <div className='grid grid-cols-12 pt-4 pl-4 pb-10'>
                        <div className='col-span-3 flex flex-col items-center'>
                            <div className='max-w-[80px]'>
                                <img
                                    className='object-cover'
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            </div>
                        </div>
                        <div className='col-span-9 pl-4'>
                            <div className='font-bold text-[18px] pb-4'>{movie.title}</div>
                            <div className='text-[14px]'><span className='text-[16px] font-bold'>At:</span>&nbsp;&nbsp;Royal Cinema - Auditorium {auditorium}</div>
                            <div className='text-[14px]'><span className='text-[16px] font-bold'>On:</span>&nbsp;&nbsp;{day.dayName}, {day.month} {day.day} - {time}</div>
                        </div>
                    </div>
                    <div className='grid grid-cols-12 py-4 pl-4'>
                        <div className='col-span-3 flex flex-col items-center font-bold'>Your Seats</div>
                        <div className='col-span-9 pl-4'>
                            <SelectedSeats seats={seats} />
                        </div>
                    </div>
                    <div className='py-4'>
                        <Bill adult={tickets.adult} child={tickets.child} senior={tickets.senior} />
                    </div>
                    <div className='pt-4 grid grid-cols-12 text-[20px] px-[30px]'>
                        <div className='col-span-9'>TOTAL</div>
                        <div className='col-span-3 text-right'>{'$'}{Number(tickets.adult * 14.50 + tickets.child * 8.00 + tickets.senior * 8.00).toFixed(2)}</div>
                    </div>
                </div>
                <Link to='/paymentsuccessful'>
                    <div className='flex justify-center pt-20'>
                        <button disabled={tickets['adult'] + tickets['child'] + tickets['senior'] !== seats.length} className={`w-[200px] h-[40px] flex flex-col justify-center items-center text-bold rounded-md text-[14px] ${tickets['adult'] + tickets['child'] + tickets['senior'] === seats.length ? 'bg-[#3b8ac9]' : 'bg-gray-600 cursor-not-allowed'}`}>
                            CHECKOUT
                        </button>
                    </div>
                </Link>
            </div>
        </div>
    )
}

function TicketRow({ type, price, handleClick, tickets, maxNum }) {

    return (
        <div className='w-[450px] sm:w-[550px] h-[100px] flex flex-row items-center text-gray-500 justify-between px-2'>
            <button
                disabled={tickets[type.toLowerCase()] <= 0}
                className={`w-[45px] h-[45px] border rounded-full text-[22px] shadow-xl 
                ${tickets[type.toLowerCase()] <= 0 ? 'border-gray-400 text-gray-400 cursor-not-allowed' : 'border-black text-black hover:bg-gray-800 hover:text-white'}`}
                onClick={() => handleClick(type.toLowerCase(), 'decrease')}
            >
                -
            </button>
            <div className='flex flex-col justify-center items-center'>
                <div className='text-[18px]'>{type}</div>
                <div>{price}</div>
            </div>
            <button
                disabled={tickets['adult'] + tickets['child'] + tickets['senior'] >= maxNum}
                className={`w-[45px] h-[45px] border rounded-full text-[22px] shadow-xl 
                ${tickets['adult'] + tickets['child'] + tickets['senior'] >= maxNum ? 'border-gray-400 text-gray-400 cursor-not-allowed' : 'border-black text-black hover:bg-gray-800 hover:text-white'}`}
                onClick={() => handleClick(type.toLowerCase(), 'increase')}
            >
                +
            </button>
        </div>
    )
}

function SelectedSeats(seats) {

    var seatArray = seats.seats
    function createArray() {
        var seatLabels = [];
        for (var i = 0; i < seatArray.length - 1; i++) {
            seatLabels.push(<div className='text-[15px]'>{seatArray[i]}&nbsp;{'-'}</div>);
        }
        seatLabels.push(<div>{seatArray[seatArray.length - 1]}</div>);
        return seatLabels;
    }

    return (
        <div className='flex space-x-1 justify-end pr-8 flex-wrap'>
            {createArray().map((seat, id) =>
                <div key={id}>{seat}</div>
            )}
        </div>
    )

}

function Bill({ adult, child, senior }) {
    return (
        <div className='flex flex-col px-[30px] space-y-1 text-[14px]'>
            <div className='grid grid-cols-12'>
                <div className='col-span-9'></div>
                <div className='col-span-3 grid grid-cols-12'>
                    <div className='col-span-2 text-center'>Qu</div>
                    <div className='col-span-4'></div>
                    <div className='col-span-6 text-right'>Price</div>
                </div>
            </div>
            <div className='grid grid-cols-12 pt-3'>
                <div className='col-span-9'>Adult</div>
                <div className='col-span-3 grid grid-cols-12'>
                    <div className='col-span-2 text-center'>{adult}</div>
                    <div className='col-span-4'></div>
                    <div className='col-span-6 text-right'>{'$'}{Number(adult * 14.50).toFixed(2)}</div>
                </div>
            </div>
            <div className='grid grid-cols-12'>
                <div className='col-span-9'>Child</div>
                <div className='col-span-3 grid grid-cols-12'>
                    <div className='col-span-2 text-center'>{child}</div>
                    <div className='col-span-4'></div>
                    <div className='col-span-6 text-right'>{'$'}{Number(child * 8.00).toFixed(2)}</div>
                </div>
            </div>
            <div className='grid grid-cols-12'>
                <div className='col-span-9'>Senior</div>
                <div className='col-span-3 grid grid-cols-12'>
                    <div className='col-span-2 text-center'>{senior}</div>
                    <div className='col-span-4'></div>
                    <div className='col-span-6 text-right'>{'$'}{Number(senior * 8.00).toFixed(2)}</div>
                </div>
            </div>
        </div>
    )
}


export default Tickets
