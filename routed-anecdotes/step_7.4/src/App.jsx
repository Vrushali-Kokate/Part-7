import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useField } from './hooks'

const Menu = () => {
  const padding = { paddingRight: 5 }
  return (
    <div>
      <Link to="/" style={padding}>anecdotes</Link>
      <Link to="/create" style={padding}>create new</Link>
      <Link to="/about" style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(a => (
        <li key={a.id}>
          <Link to={`/anecdotes/${a.id}`}>{a.content}</Link>
        </li>
      ))}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => {
  if (!anecdote) return <p>Anecdote not found</p>

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>by <strong>{anecdote.author}</strong></p>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see{' '}
        <a href={anecdote.info} target="_blank" rel="noreferrer">{anecdote.info}</a>
      </p>
    </div>
  )
}

const AnecdoteView = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === Number(id))
  return <Anecdote anecdote={anecdote} />
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    <em>
      An anecdote is a brief, revealing account of an individual person or an incident.
    </em>
    <p>
      Software engineering is full of excellent anecdotes, at best telling about serious
      programming practices and at worst about poor ones.
    </p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/en/'>Full Stack Open</a>.
    See{' '}
    <a href='https://github.com/mluukkai/routed-anecdotes'>
      https://github.com/mluukkai/routed-anecdotes
    </a>{' '}
    for the source code.
  </div>
)

const Notification = ({ message }) => {
  if (!message) return null
  return (
    <div style={{ border: '1px solid #aaa', padding: 8, margin: 8, color: 'green' }}>
      {message}
    </div>
  )
}

const CreateNew = ({ addNew }) => {
  const navigate = useNavigate()

  // use the custom hook here
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content <input {...content} />
        </div>
        <div>
          author <input {...author} />
        </div>
        <div>
          url for more info <input {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote "${anecdote.content}" created!`)
    setTimeout(() => setNotification(''), 5000)
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification} />

      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdotes/:id" element={<AnecdoteView anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
