export default function ValidateCountryCity(input) {
  if (
    input === 'NULL' ||
    input === 'Null' ||
    input === 'null' ||
    input === '' ||
    input === undefined ||
    input === null
  ) {
    return false
  }
  return true
}
