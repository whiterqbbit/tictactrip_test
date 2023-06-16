import jwt from 'jsonwebtoken'
import config from '../../../config'
import { updateWordCount, updateToken } from '../../models/user.model'
import { User } from '@prisma/client'

export default class AuthHelper {
  static generateToken(email: string) {
    return jwt.sign({ email }, config.JWT_SECRET as string, { expiresIn: '24h' })
  }

  static async renewIfExpired(user: User) {
    const token = user.token
    try {
      jwt.verify(token, config.JWT_SECRET as string)
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError) {
        if (err.name === 'TokenExpiredError') {
          await updateWordCount(user.email, 0)
          const newToken = this.generateToken(user.email)
          await updateToken(user.email, newToken)
          return newToken
        }
      }
    }
    return token
  }
}

export { AuthHelper }