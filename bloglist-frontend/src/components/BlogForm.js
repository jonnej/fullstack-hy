import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


class BlogForm extends React.Component {
    static PropTypes = {
      addBlogToList: PropTypes.func.isRequired,
      handleNotifications: PropTypes.func.isRequired
    }
    constructor(props) {
      super(props)
      this.state = {
        title: '',
        author: '',
        url: ''
      }

      this.addBlogToList = props.addBlogToList
      this.handleNotifications = props.handleNotifications
    }

    handleBlogFormFieldChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
    }

    createNewBlog = async (event) => {
      event.preventDefault()
      try {
        const blogObject = await blogService.create({
          title: this.state.title,
          author: this.state.author,
          url: this.state.url
        })
        this.addBlogToList(blogObject)
        this.handleNotifications(`Uusi blogi: ${blogObject.title} by ${blogObject.author} added`, null)
        this.setState({ title: '', author: '', url: '' })
      } catch (exception) {
        this.handleNotifications(null, 'Something went wrong with adding blog')
      }

    }


    render() {
      return (
        <div>
          <form onSubmit={this.createNewBlog}>
            <p>Title: <input name="title" value={this.state.title} onChange={this.handleBlogFormFieldChange} /></p>
            <p>Author: <input name="author" value={this.state.author} onChange={this.handleBlogFormFieldChange} /></p>
            <p>Url: <input name="url" value={this.state.url} onChange={this.handleBlogFormFieldChange} /></p>
            <button type="submit">New Blog</button>
          </form>
        </div>
      )
    }
}

export default BlogForm