export const regexValidation = {
     URL_REGEX: /(((https?):\/\/)(www.)?)[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
     CONTACT_NUMBER_REGEX: /(\+\d{1,3})(((\d{3}))|(\d{3}))(\d{3})(\d{4})/,
     MOBILE_NUMBER_REGEX: /^[0-9+]{8,15}$/,
     USERNAME_REGEX: /^[a-zA-Z0-9-_]{1,}$/
}