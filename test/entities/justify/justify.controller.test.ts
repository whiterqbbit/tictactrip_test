import request from 'supertest'
import app from '../../../src/app'

describe('POST api/justify', () => {
  it('responds with a message', async () => {
    const response = await request(app)
      .post('/api/justify')
      .send({ text: 'Fabien' })
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Let us justify, Fabien !')
  })

  it('responds with an error', async () => {
    const response = await request(app)
      .post('/api/justify')
      .send({ text: 123 })
    expect(response.statusCode).toBe(500)
    console.log((response.text))
    expect(response.body.error).toBe('Input must be a string')
  })
})