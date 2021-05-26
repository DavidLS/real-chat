import React, { useState } from 'react'
import { format, isToday, isYesterday } from 'date-fns'

import styles from './MessageBlock.module.css'

import MessageText from './MessageText/'
import MessageImage from './MessageImage/'
import Spinner from '../../../utils/Spinner'

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
  const [isLoading, setIsLoading] = useState(true)

  const avatarUrl = getAvatarUrl(messageObj.username)
  const timeString = formatTime(messageObj.time)

  let message = null
  if (messageObj.type === 'image') {
    message = <MessageImage
                alt={messageObj.alt}
                url={messageObj.url}
              />
  } else {
    message = <MessageText
                text={messageObj.text}
              />
  }

  return (
    <div className={styles.MessageBlock}>
      <div>
        {isLoading && <Spinner/>}
        <img
          className={styles.MessageAvatar}
          src={avatarUrl}
          alt={messageObj.username}
          onLoad={() => setIsLoading(false)}
        />
      </div>
      <div className={styles.MessageBlockContent}>
        <div className={styles.MessageBlockContentTitle}>
          <b>{messageObj.username}</b><span>{timeString}</span>
        </div>
        <div>
          {message}
        </div>
      </div>
    </div>
  )
}

export default MessageBlock
