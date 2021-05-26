import React, { useState } from 'react'

import styles from './Login.module.css'

const Login = ({ handleChange, handleSubmit, placeholder, value }) => {
  const [error, setError] = useState(false)

  return (
    <div className={styles.FormContainer}>
      <h1 className={styles.LoginTitle}>
        Join chat
      </h1>
      <h2 className={styles.LoginSubtitle}>
        Please enter your username
      </h2>
      <form
        className={styles.LoginForm}
        onSubmit={(event) => {
          event.preventDefault()
          setError(false)
          const value = event.target[0].value
          if (value.trim()) {
            handleSubmit(value.trim())
          } else {
            setError(true)
          }
        }}
      >
        <input
          className={styles.LoginFormInput}
          value={value}
          onChange={
            (event) => {
              setError(false)
              handleChange(event.target.value)
            }
          }
          placeholder={placeholder}
          type="text"
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
