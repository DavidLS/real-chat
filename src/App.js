import React, { useState } from 'react'

import Login from './Login/Login'
const App = () => {
  const [userName, setUserName] = useState('')

  const handleChange = (newValue) => {
    setUserName(newValue)
  }

  const handleSubmit = () => {
    console.log(`Submitted with name ${userName}`)
  }

  return (
    <>
      <Login
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={userName}
        placeholder="Enter your username"
      />
    </>
  )
}

export default App
