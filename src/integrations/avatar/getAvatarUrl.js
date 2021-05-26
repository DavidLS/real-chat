const getAvatarUrl = (userName) => {
  const encodedUri = encodeURI(userName)
  return `https://ui-avatars.com/api/?name=${encodedUri}`
}

export default getAvatarUrl
