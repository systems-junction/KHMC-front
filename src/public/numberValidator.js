export default function ValidateNumber(mail) {
  if (
    // /^[a-zA-Z0-9\-().\s]{10,15}$/.test(mail)
    // /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/.test(mail)
    // /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$.test(mail)
    /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(mail)
  ) {
    return true
  }
  return false
}
