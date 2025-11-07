import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            {blog.title} — {blog.author}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogList
