import React, { useState } from 'react'
import { Popover } from 'react-tiny-popover'
import TextareaAutosize from 'react-autosize-textarea'
import GiPreviewList from '../../../integrations/gif/GiPreviewList'

import styles from './MessageForm.module.css'

const MessageForm = ({ handleSendImage, handleSendText, handleTyping }) => {
  const [value, setValue] = useState('')
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [query, setQuery] = useState(null)

  const buttonDisabled = !value.trim() || value.startsWith('/gif ')

  const handleOnChange = (event) => {
    const message = event.target.value

    setIsPopoverOpen(false)
    setQuery('')

    setValue(message)
    handleTyping(!!message.trim())

    if (message.toLowerCase().startsWith('/gif ')) {
      if (message.toLowerCase().substring(5)) {
        setIsPopoverOpen(true)
        setQuery(message.toLowerCase().substring(5))
      }
    }
  }

  const cleanForm = () => {
    setIsPopoverOpen(false)
    setValue('')
    setQuery('')
    handleTyping(false)
  }

  const handleImageClick = ({ gif }) => {
    handleSendImage({ url: gif.images.fixed_height.url, alt: gif.slug })
    cleanForm()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleSendText({ message: value })
    cleanForm()
  }

  return (
    <>
      <form
       className={styles.MessageFormForm}
        onSubmit={handleSubmit}
      >
        <TextareaAutosize
          className={styles.MessageFormTextArea}
          value={value}
          onChange={handleOnChange}
          placeholder="Message"
          type="text"
          autoFocus
          rows={1}
        />
        <Popover
          isOpen={isPopoverOpen}
          positions={['top']} // preferred positions by priority
          content={<GiPreviewList handleClick={handleImageClick} query={query}/>}
          align="left"
          onClickOutside={cleanForm}
        >
          <button
            className={styles.MessageFormSubmit}
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
