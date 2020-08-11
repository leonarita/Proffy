const bcrypt = require('bcryptjs')
import { Request, Response } from 'express'
import db from '../database/connection'
import { MailtrapMailProvider } from '../providers/implementations/MailtrapMailProvider'
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

function generateToken (params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn:86400,
    })
}

export default class UserController {

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

    async forgetPassword(request: Request, response: Response) {

        const { name, email } = request.body

        try {
            const userAlreadyExists = await db('users').where('email', email).select('*').first()

            if (!userAlreadyExists) {
                throw new Error("User don't exists.")
            }

            const hash = await bcrypt.hash("123456", 10)
            await db('users').where('email', email).update('password', hash)

            const mailProvider = new MailtrapMailProvider()

            await mailProvider.sendMail({
                to: {
                    name: name,
                    email: email
                },
                from: {
                    name: 'Equipe do meu app',
                    email: 'equipe@meuapp.com'
                },
                subject: 'Restar senha da plataforma Proffy',
                body: '<p> Sua nova senha é: 123456 </p>'
            })
            
            return response.status(201).send()
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            })
        }
    }

}
