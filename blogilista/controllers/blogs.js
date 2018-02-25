const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const formatBlog = function (blog) {
    return {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: blog.user
    }
}

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { id: 1, username: 1, name: 1 })
    response.json(blogs.map(formatBlog))
})

blogsRouter.get('/:id', (request, response) => {
    Blog
        .findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(formatBlog(blog))
            } else {
                response.status(404).end()
            }
        }).catch(error => {
            response.status(400).send({ error: 'malformed id' })
        })
})

blogsRouter.post('/', async (request, response) => {
    try {
        const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const body = request.body
        let likeCount = 0
        if (body.likes !== undefined) {
            likeCount = body.likes
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: likeCount,
            user: user._id
        })

        if (blog.title === undefined || blog.url === undefined) {
            return response.status(400).json({ error: 'title and/or url undefined' })
        }

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(formatBlog(savedBlog))
    } catch (exception) {
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({ error: exception.message })
        } else {
            console.log(exception)
            response.status(500).json({ error: 'something went wrong...' })
        }
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        const blog = await Blog.findById(request.params.id)
        await blog.remove()
        response.status(204).end()
    } catch (exception) {
        response.status(400).json({ error: 'malformatted id' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    try {
        const body = request.body
        const updatedBlog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        }
        const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
        response.status(204).end()
    } catch (exception) {
        console.log(exception)
        response.status(400).json({ error: 'malformatted id' })
    }
})


module.exports = blogsRouter