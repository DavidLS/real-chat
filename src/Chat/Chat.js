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

      socketRef.current.on('message', message => {
        setMessages(messages => [...messages, message])
      })

      socketRef.current.on('user-disconnected', userName => {
        const message = {
          type: 'text',
          username: userName,
          time: new Date().toISOString(),
          text: `${userName} has disconnected`
        }
        setMessages(messages => [...messages, message])
      })

      socketRef.current.on('user-connected', userName => {
        socketRef.current.emit('text-message', `${userName} has joined`)
      })

      socketRef.current.on('is-typing', typersRaw => {
        const typersAux = Object.entries(typersRaw)
          .filter((typer) => typer[1] && typer[0] !== userName)
          .map((typer) => typer[0])
        setTypers(typersAux)
      })

      window.addEventListener('beforeunload', (userName) => emitExit(userName), { once: true })
    },
    [])

  const emitExit = (userName) => {
    console.log('TEST01')
    const message = {
      type: 'text',
      username: userName,
      time: new Date().toISOString(),
      text: `${userName} has disconnected`
    }
    socketRef.current.emit('text-message', message)
    socketRef.current.emit('typing', false)
  }

  const handleSendMessage = ({ message, alt = null, type = 'text' }) => {
    if (type === 'text') {
      socketRef.current.emit('text-message', message)
    } else {
      socketRef.current.emit('image-message', { url: message, alt: alt })
    }
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
