const DATES = []
const NUMBER_OF_DAYS = 20

Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
}

function getDates(startDate, numberOfDays) {
    let dates = []
    let currentDate = startDate
    for (let i = 0; i < numberOfDays; i++) {
        dates.push(new Date(currentDate))
        currentDate = currentDate.addDays(1)
    }
    return dates
}

function getDateComponent(dateStr) {
    let dayName = dateStr.slice(0, 3)
    let month = dateStr.slice(4, 7)
    let fullDay = dateStr.slice(8, 10)
    let day
    fullDay[0] === '0' ? day = fullDay[1] : day = fullDay
    return { dayName, month, day }
}

function createShowTimes() {
    var possibleTimeSlots = ['11:00am', '11:30am', '11:45am', '12:00pm', '12:20pm', '12:30pm', '1:00pm', '1:30pm', '1:50pm', '2:10pm', '2:30pm', '3:00pm', '3:30pm', '3:45pm', '4:00pm', '4:20pm', '5:00pm', '5:15pm', '5:30pm', '6:00pm', '6:30pm', '6:45pm', '7:00pm', '7:20pm', '7:30pm', '8:00pm', '8:15pm', '8:30pm', '8:40pm', '9:00pm', '9:15pm', '9:30pm', '9:45pm', '10:00pm', '10:30pm', '11:00pm']
    var showTimes = []
    var numberOfSlots = Math.floor(Math.random() * (12 - 5 + 1) + 5)
    var indices = []
    for (let i = 0; i < numberOfSlots; i++) {
        do {
            var index = Math.floor(Math.random() * possibleTimeSlots.length)
        }
        while (indices.includes(index))
        indices.push(index)
        
    }
    indices.sort((a, b) => a-b)
    
    for (let i = 0; i < indices.length; i++) {
        showTimes.push(possibleTimeSlots[indices[i]])
    }

    return showTimes
}
createShowTimes()

// startDate is today
var startDate = new Date()
var releaseDates = getDates(startDate, NUMBER_OF_DAYS)

releaseDates.forEach(date => {
    var dateStr = date.toString().slice(0, 10)
    var { dayName, month, day } = getDateComponent(dateStr)

    DATES.push(
        {
            dayName: dayName,
            month: month,
            day: day,
            showTimesStandard: createShowTimes(),
            showTimes3D: createShowTimes()
        }
    )
})

export default DATES;