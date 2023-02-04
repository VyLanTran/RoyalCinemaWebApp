import React, { useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import DateCard from './DateCard'
import DATES from '../shared/dates';
import TimeSlot from './TimeSlot';

function Calendar() {

    const [selectedDate, setSelectedDate] = useState(DATES[0])

    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    const slideRight = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    const ShowTimesDetail = ({ date }) => {
        return (
            <div className='h-fit border rounded-md p-4'>
                <div className='mb-8'>
                    <div className='font-bold text-[18px] mb-4'>Standard</div>
                    <div className='grid-container'>
                        {date['showTimesStandard'].map((time, id) => {
                            return (
                                <TimeSlot key={id} day={date} time={time} />
                            )
                        })}
                    </div>
                </div>

                <div>
                    <div className='font-bold text-[18px] mb-4'>Digital 3D</div>
                    <div className='grid-container'>
                        {date['showTimes3D'].map((time, id) => {
                            return (
                                <TimeSlot key={id} day={date} time={time} />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className='relative flex items-center group'>
                <MdChevronLeft
                    onClick={slideLeft}
                    className='bg-white rounded-full absolute cursor-pointer z-10 left-[-12px]'
                    size={30}
                    color="#000000" />

                <div id={'slider'} className='overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                    {DATES.map((date, id) => {
                        return <DateCard
                            key={id}
                            dayName={date['dayName']}
                            month={date['month']}
                            day={date['day']}
                            isSelected={date === selectedDate}
                            onClick={() => setSelectedDate(date)}
                        />
                    }
                    )}
                </div>

                <MdChevronRight
                    onClick={slideRight}
                    className='bg-white rounded-full absolute cursor-pointer z-10 right-[-10px]'
                    size={30}
                    color="#000000" />
            </div>

            <div className='pt-6'>
                <ShowTimesDetail date={selectedDate} />
            </div>
        </div>
    )
}

export default Calendar
