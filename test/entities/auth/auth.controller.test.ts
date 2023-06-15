import request from 'supertest'
import app from '../../../src/app'
import validator from 'validator'
import { getUserByToken, deleteUser } from '../../../src/models/user.model'

describe('POST api/token', () => {
  it('sends a token', async () => {
    const response = await request(app)
      .post('/api/token')
      .send({ email: 'test@mail.com' })

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(validator.isJWT(response.body.token)).toBe(true)
  })

  it('requires an email', async () => {
    const response = await request(app)
      .post('/api/token')
      .send({})

    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('Email is required')
  })

  it('requires a valid email', async () => {
    const response = await request(app)
      .post('/api/token')
      .send({ email: 'spamboi@evilcorp' })

    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('Email is invalid')
  })

  it('creates a new user if email does not exist', async () => {
    await deleteUser('new@user.com')
    const response = await request(app)
      .post('/api/token')
      .send({ email: 'new@user.com' })

    const newUser = await getUserByToken(response.body.token)
    
    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(validator.isJWT(response.body.token)).toBe(true)
    expect(newUser).toBeTruthy()
  })
})