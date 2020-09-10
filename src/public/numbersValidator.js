export default function ValidateNumber(mail) {
  if (/^[0-9]\d*$/.test(mail)) {
    return true
  }
  return false
}
