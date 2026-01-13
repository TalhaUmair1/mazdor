// @ts-nocheck
export async function setUserSession(event: any, payload: any) {
  try {
    const user = payload?.user
    const session = {
      user,
      loggedInAt: payload?.loggedInAt ?? Date.now(),
    }
    const json = JSON.stringify(session)
    const token = Buffer.from(json).toString('base64')

    // Simple cookie-based session for server responses
    const cookie = `mazdor_session=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}`
    if (event?.node?.res?.setHeader) {
      event.node.res.setHeader('Set-Cookie', cookie)
    }
    return token
  } catch (e) {
    console.error('Auth session error', e)
    throw e
  }
}
