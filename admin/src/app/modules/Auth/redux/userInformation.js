const ipAsync = async () => {
  return "1.1.1.1";
};

const getBrowser = () => {
  var ua = window.navigator.userAgent;
  var b;
  var browser;
  if (ua.indexOf("Opera") !== -1) {
    b = browser = "Opera";
  }

  if (ua.indexOf("Firefox") !== -1 && ua.indexOf("Opera") === -1) {
    b = browser = "Firefox";
  }

  if (ua.indexOf("Chrome") !== -1) {
    b = browser = "Chrome";
  }

  if (ua.indexOf("Safari") !== -1 && ua.indexOf("Chrome") === -1) {
    b = browser = "Safari";
  }

  if (
    ua.indexOf("MSIE") !== -1 &&
    ua.indexOf("Opera") === -1 &&
    ua.indexOf("Trident") === -1
  ) {
    b = "MSIE";
    browser = "Internet Explorer";
  }

  if (ua.indexOf("Trident") !== -1) {
    b = "Trident";
    //eslint-disable-next-line
    browser = "Internet Explorer";
  }

  var version = ua.match(b + "[ /]+[0-9]+(.[0-9]+)*")[0];

  return version;
};

export const addUserDetails = async (user) => {
  const ipaddress = await ipAsync();
  const browser = getBrowser();
  const device = window.navigator.platform;
  const date = Date.now();
  const country = "India";
  const state = "Gujrat";
  return {
    ...user,
    ipaddress,
    browser,
    device,
    date,
    country,
    state,
  };
};
