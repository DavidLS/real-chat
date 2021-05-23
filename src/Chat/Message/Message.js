import React from 'react'

const Message = (props) => {
  return (
    <div>
      {props.name} said {props.children}
    </div>
  )
}

export default Message
