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
import path from 'path'

const app = express()

app.use(express.text())
  .use(express.json())
  .use(morgan('tiny'))
  .use(helmet())
  .use(passport.initialize())

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET
}

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  return done(null, jwt_payload.email)
}))

app.get('/', (req, res) => {
  res.send('🐘')
})

const swaggerDocument = YAML.load('./swagger.yml')
app.use('/api-docs', (req: Request, res: Response, next: NextFunction) => {
  const ext = path.extname(req.url)
  if (ext === '.js') {
    res.type('application/javascript')
  } else if (ext === '.css') {
    res.type('text/css')
  } else if (ext === '.html') {
    res.type('text/html')
  }
  next()
}, swaggerUi.serve, swaggerUi.setup(swaggerDocument))

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