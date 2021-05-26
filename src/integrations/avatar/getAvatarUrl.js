const getAvatarUrl = (userName) => {
  const encodedUri = encodeURI(userName)
  return `https://ui-avatars.com/api/?name=${encodedUri}&background=EEEEEE`
}

export default getAvatarUrl
