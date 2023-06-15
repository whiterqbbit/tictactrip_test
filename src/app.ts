import express from 'express'
import type { Request, Response, NextFunction } from 'express'
import Router from './router'
import morgan from 'morgan'
import helmet from 'helmet'
import { HttpError } from './utils/HttpError'

const app = express()

app.use(express.text())
  .use(morgan('tiny'))
  .use(helmet())

app.get('/', (req, res) => {
  res.send('🐘')
})

app.use(Router)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction ) => {
  if (err instanceof HttpError) res.status(err.statusCode)
  else res.status(500)
  
  console.error('ERROR:', err.message)
  res.json({ message: err.message })
})

export default app