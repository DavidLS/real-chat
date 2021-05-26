import React, { useState } from 'react'
import Spinner from '../../../../utils/Spinner'

import styles from './MessageImage.module.css'

const MessageImage = ({ alt, url }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <Spinner size={100}/>}
      <img
        className={styles.MessageImage}
        src={url}
        alt={alt}
        onLoad={() => setIsLoading(false)}
      />
    </>
  )
}

export default MessageImage
