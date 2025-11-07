import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'

const BlogView = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [comment, setComment] = useState('')

  useEffect(() => {
    const fetchBlog = async () => {
      const blogs = await blogService.getAll()
      const found = blogs.find(b => b.id === id)
      setBlog(found)
    }
    fetchBlog()
  }, [id])

  const handleComment = async (e) => {
    e.preventDefault()
    const updatedBlog = await blogService.addComment(id, comment)
    setBlog(updatedBlog)
    setComment('')
  }

  if (!blog) return <div>Loading...</div>

  return (
    <div style={{ border: '1px solid gray', padding: 15, margin: 10, borderRadius: 5 }}>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>URL: <a href={blog.url}>{blog.url}</a></p>
      <p>{blog.likes} likes</p>
      <p>Added by: {blog.user?.name}</p>

      <h3>Comments</h3>
      <ul>
        {blog.comments.map((c, i) => <li key={i}>{c}</li>)}
      </ul>

      <form onSubmit={handleComment}>
        <input
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Add a comment"
          required
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  )
}

export default BlogView
