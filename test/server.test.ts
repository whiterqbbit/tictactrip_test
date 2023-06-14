import request from 'supertest'
import app from '../src/app'

describe('GET /', () => {
  it('responds with 🐘', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
    expect(response.text).toBe('🐘')
  })
})
