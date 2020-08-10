import express from 'express'
import ClassesController from './controllers/ClassesController'
import ConnectionController from './controllers/ConnectionsController'
import User from './controllers/UserController'

const authMiddleware = require('./middlewares/auth')

const routes = express.Router()

const classesController = new ClassesController()
const connectionsController = new ConnectionController()
const user = new User()

routes.post('/users', user.createUser)
routes.post('/login', user.authenticate)
routes.post('/forgot_password', user.forgetPassword)

// As rotas abaixo necessitam de token

routes.use(authMiddleware).put('/classes/:id', classesController.create)
routes.use(authMiddleware).get('/classes/:user_id', classesController.getClasses)
routes.use(authMiddleware).get('/classes', classesController.index)

routes.use(authMiddleware).get('/users/:user_id', user.getDataUser)

routes.use(authMiddleware).post('/connections', connectionsController.create)
routes.use(authMiddleware).get('/connections', connectionsController.index)

export default routes