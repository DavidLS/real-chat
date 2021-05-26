import React, { useState, useEffect } from 'react'

import styles from './GiPreviewList.module.css'

// const GIPHY_API_KEY = 'Bg9xdRCBtHb3O5hZgFshcX3dtnN30u14'
const GIPHY_API_KEY = process.env.GIPHY_API_KEY
const GIPHY_API_SEARCH_URL = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&limit=8`

const GifPreviewBlock = ({ gif }) => {
  const src = gif.images.fixed_height.url
  return <img src={src} alt={gif.slug} />
}

const GiPreviewList = ({ query, handleClick }) => {
  useEffect(
    () => {
      async function getGifs () {
        setError(false)
        setGifList([])
        try {
          const response = await fetch(`${GIPHY_API_SEARCH_URL}&q=${query}`)
          const json = await response.json()
          setGifList(json.data)
        } catch (e) {
          setError(true)
        }
      }
      getGifs()
    },
    [query])

  const [gifList, setGifList] = useState([])
  const [error, setError] = useState(false)
  return (
    <div className={styles.GiPreviewList}>
      {error
        ? <div>We are sorry! Please try again later</div>
        : gifList.map(
          (gif) => <div
                    className={styles.GiPreviewItem}
                    key={`gif_preview_${gif.id}`}
                    onClick={(event) => {
                      handleClick({ event: event, gif: gif })
                    }}
                  >
                    <GifPreviewBlock
                      gif={gif}
                    />
                  </div>
        )
      }
    </div>
  )
}

export default GiPreviewList
