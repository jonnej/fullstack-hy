import React from 'react'
import userService from '../services/users'



const User = async (props) => {
  const user = await userService.getUser(props.id)
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id} >{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User