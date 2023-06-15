import request from 'supertest'
import app from '../../../src/app'
import { longText, shortQuote } from 'test/__data__/testdata'

describe('POST api/justify', () => {
  it('responds with a message', async () => {
    const response = await request(app)
      .post('/api/justify')
      .set('Content-Type', 'text/plain')
      .send('Fabien')

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('text/plain')
    expect(response.text).toBe('Fabien')
  })

  it('only accepts text/plain', async () => {
    const response = await request(app)
      .post('/api/justify')
      .set('Content-Type', 'application/json')
      .send({ name: 'Fabien' })

    expect(response.statusCode).toBe(415)
    expect(response.body.message).toBe('Invalid Content-Type. Expected text/plain.')
  })
})