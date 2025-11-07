import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import usersService from '../services/users'

const User = () => {
  const [user, setUser] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchUser = async () => {
      const allUsers = await usersService.getAll()
      const foundUser = allUsers.find(u => u.id === id)
      setUser(foundUser)
    }
    fetchUser()
  }, [id])

  if (!user) return null // prevents "cannot read property" error

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
