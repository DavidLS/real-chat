import React from 'react'

import { useLocation, useHistory } from 'react-router-dom'

import useChat from '../../integrations/pager/useChat'

import List from '../../components/chat/List'
import MessageForm from '../../components/chat/MessageForm/'
import Spinner from '../../components/utils/Spinner'

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
    <div>
      <h1>Hi {userName}</h1>
      {isLoading
        ? <Spinner/>
        : <>
            <List
              messages={messages}
            />
            <MessageForm
              handleSendText={handleSendText}
              handleSendImage={handleSendImage}
              handleTyping={handleTyping}
            />

          { (typers.length > 0) && <div>
                                      {typers.length > 1
                                        ? 'People are writing...'
                                        : `${typers[0]} is writing...`
                                      }
                                    </div>
          }
        </>
       }
    </div>
  )
}

export default Chat
