import React from 'react'

const MessageBlock = (props) => {
  const encodedUri = encodeURI(props.user)
  return (
    <div>
     <img src={`https://ui-avatars.com/api/?name=${encodedUri}`} alt={props.user}
      />
      <strong>{props.user}</strong>: {props.text}
    </div>
  )
}

export default MessageBlock
