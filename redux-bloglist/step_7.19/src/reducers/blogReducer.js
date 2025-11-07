import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    }
  },
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions

// Thunks
export const initializeBlogs = () => async dispatch => {
  const blogs = await blogService.getAll()
  dispatch(setBlogs(blogs))
}

export const createBlog = (blogObject) => async dispatch => {
  const newBlog = await blogService.create(blogObject)
  dispatch(appendBlog(newBlog))
}

export const likeBlog = (blog) => async dispatch => {
  const updated = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
  dispatch(updateBlog(updated))
}

export const deleteBlog = (id) => async dispatch => {
  await blogService.remove(id)
  dispatch(removeBlog(id))
}

export default blogSlice.reducer
