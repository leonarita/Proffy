const bcrypt = require('bcryptjs')
import { Request, Response } from 'express'
import db from '../database/connection'

export default class UserController {
    
    async createUser(request: Request, response: Response) {

        const { name, surname, email, password } = request.body

        const hash = await bcrypt.hash(password, 10)

        try {
            if (await db('users').where('email', email).select('*').first())
                return response.status(400).send({ error: 'User already exists' })
    
            const insertedUser = await db('users').insert({ 
                name, surname, email, password: hash, avatar: 'avatar.jpg', whatsapp: '', bio: ''
            })

            await db('classes').insert({
                subject: '',
                cost: 0.0,
                user_id : insertedUser[0]
            })
        
            return response.json(insertedUser)
        }
        catch (err) {
            console.log(err)
    
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    }

    async getDataUser(request: Request, response: Response) {

        const { user_id } = request.params
    
        const data_user = await db('users').where('users.id', user_id)
            .join('classes', 'classes.user_id', '=', 'users.id')
            .select('users.*', 'classes.*').first()
        
        data_user.password = undefined
        data_user.avatar = `http://192.168.15.12:3333/uploads/${data_user.avatar}`

        return response.json(data_user)
    }

}
