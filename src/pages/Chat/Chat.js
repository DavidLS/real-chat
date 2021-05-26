import React from 'react'

import { useLocation, useHistory } from 'react-router-dom'

import useChat from '../../integrations/pager/useChat'

import List from '../../components/chat/List'
import MessageForm from '../../components/chat/MessageForm/'
import Spinner from '../../components/utils/Spinner'

import styles from './Chat.module.css'

const useQuery = () => new URLSearchParams(useLocation().search)

const Chat = () => {
  const userName = useQuery().get('username')

  if (!userName) {
    const history = useHistory()
    history.push('/')
  }

  const {
    isLoading,
    messages,
    typers,
    emitImage,
    emitText,
    emitTyping
  } = useChat({ userName })

  const handleSendText = ({ message }) => {
    emitText({ message })
  }

  const handleSendImage = ({ url, alt }) => {
    const image = { url: url }
    if (alt) image.alt = alt
    emitImage({ image })
  }

  const handleTyping = (status) => {
    emitTyping(status)
  }

  return (
    <div className={[styles.ChatContainer, isLoading ? styles.ChatContainer_Centered : null]}>
      <>
        {isLoading && <Spinner size={200}/>}
        <List
          messages={messages}
        />
        <MessageForm
          handleSendText={handleSendText}
          handleSendImage={handleSendImage}
          handleTyping={handleTyping}
        />
        { (typers.length > 0) && <div className={styles.ChatTyping}>
                                    {typers.length > 1
                                      ? 'People are writing...'
                                      : `${typers[0]} is writing...`
                                    }
                                  </div>
        }
      </>
    </div>
  )
}

export default Chat
