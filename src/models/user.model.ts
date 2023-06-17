import prisma from '../../prisma/prisma.client'
import jwt from 'jsonwebtoken'
import config from '../../config'

async function createUser(email: string) {
  try {
    const token = jwt.sign({ email }, config.JWT_SECRET as string, {
      expiresIn: '24h',
    })

    return await prisma.user.create({
      data: { email, token },
    })
  } catch (error) {
    console.error(error)
  }
}

async function getUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email },
    })
  } catch (error) {
    console.error(error)
  }
}

async function getUserByToken(token: string) {
  try {
    return await prisma.user.findUnique({
      where: { token },
    })
  } catch (error) {
    console.error(error)
  }
}

async function updateWordCount(email: string, wordCount: number) {
  try {
    return await prisma.user.update({
      where: { email },
      data: { wordCount },
    })
  } catch (error) {
    console.error(error)
  }
}

async function updateToken(email: string, token: string) {
  try {
    return await prisma.user.update({
      where: { email },
      data: { token },
    })
  } catch (error) {
    console.error(error)
  }
}

async function deleteUser(email: string) {
  try {
    return await prisma.user.delete({
      where: { email },
    })
  } catch (error) {
    console.error(error)
  }
}

export { getUserByEmail, getUserByToken, createUser, updateWordCount, deleteUser, updateToken }