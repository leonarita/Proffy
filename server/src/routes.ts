import express from 'express'
import { Request, Response } from 'express'
import path from 'path'
import ClassesController from './controllers/ClassesController'
import ConnectionController from './controllers/ConnectionsController'
import User from './controllers/UserController'
import multer from 'multer'
import multerConfig from './config/multer'

const authMiddleware = require('./middlewares/auth')

const routes = express.Router()

const classesController = new ClassesController()
const connectionsController = new ConnectionController()
const user = new User()

const upload = multer(multerConfig)

routes.post('/users', user.createUser)
routes.post('/login', user.authenticate)
routes.post('/forgot_password', user.forgetPassword)

routes.get('/uploads/:img', (request: Request, response: Response) => {
    return response.sendFile(path.resolve(__dirname, '..', 'uploads', request.params.img))
})

// As rotas abaixo necessitam de token

routes.use(authMiddleware).post('/profile/:id', upload.single('image'), classesController.updateUser)
routes.use(authMiddleware).post('/classes/:id', classesController.create)
routes.use(authMiddleware).get('/classes/:user_id', classesController.getClasses)
routes.use(authMiddleware).get('/classes', classesController.index)
routes.use(authMiddleware).delete('/classes/:id', classesController.deleteClasses)

routes.use(authMiddleware).get('/users/:user_id', user.getDataUser)

routes.use(authMiddleware).post('/connections', connectionsController.create)
routes.use(authMiddleware).get('/connections', connectionsController.index)

export default routes