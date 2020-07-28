const mapDateToKeys = (val) => {
  if (
    val === 'date' ||
    val === 'createdAt' ||
    val === 'dateGenerated' ||
    val === 'updatedAt' ||
    val === 'dateReceived' ||
    (val[0] === 'poId' && val[1] === 'sentAt')
  ) {
    return true
  }
}

export default mapDateToKeys
