/* Proximus Controller */
var proximus = (function($, cookieCtrl) {
    
	var proximusObj = {
		defaultLngName: 'en',
		lngClass: '.i18n',
		lngImgClass: '.imgi18n',
		lngAtrrClass: '.i18nattr',
		lngAtrrClassName: 'dataSearch',
		cookieLangObjName: 'langObj',
		cookieName: 'lnp',
	};

	var replaceUrlParam = function(paramName, paramValue) {
		var url = location.href;
		var pattern = new RegExp(paramName + '=[a-z]+');
		document.cookie = paramName + "=" + paramValue + "; path=/";
		if (url.match(pattern)) {
			window.location = url.replace(pattern, paramName + '=' + paramValue);
		}
		else {
			window.location = url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue;
		}
	};

	var parse = function(val, defaultLngName) {
		var defaultvalue = cookieCtrl.read(proximusObj.cookieName) != null ? cookieCtrl.read(proximusObj.cookieName) : defaultLngName;
		var result = defaultvalue,
			tmp = [];
		location.search.substr(1).split("&")
			.forEach(function (item) {
				tmp = item.split("=");
				if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
			});
        
		cookieCtrl.create(proximusObj.cookieName,result);     
		return result;
	};

	var setupEventListeners = function(ObjectLang, defaultLngName) {
		var langObj = ObjectLang[parse(proximusObj.cookieName, defaultLngName)];

		$(proximusObj.lngClass).each(function () {

			try{
				if(langObj[$(this).attr('id')]){
					$(this).html(langObj[$(this).attr('id')]);
				}else{
					$(this).html($(this).attr('id'));
				}
			}catch(e){
				$(this).html($(this).attr('id'));
			}

		});

		$(proximusObj.lngAtrrClass).each(function () {
			try{
				if(langObj[$(this).attr('id')]){
					$(this).attr(proximusObj.lngAtrrClassName, langObj[$(this).attr('id')]);
				}else{
					$(this).attr(proximusObj.lngAtrrClassName, $(this).attr('id'));
				}
			}catch(e){
				$(this).attr(proximusObj.lngAtrrClassName, $(this).attr('id'));
			}

		});

		$(proximusObj.lngImgClass).each(function () {
			$(this).html(langObj[$(this).attr("src", $(this).attr("src").replace("_en", "_" + parse(proximusObj.cookieName, defaultLngName)))]);
		});
	};

	return {
		init: function(langObj, lng = proximusObj.defaultLngName) {
			setupEventListeners(langObj, lng);
		},

		changeLng: function(newLng) {
			replaceUrlParam(proximusObj.cookieName, newLng);
		},

		getProxStrings: function() {
			return proximusObj;
		}

	};
}(jQuery, cookie));

// Ejemplos
// proximus.init(bundle, es);