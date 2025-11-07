import React from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = () => {
    if (window.confirm(`Delete blog "${blog.title}" by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  return (
    <div style={{ border: '1px solid black', padding: 8, margin: 5 }}>
      <div>
        <strong>{blog.title}</strong> — {blog.author}
      </div>
      <div>
        Likes: {blog.likes} <button onClick={handleLike}>like</button>
      </div>
      {user && blog.user?.username === user.username && (
        <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>delete</button>
      )}
    </div>
  )
}

export default Blog
