import React from 'react'
import { useField, useResource } from './hooks'

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = event => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.reset()
  }

  const handlePersonSubmit = event => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
    name.reset()
    number.reset()
  }

  // Destructure to remove `reset` before spreading props
  const { reset: resetContent, ...contentInput } = content
  const { reset: resetName, ...nameInput } = name
  const { reset: resetNumber, ...numberInput } = number

  return (
    <div style={{ padding: '20px' }}>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...contentInput} />
        <button>create</button>
      </form>
      {notes.map(n => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        <div>
          name <input {...nameInput} /> <br />
          number <input {...numberInput} />
        </div>
        <button>create</button>
      </form>
      {persons.map(p => (
        <p key={p.id}>
          {p.name} {p.number}
        </p>
      ))}
    </div>
  )
}

export default App
