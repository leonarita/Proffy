import { Request, Response } from 'express'
import db from '../database/connection'

export default class ConnectionController {

    async index (request: Request, response: Response) {

        const totalConncetions = await db('connections').count('* as total')
        const { total } = totalConncetions[0]
        return response.json({ total })
    }

    async create (request: Request, response: Response) {

        const { user_id } = request.body

        await db('connections').insert({ user_id })

        return response.status(201).send()
    }

}