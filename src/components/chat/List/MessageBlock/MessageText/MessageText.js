import React from 'react'

const MessageText = ({ text, timeString, user, avatar }) => {
  return (
    <div style={{ whiteSpace: 'pre-line' }}>
      <strong>{user}</strong> ({timeString}): {text}
    </div>
  )
}

export default MessageText
