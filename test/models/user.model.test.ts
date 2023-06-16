import { prismaMock, jwtMock } from '../mocks'
import { createUser, getUserByEmail, getUserByToken, updateWordCount } from '../../src/models/user.model'

describe('User functions', () => {
  function mockSign() {
    return jwtMock.sign({ email: 'test@mail.com' }, 'secret', { expiresIn: '24h' })
  }

  const mockUser = {
    id: 'uuid', 
    email: 'test@mail.com', 
    token: mockSign(),
    wordCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  it('creates user', async () => {
    prismaMock.user.create.mockResolvedValue(mockUser)

    const user = await createUser('test@mail.com')
  
    expect(prismaMock.user.create).toBeCalledWith({
      data: { email: 'test@mail.com', token: 'mockToken' },
    })
    expect(user).toEqual(mockUser)
  })
    
  it('fetches user by email', async () => {
    prismaMock.user.findUnique.mockResolvedValue(mockUser)

    const user = await getUserByEmail('test@mail.com')

    expect(prismaMock.user.findUnique).toBeCalledWith({
      where: { email: 'test@mail.com' },
    })
    expect(user).toEqual(mockUser)
  })

  it('fetches user by token', async () => {
    prismaMock.user.findUnique.mockResolvedValue(mockUser)

    const user = await getUserByToken(mockSign())
    expect(prismaMock.user.findUnique).toBeCalledWith({
      where: { token: mockSign() },
    })
    expect(user).toEqual(mockUser)
  })

  it('updates call count', async () => {
    prismaMock.user.update.mockResolvedValue(mockUser)

    const updatedUser = await updateWordCount('test@mail.com', 5)
    
    expect(prismaMock.user.update).toBeCalledWith({
      where: { email: 'test@mail.com' },
      data: { wordCount: 5 },
    })
    expect(updatedUser).toEqual(mockUser)
  })
})
