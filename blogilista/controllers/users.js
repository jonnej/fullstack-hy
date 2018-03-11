const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')



usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { id: 1, title: 1, likes: 1, url: 1, author: 1 })
    response.json(users.map(User.format))
})

usersRouter.get('/:id', (request, response) => {
    User
        .findById(request.params.id)
        .then(user => {
            if (user) {
                response.json(user)
            } else {
                response.status(404).end()
            }
        }).catch(error => {
            response.status(400).send({ error: 'malformed id' })
        })
})

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        const users = await User.find({})
        let errors = []
        console.log(body.password.length)
        if (body.password.length < 3) {
            errors = errors.concat('Password must be atleast 3 characters.')
        }

        if (users.some(user => user.username === body.username)) {
            errors = errors.concat('Username already in database.')
        }

        if (errors.length > 0) {
            return response.status(400).json(errors)
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        let adult = true
        if (body.adult !== undefined) {
            adult = body.adult
        }

        const user = new User({
            username: body.username,
            name: body.name,
            adult: adult,
            passwordHash
        })

        const savedUser = await user.save()

        response.json(savedUser)
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'error' })
    }
})

module.exports = usersRouter