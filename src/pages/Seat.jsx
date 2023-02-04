import React, { useState } from 'react';
import { FaWheelchair } from 'react-icons/fa'
import { MdOutlineWheelchairPickup } from 'react-icons/md'
import { Link } from 'react-router-dom';

function Seat({ movie, day, time, auditorium, unavailableSeats }) {

    const [seats, setSeats] = useState([])

    function updateSeats(newSeat) {
        if (seats.includes(newSeat)) {
            setSeats((current) =>
                current.filter((seat) => seat !== newSeat)
            );
        }
        else {
            seats.push(newSeat)
            setSeats([...seats])
        }
    }

    return (
        <div className='w-full h-[800px] grid grid-cols-12'>

            {/* Left pane */}
            <div className='w-full col-span-12 xl:col-span-8 bg-[#EEEEEE] p-2'>
                <div className='font-bold text-black text-[30px] text-center p-10'>Choose your seats</div>

                <div className='px-[50px]'>
                    <div className='pb-[100px] h-[20px] relative'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 746 66">
                            <path fill="#373737" d="M5.68,63.78,0,36.61A2,2,0,0,1,1.6,34.24C110.33,11.84,238.7,0,373,0S635.67,11.84,744.4,34.24A2,2,0,0,1,746,36.61l-5.64,27.17A2,2,0,0,1,738,65.33c-106.65-22-232.8-33.58-365-33.58S114.69,43.36,8,65.33A2,2,0,0,1,5.68,63.78Z"></path>
                        </svg>
                        <div className='text-bold z-5 tracking-[10px] top-[2%] left-[45%] absolute text-[10px] sm:text-[16px]'>SCREEN</div>
                    </div>

                    <div className='flex flex-col items-center space-y-4'>
                        <Row numberOfSeats={19} row='A' updateSeats={updateSeats} unavailableSeats={unavailableSeats} />
                        <Row numberOfSeats={17} row='B' updateSeats={updateSeats} unavailableSeats={unavailableSeats} />
                        <div></div>
                        <Row numberOfSeats={13} row='C' updateSeats={updateSeats} unavailableSeats={unavailableSeats} />
                        <div></div>
                        <Row numberOfSeats={15} row='D' updateSeats={updateSeats} unavailableSeats={unavailableSeats} />
                        <Row numberOfSeats={17} row='E' updateSeats={updateSeats} unavailableSeats={unavailableSeats} />
                        <Row numberOfSeats={17} row='F' updateSeats={updateSeats} unavailableSeats={unavailableSeats} />
                        <Row numberOfSeats={17} row='G' updateSeats={updateSeats} unavailableSeats={unavailableSeats} />
                    </div>
                </div>

                <div className='p-[50px] pt-[70px]'><Annotation /></div>
            </div>

            {/* Right pane */}
            <div className='col-span-12 pb-20 xl:col-span-4'>
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
                    <div className='grid grid-cols-12 pt-4 pl-4'>
                        <div className='col-span-3 flex flex-col items-center font-bold text-[16px]'>Your Seats</div>
                        <div className='col-span-9 pl-4'>
                            <SelectedSeats seats={seats} />
                        </div>
                    </div>
                </div>
                <Link to={`/${movie.id}/tickets`} state={{ day: day, time: time, auditorium: auditorium, seats: seats }}>
                    <div className='flex justify-center pt-20'>
                        <button disabled={seats.length <= 0} className={`w-[200px] h-[40px] flex flex-col justify-center items-center text-bold rounded-md text-[14px] ${seats.length > 0 ? 'bg-[#3b8ac9]' : 'bg-gray-600 cursor-not-allowed'}`}>
                            CONTINUE TO TICKET
                        </button>
                    </div>
                </Link>
            </div>
        </div>
    )
}

function Row({ numberOfSeats, row, updateSeats, unavailableSeats }) {

    const [isHover, setHover] = useState(false);

    return (
        <div className='w-full flex justify-between items-center'
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}>
            <div className='text-black'>{row}</div>
            <div className='flex space-x-2'>
                {[...Array(numberOfSeats).keys()].map(index => index).reverse().map(index => (
                    <SeatIcon key={index} row={row} number={index} isHover={isHover} updateSeats={updateSeats} unavailableSeats={unavailableSeats} />
                ))}
            </div>
            <div className='text-black'>{row}</div>
        </div>
    )
}

function SeatIcon({ row, number, isHover, updateSeats, unavailableSeats }) {

    const isAvailable = !unavailableSeats.includes(row + number)
    const [isSelected, setSelected] = useState(false)
    const [isVisible, setVisible] = useState(false)

    function handleSelect() {
        if (isAvailable) {
            setSelected(!isSelected)
            setVisible(!isVisible)
            updateSeats(row + (number + 1))
        }
    }

    return (
        <div className={`cursor-pointer w-[14px] h-[12px] sm:w-[18px] sm:h-[14px] md:w-[24px] md:h-[20px] rounded-[2px] flex items-center justify-center 
        ${!isAvailable ? 'bg-gray-400' : `${isSelected ? 'bg-green-700' : 'bg-white border border-black'}`}`}
            onClick={handleSelect}>
            {
                row !== 'C' ?
                    <div className={`text-[0px] sm:text-[9px] md:text-[11px] ${(isVisible || (isHover && !isSelected)) ? 'visible' : 'hidden'} ${(isAvailable && !isSelected) ? 'text-black' : 'text-white'}`}>
                        {number + 1}
                    </div> :
                    <div className={`font-bold text-[9px] md:text-[11px] ${(isAvailable && !isSelected) ? 'text-blue-900' : 'text-white'}`}>
                        {number % 2 === 0 ? <MdOutlineWheelchairPickup className='text-[14px]' /> : <FaWheelchair />}
                    </div>
            }
        </div>
    )
}

function Annotation() {
    return (
        <div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-y-3'>
            <div className='flex space-x-3 col-span-1'>
                <div className='bg-white w-[24px] h-[20px] border border-black rounded-[2px]'></div>
                <div className='text-black'>Available</div>
            </div>
            <div className='flex space-x-3 col-span-1'>
                <div className='bg-green-700 w-[24px] h-[20px] rounded-[2px]'></div>
                <div className='text-black'>Selected</div>
            </div>
            <div className='flex space-x-3 col-span-1'>
                <div className='bg-gray-400 w-[24px] h-[20px] rounded-[2px]'></div>
                <div className='text-black'>Unavailable</div>
            </div>
            <div className='flex space-x-3 col-span-1'>
                <div className='bg-white w-[24px] h-[20px] border border-black rounded-[2px] text-blue-900 font-bold text-[11px] flex items-center justify-center'><FaWheelchair /></div>
                <div className='text-black'>Accessible</div>
            </div>
            <div className='flex space-x-3 col-span-1'>
                <div className='bg-white w-[24px] h-[20px] border border-black rounded-[2px] text-blue-900 font-bold text-[14px] flex items-center justify-center'><MdOutlineWheelchairPickup /></div>
                <div className='text-black'>Companion</div>
            </div>
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

export default Seat
