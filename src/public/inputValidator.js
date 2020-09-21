export default function ValidateInput(input) {
  if (
    // /^[A-Za-z]+$/.test(input)
    /^[a-zA-Z'_ ]*$/.test(input) &&
    input !== 'NULL' &&
    input !== 'Null' &&
    input !== 'null' &&
    input !== '' &&
    input !== undefined &&
    input !== null
  ) {
    return true
  }
  return false
}
