import React, { useState } from 'react'

import styles from './App.module.css'

import './index.css'

import Login from './Login/Login'
import Chat from './Chat/Chat'
const App = () => {
  const [userName, setUserName] = useState('')
  const [inChat, setInChat] = useState(false)

  const handleChange = (newValue) => setUserName(newValue)

  const handleSubmit = () => setInChat(true)

  return (
    <div className={styles.Container}>
      <div className={styles.SubContainer}>
        {inChat
          ? <Chat
              userName={userName}
            />
          : <Login
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              value={userName}
              placeholder="Enter your username"
          />
        }
      </div>
    </div>
  )
}

export default App
