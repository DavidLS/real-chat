import { useEffect, useRef, useState } from 'react'
import socketClient from 'socket.io-client'

const useChat = ({ userName }) => {
  const [isLoading, setIsLoading] = useState(true)
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

      window.addEventListener('beforeunload', () => socketRef.current.emit('typing', false), { once: true })
      setIsLoading(false)
    },
    [])

  const emitText = ({ message }) => {
    socketRef.current.emit('text-message', message)
  }

  const emitImage = ({ image }) => {
    socketRef.current.emit('image-message', image)
  }

  const emitTyping = (status) => {
    socketRef.current.emit('typing', status)
  }

  return {
    isLoading,
    messages,
    typers,
    emitImage,
    emitText,
    emitTyping
  }
}

export default useChat
