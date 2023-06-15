import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../../../config'
import validator from 'validator'

export class AuthController {
  static async getToken (req: Request, res: Response) {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Email is invalid' })
    }

    const token = jwt.sign({ email }, config.JWT_SECRET as string, {
      expiresIn: '24h'
    })

    return res.json({ token })
  }
}

export default AuthController