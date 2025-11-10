import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeBlogs } from '../reducers/blogReducer'
//import './index.css' 

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <div>
      <h2>Blogs</h2>
      <div className="blog-list">
        {blogs.map(blog => (
          <div key={blog.id} className="blog-card">
            <Link to={`/blogs/${blog.id}`} className="blog-title">{blog.title}</Link>
            <p>— {blog.author}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogList
