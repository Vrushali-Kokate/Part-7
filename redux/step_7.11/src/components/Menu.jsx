import { Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 10,
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <Link to="/" style={padding}>home</Link>
      <Link to="/blogs" style={padding}>blogs</Link>
      <Link to="/about" style={padding}>about</Link>
    </div>
  )
}

export default Menu
