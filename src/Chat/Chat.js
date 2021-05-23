import React from 'react'

import List from './List/List'
import MessageForm from './MessageForm/MessageForm'

const Chat = (props) => {
  return (
    <div>
      <h1>Hi {props.userName}</h1>
      <List/>
      <MessageForm/>
      <div>
        Message Notification
      </div>
    </div>
  )
}

export default Chat
