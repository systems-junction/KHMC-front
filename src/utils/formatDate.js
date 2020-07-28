const formatDate = (date) => {
  const d = new Date(date)
  return (
    d.getDate() +
    '/' +
    (d.getMonth() + 1) +
    '/' +
    d.getFullYear() +
    ' ' +
    d.toLocaleTimeString()
  )
}

export default formatDate
