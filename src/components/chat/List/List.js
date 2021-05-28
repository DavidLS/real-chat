import React, { useRef, useEffect } from 'react'
import MessageBlock from './MessageBlock/'

import styles from './List.module.css'

const List = ({ messages }) => {
  const messagesRef = useRef()

  useEffect(() => {
    messagesRef.current.addEventListener('DOMNodeInserted', event => {
      const { currentTarget: target } = event
      target.scroll({ top: target.scrollHeight, behavior: 'smooth' })
    })
  }, [])

  return (
    <div className={styles.List} ref={messagesRef}>
      {messages.map(
        (message) => {
          return (
              <MessageBlock
                key={`message_${message.time}`}
                messageObj={message}
              />
          )
        })
      }
    </div>
  )
}

export default List
