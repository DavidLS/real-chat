import React from 'react'

const MessageBlock = (props) => {
  return (
    <div>
      <strong>{props.user}</strong>: {props.text}
    </div>
  )
}

export default MessageBlock
