import React from 'react'

const MessageImage = ({ alt, avatar, timeString, url, user }) => {
  return (
    <div>
     <img src={avatar} alt={user} />
      <div>
      <img src={url} alt={alt} />
      </div>
    </div>
  )
}

export default MessageImage
