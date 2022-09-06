const average = require('../utils/for_testing').average
const supertest = require('supertest')
const Note = require('../models/note')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
	jest.setTimeout(30000)

	await Note.deleteMany({})	
	for (let note of helper.initialNotes) {
		let noteObject = new Note(note)
		await noteObject.save()
	}
})

describe('average', () => {
	test('of one value is the value itself', async () => {
		expect(average([1])).toBe(1)
	})

	test('of many is calculated right', async () => {
		expect(average([1,2,3,4,5,6])).toBe(3.5)
	})

	test('of empty array is zero', async () => {
		expect(average([])).toBe(0)
	})

	afterAll(() => {
		mongoose.connection.close()
	})
})

