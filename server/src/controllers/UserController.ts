const bcrypt = require('bcryptjs')
import { Request, Response } from 'express'
import db from '../database/connection'
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

function generateToken (params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn:86400,
    })
}

export default class UserController {
    
    async createUser(request: Request, response: Response) {

        const { name, surname, email, password } = request.body

        const hash = await bcrypt.hash(password, 10)

        try {

            if (await db('users').where('email', email).select('*'))
                return response.status(400).send({ error: 'User already exists' })
    
            const insertedUser = await db('users').insert({ 
                name, surname, email, password: hash, avatar: '', whatsapp: '', bio: ''
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

    async authenticate (request: Request, response: Response) {

        const { email, password } = request.body
        
        //const user = await User.findOne({ email }).select('+password')

        const user = await db('users').where('email', email).select('*').first()
    
        if (!user) {
            return response.status(400).send({ error: 'User not found' })
        }
    
        if (! await bcrypt.compare(password, user.password)) {
            return response.status(400).send({ error: 'Invalid password' })
        }
    
        const data_user = await db('users').where('email', email).select('users.*').first()
        
        data_user.password = undefined
    
        response.send({ token: generateToken({ id: user.id }), data_user })
    }

    async getDataUser(request: Request, response: Response) {

        const { user_id } = request.params
    
        const data_user = await db('users').where('users.id', user_id)
            .join('classes', 'classes.user_id', '=', 'users.id')
            .select('users.*', 'classes.*').first()
        
        data_user.password = undefined

        return response.json(data_user)
    }

}
