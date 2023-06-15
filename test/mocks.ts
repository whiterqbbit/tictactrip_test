import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'
import prisma from '../prisma/prisma.client'
import jwt from 'jsonwebtoken'

jest.mock('../prisma/prisma.client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  sign: jest.fn().mockReturnValue('mockToken'),
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
export const jwtMock = jwt as unknown as jest.Mocked<typeof jwt>