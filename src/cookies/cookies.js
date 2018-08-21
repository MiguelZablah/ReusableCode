let cookie = (function(document) {
	// Create Cookie
	const createsCookie = (name, value, params) => {
		let expires = '';

		if (params.days) {
			var date = new Date();
			date.setTime(date.getTime() + params.days * 24 * 60 * 60 * 1000);
			expires = 'expires=' + date.toUTCString();
		}

		if (name == null || name == undefined) return `Cookie key not set: ${name}`;

		if (value == null || value == undefined) return `Cookie Value not set: ${name}`;

		let cookie = `${name}=${value};${expires};path=${params.path};`;

		if (params.domain != null) cookie = `${cookie}Domain=${params.domain};`;

		if (params.secure) cookie = `${cookie}secure;`;

		if (params.httpOnly) cookie = `${cookie}HttpOnly;`;

		if (params.sameSite != null) cookie = `${cookie}SameSite=${params.sameSite};`;

		document.cookie = cookie;

		if (readsCookie.length > 0)
			return `cookie create => Name: ${name}, Value: ${value}, Expires in: ${
				params.days
			} days`;

		return null;
	};

	// Reads Cookie
	const readsCookie = name => {
		if (name == null || name == undefined) return `Cookie key not set: ${name}`;

		let value = '; ' + document.cookie;
		let parts = value.split('; ' + name + '=');
		if (parts.length == 2)
			return parts
				.pop()
				.split(';')
				.shift();

		return null;
	};

	// Delete Cookie
	const deleteCookie = name => {
		if (name == null || name == undefined) return `Cookie key not set: ${name}`;

		createsCookie(name, '', {
			path: '/',
			days: -1,
		});

		if (readsCookie.length > 0) return 'Cookie Deleted';

		return null;
	};

	return {
		create(
			cookieName,
			cookieValue,
			{ sameSite = 1, secure = false, httpOnly = false, path = '/', domain = null, days = 0 } = {}
		) {
			if (sameSite === 1) sameSite = null;

			if (sameSite === 2) sameSite = 'Strict';

			if (sameSite === 3) sameSite = 'Lax';

			return createsCookie(cookieName, cookieValue, {
				sameSite,
				secure,
				httpOnly,
				path,
				domain,
				days
			});
		},

		read(cookieName) {
			return readsCookie(cookieName);
		},

		delete(cookieName) {
			return deleteCookie(cookieName);
		}
	};
})(document);
