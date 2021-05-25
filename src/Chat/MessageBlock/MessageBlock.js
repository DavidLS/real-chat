import React from 'react'
import { format, isToday, isYesterday } from 'date-fns'

import MessageText from './MessageText/MessageText'
import MessageImage from './MessageImage/MessageImage'

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

const getAvatarUrl = (userName) => {
  const encodedUri = encodeURI(userName)
  return `https://ui-avatars.com/api/?name=${encodedUri}`
}

const MessageBlock = ({ text, time, user, type }) => {
  const avatarUrl = getAvatarUrl(user)
  const timeString = formatTime(time)

  let message = null
  if (type === 'text') {
    message = <MessageText
                  text={text}
                   timeString={timeString}
                   user={user}
                   avatar={avatarUrl}
                />
  } else {
    message = <MessageImage
                text={text}
                 timeString={timeString}
                 user={user}
                 avatar={avatarUrl}
              />
  }

  return (
    <div>
      {message}
    </div>
  )
}

export default MessageBlock
