import React from 'react'
import MessageBlock from './MessageBlock/'

import styles from './List.module.css'

const List = ({ messages }) => {
  return (
    <div className={styles.List}>
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
