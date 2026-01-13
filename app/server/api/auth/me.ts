// @ts-nocheck
import { defineEventHandler, } from 'h3'
import { verifyToken } from '../../../auth'

export default defineEventHandler(async (event) => {
  const authHeader = event.req.headers['authorization'] || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader
  const payload = token ? verifyToken(token) : null
  if (!payload) {
    // unauthorized
    event.res.statusCode = 401
    return { error: 'Unauthorized' }
  }
  return { user: { id: payload.id, email: payload.email } }
})
