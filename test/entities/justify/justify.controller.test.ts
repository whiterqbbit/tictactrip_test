import request from 'supertest'
import app from '../../../src/app'
import { shortQuote, longText } from 'test/__data__/testdata'
import { updateWordCount } from '../../../src/models/user.model'

describe('POST api/justify', () => {
  let token: string
  
  beforeEach(async () => {
    const response = await request(app)
      .post('/api/token')
      .send({ email: 'test@mail.com' })
    await updateWordCount('test@mail.com', 0)
    
    expect(response.statusCode).toBe(200)
    token = response.body.token
  })

  it('returns back single words', async () => {
    const response = await request(app)
      .post('/api/justify')
      .set('Content-Type', 'text/plain')
      .set('Authorization', `Bearer ${token}`)
      .send('Fabien')

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('text/plain')
    expect(response.text).toBe('Fabien')
  })

  it('only accepts text/plain', async () => {
    const response = await request(app)
      .post('/api/justify')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Fabien' })

    expect(response.statusCode).toBe(415)
    expect(response.body.error).toBe('Invalid Content-Type. Expected text/plain.')
  })

  it('responds with 401 when no token is provided', async () => {
    const response = await request(app)
      .post('/api/justify')
      .set('Content-Type', 'text/plain')
      .send('Test')

    expect(response.statusCode).toBe(401)
  })

  it('responds with 401 when token is invalid', async () => {
    const response = await request(app)
      .post('/api/justify')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer nonexistenttoken')
      .send({ name: 'Fabien' })

    expect(response.statusCode).toBe(401)
  })
  
  it('responds with 402 when daily limit is exceeded', async () => {
    await updateWordCount('test@mail.com', 79999)
    const response = await request(app)
      .post('/api/justify')
      .set('Content-Type', 'text/plain')
      .set('Authorization', `Bearer ${token}`)
      .send(longText)

    expect(response.statusCode).toBe(402)
    expect(response.body.error).toBe('You have exceeded your daily limit')
  })

  it('outputs 80 characters lines', async () => {
    const response = await request(app)
      .post('/api/justify')
      .set('Content-Type', 'text/plain')
      .set('Authorization', `Bearer ${token}`)
      .send(shortQuote)

    const lines = response.text.split('\n')
    for (let i = 0; i < lines.length - 1; i++) {
      expect(lines[i].length).toBe(80)
    }
  })

  it('should not have space at the beggining or end of lines', async () => {
    const response = await request(app)
      .post('/api/justify')
      .set('Content-Type', 'text/plain')
      .set('Authorization', `Bearer ${token}`)
      .send(' ' + longText + ' \n ')

    const lines = response.text.split('\n')
    for (let i = 0; i < lines.length - 1; i++) {
      const line = lines[i]
      expect(line[0]).not.toBe(' ')
      expect(line[line.length - 1]).not.toBe(' ')
    }
  })

  it('should be evenly justified', async () => {
    const response = await request(app)
      .post('/api/justify')
      .set('Content-Type', 'text/plain')
      .set('Authorization', `Bearer ${token}`)
      .send(longText)

    const lines = response.text.split('\n')

    // For each line, find if some space sequences have a difference greater than 1
    for (const line of lines) {
      // Get array of space sequences lengths
      const spaceSequences = line.split(/[^\s]/).filter(Boolean).map(s => s.length) 
      spaceSequences.sort((a, b) => a - b)

      const min = spaceSequences[0]
      const max = spaceSequences[spaceSequences.length - 1]

      expect(max - min).toBeLessThanOrEqual(1)
    }
  })

  it('removes extra spaces and line breaks from input', async () => {
    const response = await request(app)
      .post('/api/justify')
      .set('Content-Type', 'text/plain')
      .set('Authorization', `Bearer ${token}`)
      .send('.................\n\n....       .....  ....\n \n........\nFabien      est \n     la\n\n...............  ')

    expect(response.text).toBe('................. .... ..... .... ........ Fabien est la ...............')
  })
})