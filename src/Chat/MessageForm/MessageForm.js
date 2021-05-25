import React, { useState, useEffect, useRef } from 'react'
import { Popover } from 'react-tiny-popover'

import GiPreviewList from './GiPreviewList/GiPreviewList'

const MessageForm = ({ handleMessage, handleTyping, placeholder }) => {
  const [value, setValue] = useState('')
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [query, setQuery] = useState(null)

  const buttonDisabled = !value.trim() || value.startsWith('/gif ')

  const textAreaRef = useRef(null)
  const [textAreaHeight, setTextAreaHeight] = useState('auto')

  useEffect(() => {
    setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`)
  }, [value])

  const handleOnChange = (event) => {
    const message = event.target.value

    setIsPopoverOpen(false)
    setQuery('')

    setTextAreaHeight('auto')
    setValue(message)
    handleTyping(!!message.trim())

    if (message.toLowerCase().startsWith('/gif ')) {
      setIsPopoverOpen(true)
      setQuery(message.toLowerCase().substring(5))
    }
  }

  const handleSubmit = (message, type = 'text', alt = null) => {
    console.log('[handleSubmit] message')
    console.log(message)
    handleMessage({ message: message, type: type, alt: alt })
    setValue('')
    setQuery('')
    handleTyping(false)
  }

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleSubmit(event.target[0].value)
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
        <Popover
          isOpen={isPopoverOpen}
          positions={['top', 'bottom', 'left', 'right']} // preferred positions by priority
          content={<GiPreviewList handleClick={handleSubmit} query={query}/>}
        >
          <button
            type="submit"
            disabled={buttonDisabled}
          >
            Send
          </button>
      </Popover>
      </form>
    </>
  )
}

export default MessageForm
