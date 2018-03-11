import React from 'react'

const LoginForm = ({ handleSubmit, handleLoginFieldChange, username, password }) => {
  return (
    <div>
      <h2>Kirjaudu sovellukseen</h2>
      <form onSubmit={handleSubmit}>
        <div>
                  username: <input type="text" name="username" value={username} onChange={handleLoginFieldChange} />
        </div>
        <div>
                  password: <input type="password" name="password" value={password} onChange={handleLoginFieldChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )

}

export default LoginForm