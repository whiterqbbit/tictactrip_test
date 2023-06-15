import { Router } from 'express'
import AuthController from './auth.controller'

const router = Router()
router.post('/token', AuthController.getToken)

export default router