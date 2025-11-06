import { useDispatch } from 'react-redux'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()

  const addAnecdote = (content) => {
    // Here you would normally add your anecdote logic
    dispatch(setNotification(`You added: "${content}"`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <button onClick={() => addAnecdote('New anecdote')}>Add anecdote</button>
    </div>
  )
}

export default App
