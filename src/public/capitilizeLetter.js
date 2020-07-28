export default (str) => {
  if (typeof(str)==='string') {
    var x = str.charAt(0).toUpperCase() + str.slice(1);
    // console.log(x);
    return x;
  }
  return str;
};
