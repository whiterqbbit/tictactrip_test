import express from 'express'
import type { Request, Response, NextFunction } from 'express'
import Router from './router'
import morgan from 'morgan'
import helmet from 'helmet'
import { HttpError } from './utils/HttpError'
import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import config from '../config'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import cors from 'cors'

const app = express()

app.use(express.text())
  .use(express.json())
  .use(morgan('tiny'))
  .use(passport.initialize())
  .use(cors())
  .use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ['\'self\'', 'https:', 'http:', 'data:', 'blob:'],
        scriptSrc: ['\'self\'', '\'unsafe-inline\'', '\'unsafe-eval\'', 'https:', 'http:'],
        styleSrc: ['\'self\'', '\'unsafe-inline\'', 'https:', 'http:'],
        imgSrc: ['\'self\'', 'data:', 'https:', 'http:'],
        fontSrc: ['\'self\'', 'https:', 'http:', 'data:']
      },
    },
  }))
  
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET
}

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  return done(null, jwt_payload.email)
}))

app.set('trust proxy', true)

app.get('/', (req, res) => {
  res.send('🐘')
})

const swaggerDocument = YAML.load('./swagger.yml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api', Router)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction ) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode)
  } else {
    res.status(500)
  } 

  console.error('ERROR:', err.message)
  res.json({ error: err.message })
})

export default app