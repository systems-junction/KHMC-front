export default function ValidateInput(input) {
  if (
    /^[A-Za-z]+$/.test(input)
    // /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/.test(
    //   input
    // )
  ) {
    return true
  }
  return false
}
