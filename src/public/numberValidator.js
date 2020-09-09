export default function ValidateNumber(mail) {
  if (
    /^[a-zA-Z0-9\-().\s]{10,15}$/.test(mail)
    // /\S+@\S+\.\S+/.test(mail)
  ) {
    return true
  }
  return false
}
