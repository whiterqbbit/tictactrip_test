import express from 'express'
import type { Request, Response, NextFunction } from 'express'
import Router from './router'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('🐘')
})

app.use(Router)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction ) => {
  console.error(err)
  res.status(500).json({ error: err.message })
})

export default app