import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import styles from './Login.module.css'

const Login = () => {
  const [error, setError] = useState(false)
  const [userName, setUserName] = useState('')
  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()
    setError(false)
    const value = event.target[0].value
    if (!value.trim()) {
      setError(true)
    } else {
      history.push(`/chat?username=${userName}`)
    }
  }

  return (
    <div className={styles.FormContainer}>
      <h1 className={styles.LoginTitle}>
        Join chat
      </h1>
      <h2 className={styles.LoginSubtitle}>
        Please enter your username
      </h2>
      <form
        action={'/chat'}
        className={styles.LoginForm}
        onSubmit={handleSubmit}
      >
        <input
          className={styles.LoginFormInput}
          value={userName}
          onChange={
            (event) => {
              setError(false)
              setUserName(event.target.value)
            }
          }
          placeholder="Enter your username"
          type="text"
          name="username"
          />
        {error && <div className={styles.LoginError}>
                    Please enter a username
                  </div>
        }
        <button className={styles.LoginButton} type="submit">Next</button>
      </form>

    </div>
  )
}

export default Login
