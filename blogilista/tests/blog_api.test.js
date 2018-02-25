const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, format, blogsInDb, usersInDb } = require('./test_helper')


beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})


describe('Test get/api/blogs/', () => {


    test('blog list is returned as json', async () => {
        const blogsInDatabase = await blogsInDb()

        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)



        expect(response.body.length).toBe(blogsInDatabase.length)

        const returnedTitles = response.body.map(blog => blog.title)
        blogsInDatabase.forEach(blog => {
            expect(returnedTitles).toContain(blog.title)
        })
    })
})

describe('Test post/api/blogs/', () => {

    test('a valid blog can be added', async () => {

        const newBlog = {
            title: 'Korean jääkiekkomaajoukkueblogi',
            author: 'Park Kim',
            url: 'www.yle.fi',
            likes: 0
        }

        const blogsBefore = await blogsInDb()

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfter = await blogsInDb()

        expect(blogsAfter.length).toBe(blogsBefore.length + 1)
        const titles = blogsAfter.map(blog => blog.title)
        expect(titles).toContain(response.body.title)
    })

    test('when likes not given, value is zero', async () => {
        const newBlog = {
            title: 'Tykkääjät tykkää',
            author: 'Like Liker',
            url: 'www.il.fi'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfter = await blogsInDb()

        const lastBlog = blogsAfter[blogsAfter.length - 1]
        expect(lastBlog.likes).toBe(0)
    })

    test('when title and url undefined, status is 400', async () => {
        const newBlog = {
            author: 'Hovi Seppo',
            likes: 10
        }

        const blogsBefore = await blogsInDb()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAfter = await blogsInDb()

        expect(blogsAfter.length).toBe(blogsBefore.length)
    })

})


describe('when there is initially one user at db', async () => {
    beforeAll(async () => {
        await User.remove({})
        const user = new User({ username: 'root', password: 'sekret', adult: true })
        await user.save()
    })

    test('POST /api/users succeeds with a fresh username', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
            username: 'jonnej',
            name: 'Jonne J',
            password: 'salainen'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
        const usernames = usersAfterOperation.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('POST /api/users fails with username already in database', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
            username: 'root',
            name: 'Jonne J',
            password: 'salainen'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)

        expect(result.body).toEqual(['Username already in database.'])
    })

    test('POST /api/users fails with password length less than 3', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
            username: 'jouju',
            name: 'Jonne J',
            password: 'sa'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)

        expect(result.body).toEqual(['Password must be atleast 3 characters.'])
    })

})

afterAll(() => {
    server.close()
})