import { Router } from 'express'
import JustifyController from './justify.controller'

const router = Router()
router.post('/justify', JustifyController.justify)

export default router