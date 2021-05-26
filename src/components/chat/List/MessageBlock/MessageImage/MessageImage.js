import React from 'react'

const MessageImage = ({ alt, avatar, timeString, url, user }) => {
  return (
      <img src={url} alt={alt} />
  )
}

export default MessageImage
