import React, { useState } from 'react'

import styles from './Login.module.css'

const Login = () => {
  const [error, setError] = useState(false)
  const [userName, setUserName] = useState('')

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
        onSubmit={(event) => {
          setError(false)
          const value = event.target[0].value
          if (!value.trim()) {
            setError(true)
          }
          console.log('not error')
          return !error
        }}
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
        {error
          ? <div className={styles.LoginError}>
              Please enter a username
            </div>
          : null
        }
        <button className={styles.LoginButton} type="submit">Next</button>
      </form>

    </div>
  )
}

export default Login
