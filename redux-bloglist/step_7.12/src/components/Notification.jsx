const Notification = ({ message }) => {
  if (message === null) return null

  const style = {
    color: 'green',
    background: '#eee',
    border: '2px solid green',
    padding: '10px',
    marginBottom: '10px',
  }

  return <div style={style}>{message}</div>
}

export default Notification
