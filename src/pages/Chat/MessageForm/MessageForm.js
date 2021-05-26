import React, { useState, useEffect, useRef } from 'react'
import { Popover } from 'react-tiny-popover'

import GiPreviewList from './GiPreviewList/GiPreviewList'

const MessageForm = ({ handleSendImage, handleSendText, handleTyping }) => {
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

  const cleanForm = () => {
    setValue('')
    setQuery('')
    handleTyping(false)
  }

  const handleImageClick = ({ gif }) => {
    handleSendImage({ url: gif.images.fixed_height.url, alt: gif.slug })
    cleanForm()
  }

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleSendText({ message: value })
          cleanForm()
        }}
      >
        <textarea
          ref={textAreaRef}
          value={value}
          onChange={handleOnChange}
          placeholder="Message"
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
          content={<GiPreviewList handleClick={handleImageClick} query={query}/>}
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
