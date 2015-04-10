utils = {};

utils.formatS3 = function (str) {
  return str.replace(/[`~!@#$%^&*()|+=÷¿?;:'",.<>\{\}\[\]\\\/]/gi, '')
  .replace(/ /gi, '-')
  .toLowerCase();
}