function DateCard({ dayName, month, day, isSelected, onClick }) {
    return (
        <div className='inline-block cursor-pointer p-2' onClick={onClick}>
            <div className={isSelected ?
                'bg-white text-[#1f2834] w-[75px] h-[80px] border flex flex-col items-center uppercase rounded-md space-y-[4px] pt-[5px] pb-[7px]' :
                'w-[75px] h-[80px] border flex flex-col items-center uppercase rounded-md space-y-[4px] pt-[5px] pb-[7px]'
            }>
                <div className='text-[12px] font-semibold'>{dayName}</div>
                <div className='flex flex-col items-center space-y-[-8px]'>
                    <div className='text-[10px] font-mono'>{month}</div>
                    <div className='text-[30px] font-bold'>{day}</div>
                </div>
            </div>
        </div>
    )
}

export default DateCard;