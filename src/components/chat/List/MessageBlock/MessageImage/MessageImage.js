import React, { useState } from 'react'
import Spinner from '../../../../utils/Spinner'

const MessageImage = ({ alt, url }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <Spinner/>}
      <img
        src={url}
        alt={alt}
        onLoad={() => setIsLoading(false)}
      />
    </>
  )
}

export default MessageImage
