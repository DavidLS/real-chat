import React, { useState, useEffect } from 'react'

import socketClient from 'socket.io-client'

import List from './List/List'
import MessageForm from './MessageForm/MessageForm'

const Chat = (props) => {
  const [messages, setMessages] = useState([])

  const API_URL = `https://pager-hiring.herokuapp.com/?username=${props.userName}`
  const socket = socketClient(API_URL)

  socket.on('user-disconnected', username => {
    console.log(`${username} is disconnected`)
  })

  useEffect(
    () => {
      socket.on('message', message => {
        setMessages(messages => [...messages, message])
      })

      socket.on('user-connected', username => {
        console.log(`${username} is connected`)
      })
    },
    [])

  const handleSendMessage = (message) => {
    socket.emit('text-message', message)
  }

  const handleTyping = (status) => {
    socket.emit('typing', status)
  }

  return (
    <div>
      <h1>Hi {props.userName}</h1>
      <List
        messages={messages}
      />
      <MessageForm
        handleMessage={handleSendMessage}
        handleTyping={handleTyping}
      />
      <div>
        Message Notification
      </div>
    </div>
  )
}

export default Chat
