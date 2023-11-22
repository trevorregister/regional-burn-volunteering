const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')

const db = require('../../config/test-db')
const { AddUser, GetUserById, LoginUser, GetUsers} = require('../modules/users/use-cases/_index')
const UserDatabase = require('../modules/users/data_access/database')
const UserRepository = require('../modules/users/repository')
const userDatabase = new UserDatabase()
const userRepository = new UserRepository(userDatabase)

const randomNumber = Math.floor(Math.random()*100)
const newUserData = {
  name: "User".concat(randomNumber),
  email: "User".concat(randomNumber,'@email.com'),
  password: 'password',
  role: 'user'
}

beforeAll(async () => {
  await db.setUp()
})

afterEach(async () => {
  await db.dropCollections()
})

afterAll(async () => {
  await db.dropDatabase()
})


/**
 * User user cases
 */
describe("User use cases", () => {
  it("create & save user successfully", async () => {
    const addUserCase = AddUser(userRepository)
    const savedUser = await addUserCase.execute(newUserData)

    expect(savedUser._id).toBeDefined()
    expect(savedUser.email).toBe(newUserData.email)
    expect(savedUser.role).toBe(newUserData.role)
    expect(savedUser.hash).toBeDefined()
  })

  it('create user with duplicate email should return 400', async () => {
    try{
      const addUserCase = AddUser(userRepository)
      await addUserCase.execute(newUserData)
      await addUserCase.execute(newUserData)
    }
    catch(err){
      expect(err.code).toBe(400)
    }
  })

  it('get user by id should return that user', async () => {
    const addUserCase = AddUser(userRepository)
    const savedUser = await addUserCase.execute(newUserData)

    const getUserCase = GetUserById(userRepository)
    const retrievedUser = await getUserCase.execute(savedUser._id)

    expect(retrievedUser._id.toHexString()).toBe(savedUser._id.toHexString())
    expect(retrievedUser.email).toBe(savedUser.email)
    expect(retrievedUser.role).toBe(savedUser.role)
  })

  it('login user with correct password should return a valid token', async () =>{
    const addUserCase = AddUser(userRepository)
    const savedUser = await addUserCase.execute(newUserData)
    const loginCase = LoginUser(userRepository)

    const loginResponse = await loginCase.execute(newUserData.email, newUserData.password)
    const verified = jwt.verify(loginResponse.token, process.env.JWT_SECRET)

    expect(loginResponse.token).toBeDefined()
    expect(verified.id).toBe(savedUser._id.toHexString())

  })
})
