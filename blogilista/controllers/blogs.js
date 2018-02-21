const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = function (blog) {
    return {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    }
}


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
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

blogsRouter.post('/', (request, response) => {
    const body = request.body
    console.log(body)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    blog
        .save()
        .then(savedBlog => {
            response.status(201).json(formatBlog(savedBlog))
        }).catch(error => {
            console.log(error)
        })
})


module.exports = blogsRouter