import express from 'express'
import { Request, Response } from 'express'
import path from 'path'
import ClassesController from './controllers/ClassesController'
import ConnectionController from './controllers/ConnectionsController'
import UserController from './controllers/UserController'
import LoginController from './controllers/LoginController'
import multer from 'multer'
import multerConfig from './config/multer'
import FavoritesController from './controllers/FavoritesController'

const authMiddleware = require('./middlewares/auth')

const routes = express.Router()

const classesController = new ClassesController()
const connectionsController = new ConnectionController()
const userController = new UserController()
const loginController = new LoginController()
const favoritesController = new FavoritesController()

const upload = multer(multerConfig)

routes.post('/users', userController.createUser)
routes.post('/login', loginController.authenticate)
routes.post('/forgot_password', loginController.forgetPassword)

routes.get('/uploads/:img', (request: Request, response: Response) => {
    return response.sendFile(path.resolve(__dirname, '..', 'uploads', request.params.img))
})

// As rotas abaixo necessitam de token

routes.use(authMiddleware).post('/profile/:id', upload.single('image'), classesController.updateUser)
routes.use(authMiddleware).post('/classes/:id', classesController.create)
routes.use(authMiddleware).get('/classes/:user_id', classesController.getClasses)
routes.use(authMiddleware).get('/classes', classesController.index)
routes.use(authMiddleware).get('/classesPag', classesController.indexPaginate)
routes.use(authMiddleware).delete('/classes/:id', classesController.deleteClasses)

routes.use(authMiddleware).get('/users/:user_id', userController.getDataUser)

routes.use(authMiddleware).post('/connections', connectionsController.create)
routes.use(authMiddleware).get('/connections', connectionsController.index)

routes.use(authMiddleware).post('/favorites/:user_id', favoritesController.create)
routes.use(authMiddleware).delete('/favorites/:user_id', favoritesController.delete)

// [MOBILE] Depois de retornar os favoritos, chamar o get /classes/:id
routes.use(authMiddleware).get('/favorites/:user_id', favoritesController.findAll)

export default routes