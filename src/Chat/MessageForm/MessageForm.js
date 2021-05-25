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

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          const message = event.target[0].value
          // const type = query ? 'image' : 'text'
          handleMessage({ message: message })
          setValue('')
          setQuery('')
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
        <Popover
          isOpen={isPopoverOpen}
          positions={['top', 'bottom', 'left', 'right']} // preferred positions by priority
          content={<GiPreviewList query={query}/>}
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
