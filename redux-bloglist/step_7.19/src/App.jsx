import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'
import Notification from './components/Notification'

import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await dispatch(loginUser({ username, password }))
      setMessage(`Welcome ${username}`)
      setType('success')
      setTimeout(() => setMessage(null), 4000)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage('Wrong username or password')
      setType('error')
      setTimeout(() => setMessage(null), 4000)
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    setMessage('Logged out successfully')
    setType('success')
    setTimeout(() => setMessage(null), 4000)
  }

  if (!user) {
    return (
      <div>
        <Notification message={message} type={type} />
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <div>
            username <input value={username} onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <Router>
      <div>
        <header className="app-nav">
          <h2>Blog App</h2>
          <nav>
            <Link to="/">Blogs</Link>
            <Link to="/users">Users</Link>
            <span style={{ marginLeft: '20px' }}>
              {user.name} logged in <button onClick={handleLogout}>Logout</button>
            </span>
          </nav>
        </header>

        <Notification message={message} type={type} />

        <Routes>
          <Route path="/" element={<><BlogForm /><BlogList /></>} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogView user={user} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
