import Blog from './Blog'

const BlogList = ({ blogs, handleLike, handleRemove, user }) => {
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} user={user} />
      ))}
    </div>
  )
}

export default BlogList
