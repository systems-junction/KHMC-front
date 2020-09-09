export default function ValidateNumber(mail) {
  if (/^[1-9]\d*$/.test(mail)) {
    return true
  }
  return false
}
