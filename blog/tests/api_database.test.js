const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
	jest.setTimeout(30000)

	await Blog.deleteMany({})
	for (let blog of helper.initialBlogs) {
		const blogObj = new Blog(blog)
		await blogObj.save()
	}	
})

test('varify id property', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)

	const vlogs = await helper.blogsInDb()
	expect(vlogs[0].id).toBeDefined()
})

test('a blog can be added', async () => {
	const blog = helper.initialBlogs[0]
	await api.post('/api/blogs')
		.send(blog)
		.expect(201)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('like has default value 0', async () => {
	const blog = {
		title: "One Piece",
		author: "Luffy",
		url: "https://animixplay.com",
	}

	const returnedBlog = await api
		.post('/api/blogs')
		.send(blog)
		.expect(201)	

	expect(returnedBlog.body.likes).toEqual(0)
})

test('posting blog without title/url is handled', async () => {
	const blog = {
		author: "Luffy",
		url: "https://animixplay.com",
	}

	await api
		.post('/api/blogs')
		.send(blog)
		.expect(400)
})

test('a blog can be deleted', async () => {
	const blogsAtStart = await helper.blogsInDb()

	const blogtobeDeleted = blogsAtStart[0]
	await api
		.delete(`/api/blogs/${blogtobeDeleted.id}`)
		.expect(204)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
})

test('a blog can be updated', async () => {
	const blogs = await helper.blogsInDb()
	const willUpdate = blogs[0]
	const changedUrl = {
		title: willUpdate.title,
		author: willUpdate.author,
		url: "https://google.com",
		likes: willUpdate.likes,
	}
	const responded = await api
		.put(`/api/blogs/${willUpdate.id}`)
		.send(changedUrl)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toContainEqual(responded.body)
		
})

afterAll(() => {
	mongoose.connection.close()
})
