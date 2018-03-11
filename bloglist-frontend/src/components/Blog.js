import React from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)

    this.currentUser = props.currentUser
    this.handleLike = props.handleLike
    this.handleDelete = props.handleDelete
    this.blog = props.blog
    this.handleNotifications = props.handleNotifications
  }



  addLikeToBlog = async (event) => {
    event.preventDefault()
    try {
      const updatedBlog = await blogService.update({ ...this.blog, likes: this.blog.likes + 1 })
      this.handleLike(updatedBlog)
      this.handleNotifications('You liked the blog!', null)
    } catch (exception) {
      this.handleNotifications(null, 'something went wrong')
      console.log('error')
    }
  }

  deleteBlog = async (event) => {
    event.preventDefault()
    try {
      if (window.confirm(`Delete ${this.blog.title} by ${this.blog.author}`)) {
        await blogService.remove(this.blog)
      }
      this.handleDelete(this.blog)
      this.handleNotifications('Blog was deleted', null)
    } catch (exception) {
      this.handleNotifications(null, 'Something went wrong')
    }
  }

  delete = () => {
    if (this.blog.user === undefined) {
      return true
    } else if (this.currentUser._id === this.blog.user._id) {
      return true
    }
    return false
  }

  render() {


    const deleteButton = () => (
      <div>
        <button onClick={this.deleteBlog}>Remove blog</button>
      </div>
    )

    return (
      <div>

        <Togglable buttonLabel={`${this.blog.title} ${this.blog.author}`}>
          <div>
            <p>{this.blog.title} {this.blog.author}</p>
            <a href={`${this.blog.url}`}>{this.blog.url}</a>
            <p>{this.blog.likes} <button onClick={this.addLikeToBlog}>Like!</button></p>
            {this.delete && deleteButton()}
          </div>
        </Togglable>
      </div>
    )
  }

}
export default Blog