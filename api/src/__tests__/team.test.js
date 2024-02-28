const dotenv = require('dotenv').config()

const db = require('../../config/test-db')
const { AddTeam, GetTeamById, UpdateTeam} = require('../domains/teams/use-cases/_index')
const TeamDatabase = require('../domains/teams/data_access/database')
const TeamRepository = require('../domains/teams/repository')
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
})
