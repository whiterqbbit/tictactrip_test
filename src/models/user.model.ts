import prisma from '../../prisma/prisma.client'
import jwt from 'jsonwebtoken'
import config from '../../config'

async function createUser(email: string) {
  const token = jwt.sign({ email }, config.JWT_SECRET as string, {
    expiresIn: '24h',
  })

  return await prisma.user.create({
    data: { email, token },
  })
}

async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  })
}

async function getUserByToken(token: string) {
  return await prisma.user.findUnique({
    where: { token },
  })
}

async function updateWordCount(email: string, wordCount: number) {
  return await prisma.user.update({
    where: { email },
    data: { wordCount },
  })
}

async function updateToken(email: string, token: string) {
  return await prisma.user.update({
    where: { email },
    data: { token },
  })
}

async function deleteUser(email: string) {
  return await prisma.user.delete({
    where: { email },
  })
}

export { getUserByEmail, getUserByToken, createUser, updateWordCount, deleteUser, updateToken }