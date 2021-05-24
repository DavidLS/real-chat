import React, { useState, useEffect, useRef } from 'react'

import socketClient from 'socket.io-client'

import List from './List/List'
import MessageForm from './MessageForm/MessageForm'

const Chat = ({ userName }) => {
  const [messages, setMessages] = useState([])
  const [typers, setTypers] = useState([])
  const socketRef = useRef()

  useEffect(
    () => {
      const API_URL = `https://pager-hiring.herokuapp.com/?username=${userName}`
      socketRef.current = socketClient(API_URL)

      socketRef.current.on('user-disconnected', username => {
        console.log(`${username} is disconnected`)
      })

      socketRef.current.on('message', message => {
        setMessages(messages => [...messages, message])
      })

      socketRef.current.on('user-connected', username => {
        console.log(`${username} is connected`)
      })

      socketRef.current.on('is-typing', typersRaw => {
        const typersAux = Object.entries(typersRaw)
          .filter((typer) => typer[1] && typer[0] !== userName)
          .map((typer) => typer[0])
        setTypers(typersAux)
      })
    },
    [])

  const handleSendMessage = (message) => {
    socketRef.current.emit('text-message', message)
  }

  const handleTyping = (status) => {
    socketRef.current.emit('typing', status)
  }

  return (
    <div>
      <h1>Hi {userName}</h1>
      <List
        messages={messages}
      />
      <MessageForm
        handleMessage={handleSendMessage}
        handleTyping={handleTyping}
      />
      <div>
        {typers.length < 1
          ? null
          : typers.length > 1
            ? 'People are writing...'
            : `${typers[0]} is writing...`
        }
      </div>
    </div>
  )
}

export default Chat
