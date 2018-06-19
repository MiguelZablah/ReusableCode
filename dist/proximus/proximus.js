'use strict';

var proximus = function ($, cookieCtrl) {

	var proximusObj = {
		defaultLngName: 'en',
		defaultcookieName: 'lnp',
		lngByIdClass: '.i18n',
		lngImgClass: '.imgi18n',
		lngByAtrrClass: '.i18nattr',
		lngAtrrName: 'lngTag'
	};

	var replaceUrlParam = function replaceUrlParam(cookieName, paramValue) {
		var url = location.href;
		var pattern = new RegExp(cookieName + '=[a-z]+');
		document.cookie = cookieName + '=' + paramValue + '; path=/';
		if (url.match(pattern)) {
			window.location = url.replace(pattern, cookieName + '=' + paramValue);
		} else {
			window.location = url + (url.indexOf('?') > 0 ? '&' : '?') + cookieName + '=' + paramValue;
		}
	};

	var parse = function parse(cookieName, defaultLngName) {
		var defaultvalue = cookieCtrl.read(cookieName) != null ? cookieCtrl.read(cookieName) : defaultLngName;
		var result = defaultvalue,
		    tmp = [];
		location.search.substr(1).split("&").forEach(function (item) {
			tmp = item.split('=');
			if (tmp[0] === cookieName) result = decodeURIComponent(tmp[1]);
		});

		cookieCtrl.create(cookieName, result);
		return result;
	};

	var setupEventListeners = function setupEventListeners(ObjectLang, cookieValue, cookieName) {
		var langObj = ObjectLang[parse(cookieName, cookieValue)];

		$(proximusObj.lngByIdClass).each(function () {

			try {
				if (langObj[$(this).attr('id')]) {
					$(this).html(langObj[$(this).attr('id')]);
				} else if (!$(this).attr('id')) {
					$(this).html('Missing id value');
				} else {
					$(this).html($(this).attr('id'));
				}
			} catch (e) {
				console.log(e);
			}
		});

		$(proximusObj.lngByAtrrClass).each(function () {
			try {
				if (langObj[$(this).attr(proximusObj.lngAtrrName)]) {
					$(this).html(langObj[$(this).attr(proximusObj.lngAtrrName)]);
				} else if (!$(this).attr(proximusObj.lngAtrrName)) {
					$(this).html('Missing ' + proximusObj.lngAtrrName + ' value');
				} else {
					$(this).html($(this).attr(proximusObj.lngAtrrName));
				}
			} catch (e) {
				console.log(e);
			}
		});

		$(proximusObj.lngImgClass).each(function () {
			if (langObj[$(this).attr(proximusObj.lngAtrrName)]) {
				$(this).attr('src', langObj[$(this).attr(proximusObj.lngAtrrName)]);
			}
		});
	};

	return {
		init: function init(langObj) {
			var lng = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : proximusObj.defaultLngName;
			var cookieName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : proximusObj.defaultcookieName;

			setupEventListeners(langObj, lng, cookieName);
		},

		change: function change(newValue) {
			var cookieName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : proximusObj.defaultcookieName;

			replaceUrlParam(cookieName, newValue);
		},

		getVariables: function getVariables() {
			return proximusObj;
		}

	};
}(jQuery, cookie);