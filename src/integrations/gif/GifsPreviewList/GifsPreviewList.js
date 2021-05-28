import React, { useState, useEffect } from 'react'

import Spinner from '../../../components/utils/Spinner'

import styles from './GiPreviewList.module.css'

const GIPHY_API_KEY = 'Bg9xdRCBtHb3O5hZgFshcX3dtnN30u14'
const GIPHY_API_SEARCH_URL = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&limit=8`

const GifPreviewBlock = ({ gif }) => {
  const src = gif.images.fixed_height.url
  return <img src={src} alt={gif.slug} />
}

const GiPreviewList = ({ query, handleClick }) => {
  const [isLoading, setIsLoading] = useState('false')

  useEffect(
    () => {
      async function getGifs () {
        setError(false)
        setGifList([])
        try {
          setIsLoading(true)
          const response = await fetch(`${GIPHY_API_SEARCH_URL}&q=${query}`)
          if (!response.ok) {
            throw (new Error('response_not_ok'))
          }
          const json = await response.json()
          setGifList(json.data)
        } catch (e) {
          setError(true)
        }
        setIsLoading(false)
      }

      let cancel = false
      setTimeout(() => {
        if (!cancel) {
          getGifs()
        }
      }, 500)

      return () => { cancel = true }
    },
    [query])

  const [gifList, setGifList] = useState([])
  const [error, setError] = useState(false)
  return (
    <div className={styles.GiPreviewList}>

      {isLoading
        ? <Spinner size={100}/>
        : error
          ? <div><p>We are sorry! Please try again later</p></div>
          : gifList?.length
            ? gifList?.map(
              (gif) => <div
                className={styles.GiPreviewItem}
                key={`gif_preview_${gif.id}`}
                onClick={() => {
                  handleClick({ gif })
                }}
              >
                <GifPreviewBlock
                  gif={gif}
                />
              </div>
            )
            : <div><p>We are sorry! No results were found</p></div>
        }
    </div>
  )
}

export default GiPreviewList
