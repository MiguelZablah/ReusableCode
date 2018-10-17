"use strict";

var cookie = function (document) {
  var createsCookie = function createsCookie(name, value, params) {
    var expires = '';

    if (params.days) {
      var date = new Date();
      date.setTime(date.getTime() + params.days * 24 * 60 * 60 * 1000);
      expires = 'expires=' + date.toUTCString();
    }

    if (name == null || name == undefined) return "Cookie key not set: ".concat(name);
    if (value == null || value == undefined) return "Cookie Value not set: ".concat(name);
    var cookie = "".concat(name, "=").concat(value, ";").concat(expires, ";path=").concat(params.path, ";");
    if (params.domain != null) cookie = "".concat(cookie, "Domain=").concat(params.domain, ";");
    if (params.secure) cookie = "".concat(cookie, "secure;");
    if (params.httpOnly) cookie = "".concat(cookie, "HttpOnly;");
    if (params.sameSite != null) cookie = "".concat(cookie, "SameSite=").concat(params.sameSite, ";");
    document.cookie = cookie;
    if (readsCookie.length > 0) return "cookie create => Name: ".concat(name, ", Value: ").concat(value, ", Expires in: ").concat(params.days, " days");
    return null;
  };

  var readsCookie = function readsCookie(name) {
    if (name == null || name == undefined) return "Cookie key not set: ".concat(name);
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length == 2) return parts.pop().split(';').shift();
    return null;
  };

  var deleteCookie = function deleteCookie(name) {
    if (name == null || name == undefined) return "Cookie key not set: ".concat(name);
    createsCookie(name, '', {
      path: '/',
      days: -1
    });
    if (readsCookie.length > 0) return 'Cookie Deleted';
    return null;
  };

  return {
    create: function create(cookieName, cookieValue) {
      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref$sameSite = _ref.sameSite,
          sameSite = _ref$sameSite === void 0 ? 1 : _ref$sameSite,
          _ref$secure = _ref.secure,
          secure = _ref$secure === void 0 ? false : _ref$secure,
          _ref$httpOnly = _ref.httpOnly,
          httpOnly = _ref$httpOnly === void 0 ? false : _ref$httpOnly,
          _ref$path = _ref.path,
          path = _ref$path === void 0 ? '/' : _ref$path,
          _ref$domain = _ref.domain,
          domain = _ref$domain === void 0 ? null : _ref$domain,
          _ref$days = _ref.days,
          days = _ref$days === void 0 ? 0 : _ref$days;

      if (sameSite === 1) sameSite = null;
      if (sameSite === 2) sameSite = 'Strict';
      if (sameSite === 3) sameSite = 'Lax';
      return createsCookie(cookieName, cookieValue, {
        sameSite: sameSite,
        secure: secure,
        httpOnly: httpOnly,
        path: path,
        domain: domain,
        days: days
      });
    },
    read: function read(cookieName) {
      return readsCookie(cookieName);
    },
    delete: function _delete(cookieName) {
      return deleteCookie(cookieName);
    }
  };
}(document);