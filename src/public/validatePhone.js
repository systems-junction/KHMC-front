export default function validatePhone(phone) {
  console.log("====================================");
  console.log(phone);
  console.log("====================================");
  if (phone != undefined || phone != null) {
    if (phone.length == 13 || phone.length == 12) {
      if (/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phone)) {
        return true;
      }
    }
  }

  return false;
}
