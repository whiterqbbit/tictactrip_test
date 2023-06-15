import request from 'supertest'
import app from '../../../src/app'
import { shortQuote } from 'test/__data__/testdata'

// TODO : test length > 80000
// TODO : test correct justification

describe('POST api/justify', () => {
  let token: string

  beforeEach(async () => {
    const response = await request(app)
      .post('/api/token')
      .send({ email: 'jeanjacky@tik.tok' })

    expect(response.statusCode).toBe(200)
    token = response.body.token
  })

  it('responds with a message', async () => {
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

  it('outputs 80 characters lines', async () => {
    const response = await request(app)
      .post('/api/justify')
      .set('Content-Type', 'text/plain')
      .set('Authorization', `Bearer ${token}`)
      .send(shortQuote)

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('text/plain')

    const lines = response.text.split('\n')
    for (let i = 0; i < lines.length - 1; i++) {
      expect(lines[i].length).toBe(80)
    }
  })
})