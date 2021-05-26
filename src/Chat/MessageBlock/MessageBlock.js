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

const MessageBlock = ({ messageObj }) => {
  const avatarUrl = getAvatarUrl(messageObj.user)
  const timeString = formatTime(messageObj.time)

  let message = null
  if (messageObj.type === 'image') {
    message = <MessageImage
                alt={messageObj.alt}
                avatar={avatarUrl}
                time={timeString}
                url={messageObj.url}
                user={messageObj.user}
              />
  } else {
    message = <MessageText
                avatar={avatarUrl}
                text={messageObj.text}
                timeString={timeString}
                user={messageObj.user}
              />
  }

  return (
    <div>
      {message}
    </div>
  )
}

export default MessageBlock
