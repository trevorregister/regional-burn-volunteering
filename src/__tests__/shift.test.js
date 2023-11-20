const dotenv = require('dotenv').config()

const db = require('../../config/test-db')
const { AddShift, GetShiftById, Updateshift } = require('../modules/shifts/use-cases/_index')
const ShiftDatabase = require('../modules/shifts/data_access/database')
const ShiftRepository = require('../modules/shifts/repository')
const shiftDatabase = new ShiftDatabase()
const shiftRepository = new ShiftRepository(shiftDatabase)

const { AddTeam } = require('../modules/teams/use-cases/_index')
const TeamDatabase = require('../modules/teams/data_access/database')
const TeamRepository = require('../modules/teams/repository')
const teamDatabase = new TeamDatabase()
const teamRepository = new TeamRepository(teamDatabase)

const newShiftData = {
  name: 'Shift',
  description: 'Description',
  start: '2023-08-01T00:00:00.000Z',
  end: '2023-08-06T00:00:00.000Z',
  capacity: 4,
}

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
 * Shift use cases
 */
describe("Shift use cases", () => {
  it("create & save shift successfully", async () => {
    const addTeamCase = AddTeam(teamRepository)
    const team = await addTeamCase.execute(newTeamData)
    newShiftData.teamId = team._id.toHexString()
    
    const addShiftCase = AddShift(shiftRepository)
    const savedShift = await addShiftCase.execute(newShiftData)

    expect(savedShift._id).toBeDefined()
    expect(savedShift.name).toBe(newShiftData.name)
    expect(savedShift.description).toBe(newShiftData.description)
/*     expect(savedShift.start).toBe(newShiftData.start)
    expect(savedShift.end).toBe(newShiftData.end), */
    expect(savedShift.capacity).toBe(newShiftData.capacity)
  })

  it('get shift by id should return shift', async () => {
    const addTeamCase = AddTeam(teamRepository)
    const team = await addTeamCase.execute(newTeamData)
    newShiftData.teamId = team._id.toHexString()
    
    const addShiftCase = AddShift(shiftRepository)
    const savedShift = await addShiftCase.execute(newShiftData)
    const getShiftCase = GetShiftById(shiftRepository)
    const retrievedShift = await getShiftCase.execute(savedShift._id)

    expect(retrievedShift._id.toHexString()).toBe(savedShift._id.toHexString())

  })

/*   it('update shift should return 201', async () => {
    const addShiftCase = AddShift(shiftRepository)
    const savedShift = await addShiftCase.execute(newShiftData)
    const updateShiftCase = UpdateShift(shiftRepository)
    const updatedShift = await updateShiftCase.execute(savedShift._id, {name: 'New Shift'})

    //finish this
    
  }) */
})
