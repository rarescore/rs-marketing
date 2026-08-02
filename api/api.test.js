import { afterEach, describe, expect, it } from 'vitest'
import audit from './audit'
import contact from './contact'

function response() {
  return { code: 200, body: null, status(code) { this.code = code; return this }, json(body) { this.body = body; return body } }
}

describe('serverless API safeguards', () => {
  afterEach(() => { delete process.env.RESEND_API_KEY })
  it('rejects private network audit targets', async () => {
    const res = response()
    await audit({ method:'POST', body:{ url:'http://127.0.0.1' } }, res)
    expect(res.code).toBe(422)
    expect(res.body.error).toMatch(/Private network/)
  })
  it('uses the safe contact fallback when email delivery is not configured', async () => {
    const res = response()
    await contact({ method:'POST', body:{ name:'Test User', email:'test@example.com', company:'Example', details:'A sufficiently clear project brief.' } }, res)
    expect(res.code).toBe(200)
    expect(res.body.needsSetup).toBe(true)
  })
})
