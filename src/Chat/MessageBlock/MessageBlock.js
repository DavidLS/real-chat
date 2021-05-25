import React from 'react'
import { format, isToday, isYesterday } from 'date-fns'

const getDayName = (date) => {
  if (isToday(date)) return ''
  if (isYesterday(date)) return 'Yesterday'
  return format(date, 'EEE')
}

const formatTime = (timeRaw) => {
  const date = new Date(timeRaw)
  const dayName = getDayName(date)

  const time = format(date, 'h:mm aaa')

  return `${dayName + ' '}${time}`
}

const MessageBlock = ({ text, time, user }) => {
  const encodedUri = encodeURI(user)
  const timeString = formatTime(time)
  return (
    <div>
     <img src={`https://ui-avatars.com/api/?name=${encodedUri}`} alt={user}
      />
      <div style={{ whiteSpace: 'pre-line' }}>
        <strong>{user}</strong> ({timeString}): {text}
      </div>
    </div>
  )
}

export default MessageBlock
