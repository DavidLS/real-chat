import React, { useState } from 'react'

const Login = (props) => {
  const [error, setError] = useState(false)

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        setError(false)
        const value = event.target[0].value
        if (/^(.|\s)*\S(.|\s)*$/.test(value)) { // empty - only spaces
          props.handleSubmit(value)
        } else {
          setError(true)
        }
      }}
    >
      <label>
        Please enter your username
        <input
          value={props.value}
          onChange={
            (event) => {
              setError(false)
              props.handleChange(event.target.value)
            }
          }
          placeholder={props.placeholder}
          type="text"
        />
      </label>
      <button type="submit">Next</button>
      {error
        ? <div className="error">
          Please enter a username
          </div>
        : null
      }
    </form>
  )
}

export default Login
