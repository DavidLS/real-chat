import React from 'react'

const MessageImage = ({ text, timeString, user, avatar }) => {
  return (
    <div>
     <img src={avatar} alt={user} />
      <div>
      <img src={avatar} alt={user} />
      </div>
    </div>
  )
}

export default MessageImage
