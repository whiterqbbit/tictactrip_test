import { Request, Response } from 'express'
import validator from 'validator'
import { getUserByEmail, createUser } from '../../models/user.model'
import { AuthHelper } from './auth.helper'

export class AuthController {
  static async getToken (req: Request, res: Response) {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Email is invalid' })
    }

    const user = await getUserByEmail(email)

    if (!user) {
      const token = await createUser(email).then(user => user.token)
      return res.json({ token })
    } else {
      const token = await AuthHelper.renewIfExpired(user)
      return res.json({ token })
    }
  }
}

export default AuthController