import type { NextFunction, Request, Response } from 'express'
import config from '../../../config'
import { HttpError } from '../../utils/HttpError'
import helper from './justify.helper'
import { getUserByToken, updateWordCount } from '../../models/user.model'

export class JustifyController {
  static async justify(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.headers['content-type'] !== 'text/plain') {
        throw new HttpError('Invalid Content-Type. Expected text/plain.', 415)
      }
      const token = req.headers.authorization?.split(' ')[1] as string
      const user = await getUserByToken(token)
      
      const textInput = req.body
      const inputWordCount = textInput.split(' ').length
      const newWordCount = user!.wordCount + inputWordCount
      
      if (newWordCount > config.DAILY_LIMIT) {
        throw new HttpError('You have exceeded your daily limit', 402)
      }

      const justifiedText = helper.justify(textInput)
      await updateWordCount(user!.email, newWordCount)

      res.status(200).type('text/plain').send(justifiedText)
    } catch (error) {
      next(error)
    }
  }
}

export default JustifyController
