import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, mockClear } from 'jest-mock-extended'
import jwt from 'jsonwebtoken'

export const prismaMock = mockDeep<PrismaClient>()

jest.mock('../prisma/prisma.client', () => ({
  __esModule: true,
  default: prismaMock,
}))

jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  sign: jest.fn().mockReturnValue('mockToken'),
}))

beforeEach(() => {
  // prismaMock.$disconnect.mockReset()
  // mockReset(prismaMock)
  mockClear(prismaMock)
})

export const jwtMock = jwt as unknown as jest.Mocked<typeof jwt>