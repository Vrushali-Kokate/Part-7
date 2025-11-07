import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser(state, action) {
      return null
    }
  }
})

export const { setUser, clearUser } = userSlice.actions

// Thunks
export const loginUser = (credentials) => async dispatch => {
  const user = await loginService.login(credentials)
  blogService.setToken(user.token)
  window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
  dispatch(setUser(user))
}

export const logoutUser = () => dispatch => {
  blogService.setToken(null)
  window.localStorage.removeItem('loggedBlogUser')
  dispatch(clearUser())
}

export const initializeUser = () => dispatch => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export default userSlice.reducer
