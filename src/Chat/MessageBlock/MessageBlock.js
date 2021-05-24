import React from 'react'

const MessageBlock = (props) => {
  return (
    <div>
      {props.name} said {props.children}
    </div>
  )
}

export default MessageBlock
