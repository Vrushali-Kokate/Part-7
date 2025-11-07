import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
// import './index.css'

const BlogView = ({ user }) => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    const fetchBlog = async () => {
      const allBlogs = await blogService.getAll()
      const foundBlog = allBlogs.find(b => b.id === id)
      setBlog(foundBlog)
    }
    fetchBlog()
  }, [id])

  if (!blog) return null

  const handleLike = async () => {
    await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
    setBlog({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = async () => {
    if (user && blog.user?.username === user.username) {
      if (window.confirm(`Delete blog "${blog.title}" by ${blog.author}?`)) {
        await blogService.remove(blog.id)
        window.location.href = '/'
      }
    }
  }

  return (
    <div className="blog-view-card">
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>URL: <a href={blog.url}>{blog.url}</a></p>
      <p>Likes: {blog.likes} <button onClick={handleLike}>like</button></p>
      {blog.user && <p>Added by: {blog.user.name}</p>}
      {user && blog.user?.username === user.username && (
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      )}
    </div>
  )
}

export default BlogView
