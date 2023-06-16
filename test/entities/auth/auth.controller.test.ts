import request from 'supertest'
import app from '../../../src/app'
import validator from 'validator'
import { getUserByToken, deleteUser } from '../../../src/models/user.model'
// import { prismaMock } from '../../mocks'
// import jwt from 'jsonwebtoken'
// import config from '../../../config'

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

  // TODO: fix this test
  // it('renews token if token is expired', async () => {
  //   const email = 'test@mail.com'
  //   const oldToken = jwt.sign({ email }, config.JWT_SECRET as string, { expiresIn: '1' })
    
  //   const mockUser = {
  //     id: 'uuid', 
  //     email, 
  //     token: oldToken,
  //     wordCount: 0,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   }

  //   await new Promise((resolve) => setTimeout(resolve, 100))
  //   prismaMock.user.update.mockResolvedValue(mockUser)

  //   const response = await request(app)
  //     .post('/api/token')
  //     .send({ email })

  //   console.log('new token', response.body.token, '\noldToken', oldToken)

  //   expect(response.statusCode).toBe(200)
  //   expect(response.type).toBe('application/json')
  //   expect(validator.isJWT(response.body.token)).toBe(true)
  //   expect(oldToken).not.toBe(response.body.token)
  // })
})