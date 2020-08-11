import db from '../database/connection'
import convertHourToMinutes from '../utils/convertHourToMinutes'
import { Request, Response } from 'express'

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string
}

export default class ClassesController {

    async index(request: Request, response: Response) {

        const filters = request.query

        const subject = filters.subject as string
        const week_day = filters.week_day as string
        const time = filters.time as string

        if(!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(time)

        const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*'])
        
        return response.json(classes)
    }

    async create (request: Request, response: Response) {
    
        const { whatsapp, bio, subject, cost, schedule } = request.body
        const { id } = request.params
    
        const trx = await db.transaction()
    
        try {

            await trx('users').where('id', id).update({
                whatsapp, bio
            })
        
            await trx('classes').where('user_id', id).update({
                subject, cost
            })
        
            const classes = await trx('classes').where('user_id', id).select('id').first()
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id: classes.id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                }
            })

            await trx('class_schedule').where('class_id', classes.id).delete()
        
            await trx('class_schedule').insert(classSchedule)
        
            await trx.commit()
        
            return response.status(201).send()
        }
        catch (err) {
            await trx.rollback()

            console.log(err)
    
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    }

    async updateUser (request: Request, response: Response) {
    
        const { name, surname } = request.body
        const { id } = request.params
    
        try {
            if (request.file) {
                await db('users').where('id', id).update({
                    avatar: request.file.filename,
                    name, surname
                })
             }
             else {
                await db('users').where('id', id).update({
                    name, surname
                })
             }
        
            return response.status(201).send()
        }
        catch (err) {

            console.log(err)
    
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    }

    async getClasses(request: Request, response: Response) {

        const { user_id } = request.params

	    const data = await db('classes').where('classes.user_id', user_id)
            .join('class_schedule', 'class_schedule.class_id', '=', 'classes.id')
            .select(['class_schedule.*'])

        return response.json(data)
    }

    async deleteClasses(request: Request, response: Response) {

        const { id } = request.params

        try {

            await db('class_schedule').where('id', id).delete()

            return response.send()
        }
        catch (err) {
            return response.json({ error: "Error" })
        }
    }

}