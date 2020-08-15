//@ts-ignore
module.exports = function convertHourToMinutes(time) {

    const [hour, minutes] = time.split(':').map(Number)
    const timeInMinutes = (hour * 60) + minutes
    return timeInMinutes
}