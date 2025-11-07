const STORAGE_KEY = 'loggedBlogUser'

export const saveUser = user => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export const loadUser = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
  return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
}

export const clearUser = () => {
  window.localStorage.removeItem(STORAGE_KEY)
}
