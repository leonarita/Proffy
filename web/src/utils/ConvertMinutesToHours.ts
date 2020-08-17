export default function convertMinutesToHours(time: string) {
    const timeNumber = parseInt(time)
    const hours = timeNumber / 60
    const minutes = timeNumber - (hours * 60)

    if (hours < 10 && minutes < 10) {
        return `0${hours}:0${minutes}`.toString()
    }
    else if (minutes < 10) {
        return `${hours}:0${minutes}`.toString()
    }
    else if (hours < 10) {
        return `0${hours}:${minutes}`.toString()
    }

    return `${hours}:${minutes}`.toString()
}