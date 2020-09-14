export default function ValidateNumber(mail) {
  if (/[+-]?([0-9]*[.])?[0-9]+/.test(mail)) {
    return true
  }
  return false
}
