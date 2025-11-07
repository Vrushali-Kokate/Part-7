import React, { useEffect, useState } from 'react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import store from './reducers/store'

import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Users from './components/Users'

import { loginUser, logoutUser, initializeUser } from './reducers/userReducer'

const AppContent = () => {
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
      setMessage(`Welcome ${store.getState().user.username}`)
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
      </div>
    )
  }

  return (
    <div>
      <Router>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <nav>
          <Link to="/">blogs</Link> | <Link to="/users">Users</Link>
        </nav>

        <Notification message={message} type={type} />

        <Routes>
          <Route path="/" element={
            <div>
              <BlogForm />
              <BlogList user={user} />
            </div>
          } />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </div>
  )
}

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
)

export default App
