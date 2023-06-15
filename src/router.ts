import { Router } from 'express'
import authRoutes from './entities/auth/auth.router'
import justifyRoutes from './entities/justify/justify.router'
import passport from 'passport'

const router = Router()
router.use('/justify', passport.authenticate('jwt', { session: false }), justifyRoutes)

router.use(authRoutes)
router.use(justifyRoutes)

export default router