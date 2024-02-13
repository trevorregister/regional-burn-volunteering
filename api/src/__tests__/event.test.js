const dotenv = require('dotenv').config()

const db = require('../../config/test-db')
const { AddEvent, GetEventById, UpdateEvent } = require('../modules/events/use-cases/_index')
const EventDatabase = require('../modules/events/data_access/database')
const EventRepository = require('../modules/events/repository')
const eventDatabase = new EventDatabase()
const eventRepository = new EventRepository(eventDatabase)

const newEventData = {
  name: 'Event',
  description: 'Description',
  start: '2023-08-01T00:00:00.000Z',
  end: '2023-08-06T00:00:00.000Z',
  capacity: 2000
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
 * Event use cases
 */
describe("Event use cases", () => {
  it("create & save event successfully", async () => {
    const addEventCase = AddEvent(eventRepository)
    const savedEvent = await addEventCase.execute(newEventData)

    expect(savedEvent._id).toBeDefined()
    expect(savedEvent.name).toBe(newEventData.name)
    expect(savedEvent.description).toBe(newEventData.description)
    expect(savedEvent.start).toBeDefined()
    expect(savedEvent.end).toBeDefined()
    expect(savedEvent.capacity).toBe(newEventData.capacity)
  })

  it('get event by id should return event', async () => {
    const addEventCase = AddEvent(eventRepository)
    const savedEvent = await addEventCase.execute(newEventData)
    const getEventCase = GetEventById(eventRepository)
    const retrievedEvent = await getEventCase.execute(savedEvent._id)

    expect(retrievedEvent._id.toHexString()).toBe(savedEvent._id.toHexString())

  })

/*   it('update event should return 201', async () => {
    const addEventCase = AddEvent(eventRepository)
    const savedEvent = await addEventCase.execute(newEventData)
    const updateEventCase = UpdateEvent(eventRepository)
    const updatedEvent = await updateEventCase.execute(savedEvent._id, {name: 'New Event'})

    //finish this
    
  }) */
})
