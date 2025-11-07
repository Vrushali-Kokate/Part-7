import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import Blog from './Blog'

const BlogList = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

export default BlogList
