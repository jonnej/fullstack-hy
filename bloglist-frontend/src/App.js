import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      message: null,
      error: null,
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }


  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      this.setState({ username: '', password: '', user })
      this.setState({ message: 'Kirjautuminen onnistui' })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)

    } catch (exception) {
      this.setState({ error: 'käyttäjätunnus tai salasana virheellinen' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({ user: null })
  }

  addBlogToList = (blog) => {
    this.setState({ blogs: this.state.blogs.concat(blog) })
  }

  handleLike = (likedBlog) => {
    this.setState({ blogs: this.state.blogs.map(blog => blog._id !== likedBlog._id ? blog : likedBlog) })
  }


  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleNotifications = (message, error) => {
    this.setState({ message: message, error: error })
    setTimeout(() => {
      this.setState({ message: null, error: null })
    }, 5000)
  }

  handleDelete = (blog) => {
    this.setState({ blogs: this.state.blogs.filter(b => b._id === blog._id) })
  }



  render() {
    const showMessage = () => (
      <div className="message">
        {this.state.message}
      </div>
    )

    const showError = () => (
      <div className="error">
        {this.state.error}
      </div>
    )

    const showBlogs = () => (
      <div>
        <h2>blogs</h2>
        <p>{this.state.user.name} logged in <button onClick={this.logout}>Logout</button></p>
        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} handleLike={this.handleLike} handleDelete={this.handleDelete} currentUser={this.state.user} handleNotifications={this.handleNotifications} />
        )}
        <h3>Uusi blogi</h3>
        <BlogForm addBlogToList={this.addBlogToList} handleNotifications={this.handleNotifications} />
      </div>
    )
    return (
      <div>
        {this.state.message !== null && showMessage()}
        {this.state.error !== null && showError()}

        {this.state.user === null &&
          <Togglable buttonLabel="login">
            <LoginForm handleSubmit={this.login} handleLoginFieldChange={this.handleLoginFieldChange} username={this.state.username} password={this.state.password} />
          </Togglable>}
        {this.state.user !== null && showBlogs()}
      </div>
    )
  }
}


export default App;
