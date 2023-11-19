const dotenv = require('dotenv').config()

const db = require('../../../config/test-db')
const { AddTeam, GetTeamById, UpdateTeam} = require('../../modules/teams/use-cases/_index')
const TeamDatabase = require('../../modules/teams/data_access/database')
const TeamRepository = require('../../modules/teams/repository')
const teamDatabase = new TeamDatabase()
const teamRepository = new TeamRepository(teamDatabase)

const newTeamData = {
  name: 'Team',
  description: 'Description',
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
 * Team use cases
 */
describe("Team use cases", () => {
  it("create & save team successfully", async () => {
    const addTeamCase = AddTeam(teamRepository)
    const savedTeam = await addTeamCase.execute(newTeamData)

    expect(savedTeam._id).toBeDefined()
    expect(savedTeam.name).toBe(newTeamData.name)
    expect(savedTeam.description).toBe(newTeamData.description)
  })

  it('get team by id should return team', async () => {
    const addTeamCase = AddTeam(teamRepository)
    const savedTeam = await addTeamCase.execute(newTeamData)
    const getTeamCase = GetTeamById(teamRepository)
    const retrievedTeam = await getTeamCase.execute(savedTeam._id)

    expect(retrievedTeam._id.toHexString()).toBe(savedTeam._id.toHexString())

  })

  it('update team should return 201', async () => {
    const addTeamCase = AddTeam(teamRepository)
    const savedTeam = await addTeamCase.execute(newTeamData)
    const updateTeamCase = UpdateTeam(teamRepository)
    const updatedTeam = await updateTeamCase.execute(savedTeam._id, {name: 'New Team'})

    //finish this
    
  })

/*   it('create user with duplicate email should return 400', async () => {
    try{
      const addTeamCase = AddUser(userRepository)
      await addTeamCase.execute(newTeamData)
      await addTeamCase.execute(newTeamData)
    }
    catch(err){
      expect(err.code).toBe(400)
    }
  })

  it('get user by id should return that user', async () => {
    const addTeamCase = AddUser(userRepository)
    const savedTeam = await addTeamCase.execute(newTeamData)

    const getUserCase = GetUserById(userRepository)
    const retrievedUser = await getUserCase.execute(savedTeam._id)

    expect(retrievedUser._id.toHexString()).toBe(savedTeam._id.toHexString())
    expect(retrievedUser.email).toBe(savedTeam.email)
    expect(retrievedUser.role).toBe(savedTeam.role)
  })

  it('login user with correct password should return a valid token', async () =>{
    const addTeamCase = AddUser(userRepository)
    const savedTeam = await addTeamCase.execute(newTeamData)
    const loginCase = LoginUser(userRepository)

    const loginResponse = await loginCase.execute(newTeamData.email, newTeamData.password)
    const verified = jwt.verify(loginResponse.token, process.env.JWT_SECRET)

    expect(loginResponse.token).toBeDefined()
    expect(verified.id).toBe(savedTeam._id.toHexString())

  }) */
})
