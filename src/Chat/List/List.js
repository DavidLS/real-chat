import React from 'react'
import MessageBlock from '../MessageBlock/MessageBlock'

const List = ({ messages }) => {
  return (
    <>
      {messages.map(
        (message) => {
          return (
            <MessageBlock
              key={`message_${message.time}`}
              user={message.username}
              time={message.time}
              text={message.text}
            />
          )
        })}
    </>
  )
}

export default List
