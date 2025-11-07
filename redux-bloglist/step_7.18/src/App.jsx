import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import store from './reducers/store'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'
import Notification from './components/Notification'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'

const AppContent = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)

  useEffect(() => dispatch(initializeUser()), [dispatch])

  const handleLogin = async (e) => { /* login logic */ }
  const handleLogout = () => { /* logout logic */ }

  if (!user) return <div>Login Form...</div>

  return (
    <Router>
      <header className="app-nav">
        <Link to="/">Blogs</Link> | <Link to="/users">Users</Link>
        <span>{user.name} logged in <button onClick={handleLogout}>Logout</button></span>
      </header>

      <Notification message={message} type={type} />

      <Routes>
        <Route path="/" element={<><BlogForm /><BlogList /></>} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </Router>
  )
}

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
)

export default App
