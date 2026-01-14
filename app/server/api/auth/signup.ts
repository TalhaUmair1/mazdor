// @ts-nocheck
import { defineEventHandler, readBody } from 'h3'
import { ensureUserTable, getUserByEmail, insertUser } from '../../../db'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) || {}
  const email = body?.email
  const password = body?.password
  if (!email || !password) {
    return { success: false, error: 'Email and password required' }
  }
  ensureUserTable()
  const existing = getUserByEmail(email)
  if (existing) {
    return { success: false, error: 'User already exists' }
  }
  const hash = await hashPassword(password, 10)
  const user = insertUser(email, hash)
  return { success: true, user }
})
