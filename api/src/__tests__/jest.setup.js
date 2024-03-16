const db = require('../../config/test-db')

beforeAll(async () => {
    await db.setUp()
  })
  
  afterEach(async () => {
    await db.dropCollections()
  })
  
  afterAll(async () => {
    await db.dropDatabase()
  })