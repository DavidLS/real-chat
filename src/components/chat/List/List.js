import React from 'react'
import MessageBlock from './MessageBlock/'

const List = ({ messages }) => {
  return (
    messages.map(
      (message) => {
        return (
            <MessageBlock
              key={`message_${message.time}`}
              messageObj={message}
            />
        )
      })
  )
}

export default List
