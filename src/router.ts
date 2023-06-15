import { Router } from 'express'
import justifyRoutes from './entities/justify/justify.router'

const router = Router()
router.use('/api', justifyRoutes)

export default router