const convertHoursToMinutes = require('../../src/utils/convertHourToMinutes')

describe('Convert hours to minutes', () => {

    it('should calculte a simple sum', () => {

        //@ts-ignore
        expect(2+2).toBe(4)
    })

    it('shoul convert hours to minutes', () => {

        //@ts-ignore
        expect(convertHoursToMinutes('12:30')).toBe(750)
    })
})