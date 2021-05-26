import React from 'react'
import { format, isToday, isYesterday } from 'date-fns'

import MessageText from './MessageText/'
import MessageImage from './MessageImage/'

import getAvatarUrl from '../../../../integrations/avatar/getAvatarUrl'

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

const MessageBlock = ({ messageObj }) => {
  const avatarUrl = getAvatarUrl(messageObj.username)
  const timeString = formatTime(messageObj.time)

  let message = null
  if (messageObj.type === 'image') {
    message = <MessageImage
                alt={messageObj.alt}
                avatar={avatarUrl}
                time={timeString}
                url={messageObj.url}
                user={messageObj.username}
              />
  } else {
    message = <MessageText
                avatar={avatarUrl}
                text={messageObj.text}
                timeString={timeString}
                user={messageObj.username}
              />
  }

  return (
    <div>
      {message}
    </div>
  )
}

export default MessageBlock
