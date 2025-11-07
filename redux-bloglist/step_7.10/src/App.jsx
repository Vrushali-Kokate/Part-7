import { useEffect, useState } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { saveUser, loadUser, clearUser } from './utils/storage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = loadUser()
    if (loggedUser) {
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async credentials => {
    try {
      const user = await loginService.login(credentials)
      saveUser(user)
      blogService.setToken(user.token)
      setUser(user)
      setMessage('Login successful!')
      setTimeout(() => setMessage(null), 4000)
    } catch (error) {
      setMessage('Wrong username or password')
      setTimeout(() => setMessage(null), 4000)
    }
  }

  const handleLogout = () => {
    clearUser()
    setUser(null)
  }

  const addBlog = async newBlog => {
    const blog = await blogService.create(newBlog)
    setBlogs(blogs.concat(blog))
    setMessage(`Added new blog: ${blog.title}`)
    setTimeout(() => setMessage(null), 4000)
  }

  const likeBlog = async id => {
    const blog = blogs.find(b => b.id === id)
    const updated = { ...blog, likes: blog.likes + 1 }
    const returned = await blogService.update(id, updated)
    setBlogs(blogs.map(b => (b.id !== id ? b : returned)))
  }

  const removeBlog = async id => {
    await blogService.remove(id)
    setBlogs(blogs.filter(b => b.id !== id))
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <BlogForm createBlog={addBlog} />
      <BlogList blogs={blogs} handleLike={likeBlog} handleRemove={removeBlog} user={user} />
    </div>
  )
}

export default App
