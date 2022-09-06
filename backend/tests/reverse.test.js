const reverse = require('../utils/for_testing').reverse
const mongoose = require('mongoose')
const Note = require('../models/note')
const helper = require('./test_helper')
const supertest = require('supertest')
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

test('reverse of a', () => {
	const result = reverse('a')

	expect(result).toBe('a')
})

test('reverse of react', () => {
	const result = reverse('react')

	expect(result).toBe('tcaer')
})

test('reverse of releveler', () => {
	const result = reverse('releveler')

	expect(result).toBe('releveler')
})

test('reverse of saippuakuappias', () => {
	const result = reverse('saippuakuappias')

	expect(result).toBe('saippaukauppias')
})

afterAll(() => {
	mongoose.connection.close()
})
