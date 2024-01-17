module.exports = {
  emailRegEx:
    /^[A-Za-z\d\.\_\-\+]{2,64}\@([A-Za-z\d\-\_]{1,256})\.[A-Za-z\d]+(.[A-Za-z\d]+)?$/,
  passwordRegEx: /^[a-zA-Z0-9-_\!\@\#\$\%\^&\*]{6,15}$/,
  passwordAppRegEx: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d!@#$%_]{8,15}$/,
  otpRegEx: /^[0-9]{6}$/,
  phoneRegEx: /(\+\d{1,3})(((\d{3}))|(\d{3}))(\d{3})(\d{4})/,
  nameRegExp: /^[a-z\sA-z]{50}$/,
  nickNameRegEx: /^[a-z0-9]{30}$/,
  percentageRegEx: /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/,
  addressRegEx: /^0x[a-fA-F0-9]{40}$/,
  countryCodeRegEx: /^(\+?\d{1,3}|\d{1,4})$/,
  countryCharRegEx: /^[A-Z]{2,3}$/i,
  walletAddressRegEx: /^0x[a-fA-F0-9]{40}$/,
  mobileNoRegEx: /^[0-9+]{8,15}$/,
  tagRegEx: /\@\w+\b/g,
  hashTagRegEx: /\#\w+\b/g,
  userNameRegEx: /^[a-zA-Z0-9-_]{1,}$/
};
