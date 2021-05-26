import React from 'react'

const MessageText = ({ text, timeString, user, avatar }) => {
  return (
    <div>
     <img src={avatar} alt={user} />
      <div style={{ whiteSpace: 'pre-line' }}>
        <strong>{user}</strong> ({timeString}): {text}
      </div>
    </div>
  )
}

export default MessageText
