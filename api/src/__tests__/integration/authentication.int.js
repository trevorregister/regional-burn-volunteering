const client = require('./setup')

describe('authentication for protected routes', () => {
//all routes except for login, logout, and account creation are behind authentication middleware
//this test just checks that the middleware is working
//checking every protected route would be redundant
    it('given a request to a protected route without a token, returns 401', async () => {
        try {
            const res = await client.teams.get('/')
        } catch (err) {
            expect(err.code).toBe(401)
        }
    })
})