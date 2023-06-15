import type { NextFunction, Request, Response } from 'express'
import config from '../../../config'
import { HttpError } from '../../utils/HttpError'

export class JustifyController {
  static async justify(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.headers['content-type'] !== 'text/plain') {
        throw new HttpError('Invalid Content-Type. Expected text/plain.', 415)
      }
      const textInput = req.body
      // counts the words
      const wordCount = textInput.split(' ').length
      // adds them to the user's word count and throws an error 402 if they exceed the limit
      const tokenWordCount = wordCount

      if (tokenWordCount > config.DAILY_LIMIT) {
        throw new HttpError('You have exceeded your word count limit', 402)
      }

      const splitText = textInput.split(' ').join('\n')

      res.status(200).type('text/plain').send(splitText)
    } catch (error) {
      next(error)
    }
  }
}

export default JustifyController
