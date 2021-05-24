import React from 'react'

const MessageBlock = ({ text, user }) => {
  const encodedUri = encodeURI(user)
  return (
    <div>
     <img src={`https://ui-avatars.com/api/?name=${encodedUri}`} alt={user}
      />
      <strong>{user}</strong>: {text}
    </div>
  )
}

export default MessageBlock
