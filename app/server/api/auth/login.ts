// @ts-nocheck
import { defineEventHandler, readBody } from 'h3'
import { getUserByEmail } from '../../../db'
import { createToken } from '../../../auth'

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) || {}
  const email = body?.email
  const password = body?.password
  if (!email || !password) {
    return { success: false, error: 'Email and password required' }
  }
  const user = getUserByEmail(email)
  if (!user) {
    return { success: false, error: 'Invalid credentials' }
  }
  const ok = await verifyPassword(password, user.password_hash)
  if (!ok) {
    return { success: false, error: 'Invalid credentials' }
  }
  const token = createToken({ id: user.id, email: user.email })
  return { token, user: { id: user.id, email: user.email } }
})
