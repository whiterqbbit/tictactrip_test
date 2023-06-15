import type { NextFunction, Request, Response } from 'express'

export class JustifyController {
  static async justify(req: Request, res: Response, next: NextFunction) {
    try {
      const input = req.body.text
      if (typeof input !== 'string') {
        throw new Error('Input must be a string')
      }
      res.json({ message: `Let us justify, ${input} !` })
    } catch (error) {
      next(error)
    }
  }
}

export default JustifyController
