export default function ValidateNumber(mail) {
  if (
    // /^(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(mail)
    /^[0-9]+\.[0-9]+$/.test(mail)
  ) {
    return true
  }
  return false
}
