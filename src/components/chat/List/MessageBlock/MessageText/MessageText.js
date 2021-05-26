import React from 'react'

import styles from './MessageText.module.css'

const MessageText = ({ text }) => {
  return (
    <div className={styles.MessageText}>
      {text}
    </div>
  )
}

export default MessageText
