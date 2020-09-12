export default function ValidateInput(input) {
  if (
    // /^[A-Za-z]+$/.test(input)
    /^[a-zA-Z_ ]*$/.test(input)
  ) {
    return true
  }
  return false
}
