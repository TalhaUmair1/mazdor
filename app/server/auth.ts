// @ts-nocheck
import crypto from 'node:crypto'

const SECRET = process.env.NUXT_AUTH_SECRET ?? 'mazdor_secret'

function encodeBase64(obj) {
  return Buffer.from(JSON.stringify(obj)).toString('base64')
}

function signUnsigned(unsigned) {
  return crypto.createHmac('sha256', SECRET).update(unsigned).digest()
}

export function createToken(payload) {
  const header = { alg: 'HS256', typ: 'JWT' }
  const headerB = encodeBase64(header)
  const payloadB = encodeBase64(payload)
  const unsigned = headerB + '.' + payloadB
  const signature = signUnsigned(unsigned)
  return unsigned + '.' + signature.toString('base64')
}

export function verifyToken(token) {
  try {
    const [headerB, payloadB, signature] = token.split('.')
    if (!headerB || !payloadB || !signature) return null
    const unsigned = headerB + '.' + payloadB
    const expected = signUnsigned(unsigned).toString('base64')
    if (signature !== expected) return null
    const payload = JSON.parse(Buffer.from(payloadB, 'base64').toString())
    return payload
  } catch {
    return null
  }
}

export function extractTokenFromHeader(header) {
  if (!header) return null
  return header.startsWith('Bearer ') ? header.slice(7) : header
}
