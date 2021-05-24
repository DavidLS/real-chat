import React, { useState } from 'react'

import Login from './Login/Login'
import Chat from './Chat/Chat'
const App = () => {
  const [userName, setUserName] = useState('David')
  const [inChat, setInChat] = useState(true)

  const handleChange = (newValue) => {
    setUserName(newValue)
  }

  const handleSubmit = () => {
    setInChat(true)
  }

  return (
    <>
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

    </>
  )
}

export default App
