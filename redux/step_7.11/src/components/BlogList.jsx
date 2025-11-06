import { useSelector } from 'react-redux'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog.id} style={{ border: '1px solid gray', margin: '5px', padding: '5px' }}>
          <b>{blog.title}</b> <br />
          {blog.author}
        </div>
      ))}
    </div>
  )
}

export default BlogList
