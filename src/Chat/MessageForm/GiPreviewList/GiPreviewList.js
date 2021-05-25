import React, { useState, useEffect } from 'react'

// const GIPHY_API_KEY = 'Bg9xdRCBtHb3O5hZgFshcX3dtnN30u14'
const GIPHY_API_KEY = process.env.GIPHY_API_KEY
const GIPHY_API_SEARCH_URL = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&limit=8`

const GifPreviewBlock = ({ gif }) => {
  const src = gif.images.preview_gif.url
  return <img src={src} alt={gif.slug} />
}

const GiPreviewList = ({ query }) => {
  useEffect(
    () => {
      async function getGifs () {
        setError(false)
        setGifList([])
        try {
          const response = await fetch(`${GIPHY_API_SEARCH_URL}&q=${query}`)
          const json = await response.json()
          setGifList(json.data)
          console.log(json)
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
    <div>
    {error
      ? <div>We are sorry! Please try again later</div>
      : gifList.map(
        (gif, index) => <GifPreviewBlock key={`gif_preview_${index}`} gif={gif}/>
      )
  }
    </div>
  )
}

export default GiPreviewList
