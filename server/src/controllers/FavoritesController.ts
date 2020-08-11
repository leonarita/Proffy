import db from '../database/connection'
import { Request, Response } from 'express'

export default class FavoritesController {

    async create(request: Request, response: Response) {
        const { user_id } = request.params
        const { proffy_id } = request.body

        await db('favorites').insert({ user_id, proffy_id })
        return response.send()
    }

    async delete(request: Request, response: Response) {
        const { user_id } = request.params
        const { proffy_id } = request.body

        await db('favorites').where("user_id", user_id).where("proffy_id", proffy_id).delete()
        return response.send()
    }

    async findAll(request: Request, response: Response) {
        const { user_id } = request.params

        const trx = await db.transaction()

        try {

            const proffysIds = await trx('favorites').where("favorites.user_id", user_id)
                .select("users.*", "classes.*")
                .join("users", "users.id", "=", "favorites.proffy_id")
                .join("classes", "classes.user_id", "=", "users.id")

            return response.json(proffysIds)
        }
        catch (err) {
            await trx.rollback()

            console.log(err)
    
            return response.status(400).json({
                error: 'Unexpected error while finding favorites'
            })
        }
    }
}

