const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0
    blogs.forEach(blog => {
        total = total + blog.likes
    })
    return total
}

const favoriteBlog = (blogs) => {
    return blogs.reduce(function (prev, current) {
        return (prev.likes > current.likes) ? prev : current
    })
}

const mostBlogs = (blogs) => {

    let countedBlogs = blogs.map(function (blog) {
        return blog.author
    })
    
    countedBlogs = countedBlogs.reduce(function (allNames, name) {
        if (name in allNames) {
            allNames[name]++;
        }
        else {
            allNames[name] = 1;
        }
        return allNames;
    }, {})

    let name = ''
    let mostBlogs = 0

    for (var key in countedBlogs) {
        if (countedBlogs[key] > mostBlogs) {
            name = key
            mostBlogs = countedBlogs[key]
        }
    }
    const result = { author: name, blogs: mostBlogs }

    return result
}

const mostLikes = (blogs) => {

    let likes = {}

    blogs.forEach(blog => {
        if (blog.author in likes) {
            likes[blog.author] += blog.likes
        } else {
            likes[blog.author] = blog.likes
        }
    })

    let author = ''
    let likeCount = 0

    for (var key in likes) {
        if (likes[key] > likeCount) {
            author = key
            likeCount = likes[key]
        }
    }

    return { author: author, likes: likeCount }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}