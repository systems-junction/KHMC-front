export default function ValidateGender(input) {
  if (
    input === 'NULL' ||
    input === 'Null' ||
    input === 'null' ||
    input === '' ||
    input === undefined || input === null
  ) {
    return false
  }
  return true
}
