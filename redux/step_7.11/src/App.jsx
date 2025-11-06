import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Menu from './components/Menu'
import About from './components/About'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <Router>
      <div className="container">
        <h1>Blog App (Redux)</h1>
        <Menu />
        <Notification />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <BlogForm />
                <BlogList />
              </>
            }
          />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
