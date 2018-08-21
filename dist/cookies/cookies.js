'use strict';

var cookie = function (document) {
	var createsCookie = function createsCookie(name, value, params) {
		var expires = '';

		if (params.days) {
			var date = new Date();
			date.setTime(date.getTime() + params.days * 24 * 60 * 60 * 1000);
			expires = 'expires=' + date.toUTCString();
		}

		if (name == null || name == undefined) return 'Cookie key not set: ' + name;

		if (value == null || value == undefined) return 'Cookie Value not set: ' + name;

		var cookie = name + '=' + value + ';' + expires + ';path=' + params.path + ';';

		if (params.domain != null) cookie = cookie + 'Domain=' + params.domain + ';';

		if (params.secure) cookie = cookie + 'secure;';

		if (params.httpOnly) cookie = cookie + 'HttpOnly;';

		if (params.sameSite != null) cookie = cookie + 'SameSite=' + params.sameSite + ';';

		document.cookie = cookie;

		if (readsCookie.length > 0) return 'cookie create => Name: ' + name + ', Value: ' + value + ', Expires in: ' + params.days + ' days';

		return null;
	};

	var readsCookie = function readsCookie(name) {
		if (name == null || name == undefined) return 'Cookie key not set: ' + name;

		var value = '; ' + document.cookie;
		var parts = value.split('; ' + name + '=');
		if (parts.length == 2) return parts.pop().split(';').shift();

		return null;
	};

	var deleteCookie = function deleteCookie(name) {
		if (name == null || name == undefined) return 'Cookie key not set: ' + name;

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
			    sameSite = _ref$sameSite === undefined ? 1 : _ref$sameSite,
			    _ref$secure = _ref.secure,
			    secure = _ref$secure === undefined ? false : _ref$secure,
			    _ref$httpOnly = _ref.httpOnly,
			    httpOnly = _ref$httpOnly === undefined ? false : _ref$httpOnly,
			    _ref$path = _ref.path,
			    path = _ref$path === undefined ? '/' : _ref$path,
			    _ref$domain = _ref.domain,
			    domain = _ref$domain === undefined ? null : _ref$domain,
			    _ref$days = _ref.days,
			    days = _ref$days === undefined ? 0 : _ref$days;

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