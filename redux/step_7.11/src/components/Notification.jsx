import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) return null

  const style = {
    border: '1px solid green',
    padding: 10,
    margin: '10px 0',
    background: '#eaffea',
  }

  return <div style={style}>{notification}</div>
}

export default Notification
