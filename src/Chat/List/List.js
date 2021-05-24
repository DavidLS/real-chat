import React from 'react'
import MessageBlock from '../MessageBlock/MessageBlock'

const List = (props) => {
  return (
    <>
      <MessageBlock
        user="John Snow"
        time="9:30 am"
      >
        Message 01A
        Message 01B
      </MessageBlock>
      <MessageBlock
        user="Jack Black"
        time="9:30 am"
      >
        Message 02
      </MessageBlock>
      <MessageBlock
        user="John Snow"
        time="9:30 am"
      >
        Message 03
      </MessageBlock>
    </>
  )
}

export default List
