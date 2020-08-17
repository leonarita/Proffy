import db from '../database/connection'
import { Request, Response } from 'express'

export default class FavoritesController {

    async handleToggleFavorit(request: Request, response: Response) {
        const { user_id } = request.params
        const { proffy_id } = request.body

        const trx = await db.transaction()

        try {
            const [data] = await trx('favorites').where('user_id', user_id).where('proffy_id', proffy_id).count()
            console.log(data['count(*)'])

            if (data['count(*)'] === 0) {
                await trx('favorites').insert({ user_id, proffy_id })
            }
            else
                await trx('favorites').where("user_id", user_id).where("proffy_id", proffy_id).delete()

            await trx.commit()
            return response.send()
        }
        catch (err) {
            await trx.rollback()
            return response.status(401).json({ error: err })
        }
    }

    async findAll(request: Request, response: Response) {
        const { user_id } = request.params

        const trx = await db.transaction()

        try {

/*
            const proffysIds = await trx('favorites').where("favorites.user_id", user_id)
                .select("users.*", "classes.*")
                .join("users", "users.id", "=", "favorites.proffy_id")
                .join("classes", "classes.user_id", "=", "users.id")
*/
            const proffysIds = await trx('favorites').where("favorites.user_id", user_id)
                .select("favorites.proffy_id")

            await trx.commit()

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

    async findAllComplete(request: Request, response: Response) {
        const { user_id } = request.params

        const trx = await db.transaction()

        try {


            const proffys = await trx('favorites').where("favorites.user_id", user_id)
                .select("users.*", "classes.*")
                .join("users", "users.id", "=", "favorites.proffy_id")
                .join("classes", "classes.user_id", "=", "users.id")

            await trx.commit()

            proffys.map((proffy) => {
                proffy.password = undefined
            })

            return response.json(proffys)
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

