export default function ValidateInput(input) {
  if (
    // /^[A-Za-z]+$/.test(input)
    /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(input)
  ) {
    return true
  }
  return false
}
