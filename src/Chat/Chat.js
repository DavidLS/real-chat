import React from 'react'

import socketClient from 'socket.io-client'

import List from './List/List'
import MessageForm from './MessageForm/MessageForm'

const Chat = (props) => {
  const API_URL = `https://pager-hiring.herokuapp.com/?username=${props.userName}`

  const socket = socketClient(API_URL)

  socket.on('user-connected', username => {
    console.log(`${username} is connected`)
  })

  socket.on('user-disconnected', username => {
    console.log(`${username} is disconnected`)
  })

  const handleSendMessage = (message) => {
    socket.emit('text-message', message)
  }

  return (
    <div>
      <h1>Hi {props.userName}</h1>
      <List/>
      <MessageForm
        handleMessage={handleSendMessage}
      />
      <div>
        Message Notification
      </div>
    </div>
  )
}

export default Chat
