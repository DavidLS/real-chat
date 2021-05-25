import React, { useState, useEffect, useRef } from 'react'

const MessageForm = ({ handleMessage, handleTyping, placeholder }) => {
  const [value, setValue] = useState('')

  const buttonDisabled = !value.trim()

  const textAreaRef = useRef(null)
  const [textAreaHeight, setTextAreaHeight] = useState('auto')

  useEffect(() => {
    setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`)
  }, [value])

  const handleOnChange = (event) => {
    const message = event.target.value

    setTextAreaHeight('auto')

    setValue(message)
    handleTyping(!!message.trim())
  }

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
      <textarea
        ref={textAreaRef}
        value={value}
        onChange={handleOnChange}
        placeholder={placeholder}
        type="text"
        autoFocus
        rows={1}
        style={{
          height: textAreaHeight
        }}
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
