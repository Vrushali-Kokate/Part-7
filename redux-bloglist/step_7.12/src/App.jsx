import React, { useState } from 'react'
import { Provider } from 'react-redux'
import store from './reducers/store'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      setMessage(`Welcome ${user.username}`)
      setType('success')
      setTimeout(() => setMessage(null), 4000)
    } catch {
      setMessage('Wrong username or password')
      setType('error')
      setTimeout(() => setMessage(null), 4000)
    }
  }

  if (!user) {
    return (
      <Provider store={store}>
        <h2>Login</h2>
        <Notification message={message} type={type} />
        <form onSubmit={handleLogin}>
          <div>
            username <input value={username} onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </Provider>
    )
  }

  return (
    <Provider store={store}>
      <div>
        <h2>Blogs</h2>
        <p>{user.name} logged in</p>
        <Notification message={message} type={type} />
        <BlogForm />
        <BlogList user={user} />
      </div>
    </Provider>
  )
}

export default App
