import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { useState } from 'react'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog({ title, author }))
    dispatch(setNotification(`Blog "${title}" added!`))
    setTimeout(() => dispatch(clearNotification()), 5000)
    setTitle('')
    setAuthor('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        author <input value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <button type="submit">add blog</button>
    </form>
  )
}

export default BlogForm
