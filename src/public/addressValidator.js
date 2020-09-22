export default function ValidateAddress(input) {
  if (
    // /^[A-Za-z]+$/.test(input)
    // /^[a-zA-Z'0-9._ ]*$/.test(input) &&
    // input !== 'NULL' &&
    // input !== 'Null' &&
    // input !== 'null' &&
    input !== '' &&
    input !== undefined &&
    input !== null
  ) {
    return true
  }
  return false
}
