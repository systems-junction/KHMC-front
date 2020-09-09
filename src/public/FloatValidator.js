export default function ValidateNumber(mail) {
  if (/^(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(mail)) {
    return true
  }
  return false
}
