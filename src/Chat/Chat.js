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

      socketRef.current.on('user-disconnected', user => {
        if (user !== userName) {
          const message = {
            type: 'text',
            username: user,
            time: new Date().toISOString(),
            text: `${user} has disconnected`
          }
          setMessages(messages => [...messages, message])
        }
      })

      socketRef.current.on('user-connected', user => {
        if (user !== userName) {
          const message = {
            type: 'text',
            username: user,
            time: new Date().toISOString(),
            text: `${user} has joined`
          }
          setMessages(messages => [...messages, message])
        }
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
    socketRef.current.emit('typing', false)
  }

  const emitText = ({ message }) => {
    console.log('emitText')
    console.log(message)
    // socketRef.current.emit('text-message', message)
  }

  const handleSendText = ({ message }) => {
    emitText({ message })
  }

  const handleSendImage = ({ url, alt }) => {
    const image = { url: url }
    if (alt) image.alt = alt
    // socketRef.current.emit('image-message', image)
  }

  const handleTyping = (status) => {
    // socketRef.current.emit('typing', status)
  }

  return (
    <div>
      <h1>Hi {userName}</h1>
      <List
        messages={messages}
      />
      <MessageForm
        handleSendText={handleSendText}
        handleSendImage={handleSendImage}
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
