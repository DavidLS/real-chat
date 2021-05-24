import React, { useState } from 'react'

const MessageForm = ({ handleMessage, handleTyping, placeholder }) => {
  const [value, setValue] = useState('')
  const buttonDisabled = !value.trim()
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        const message = event.target[0].value
        handleMessage(message)
        setValue('')
        handleTyping(false)
      }}
    >
      <input
        value={value}
        onChange={
          (event) => {
            const message = event.target.value
            setValue(message)
            if (message.trim()) { // empty - only spaces
              handleTyping(true)
            } else {
              handleTyping(false)
            }
          }
        }
        placeholder={placeholder}
        type="text"
      />
      <button
        type="submit"
        disabled={buttonDisabled}
      >
        Send
      </button>
    </form>
  )
}

export default MessageForm
