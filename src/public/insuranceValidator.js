export default function ValidateNumber(mail) {
  if (
    /^[A-Za-z0-9]+$/.test(mail) &&
    mail !== undefined &&
    mail !== null
    // /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/.test(
    //   mail
    // )
  ) {
    return true;
  }
  return false;
}
