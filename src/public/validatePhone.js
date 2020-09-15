export default function validatePhone(phone) {
  let pattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  if (phone) {
    if (phone.length == 13 || phone.length == 12) {
      if (pattern.test(phone)) {

        return false;
      }
    }
    return true;
  }

  return true;
}
