const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const own = user && blog.user && user.username === blog.user.username

  return (
    <div style={{ padding: '5px', border: '1px solid #ccc', marginBottom: '5px' }}>
      <strong>{blog.title}</strong> by {blog.author}
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes <button onClick={() => handleLike(blog.id)}>like</button>
      </div>
      {own && <button onClick={() => handleRemove(blog.id)}>remove</button>}
    </div>
  )
}

export default Blog
