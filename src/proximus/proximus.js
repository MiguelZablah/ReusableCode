/* Proximus Controller */
var proximus = (function($, cookieCtrl) {
    
	var proximusObj = {
		defaultLngName: 'en',
		defaultcookieName: 'lnp',
		lngByIdClass: '.i18n',
		lngImgClass: '.imgi18n',
		lngByAtrrClass: '.i18nattr',
		lngAtrrName: 'lngTag'
	};

	var replaceUrlParam = function(cookieName, paramValue) {
		var url = location.href;
		var pattern = new RegExp(cookieName + '=[a-z]+');
		document.cookie = cookieName + '=' + paramValue + '; path=/';
		if (url.match(pattern)) {
			window.location = url.replace(pattern, cookieName + '=' + paramValue);
		}
		else {
			window.location = url + (url.indexOf('?') > 0 ? '&' : '?') + cookieName + '=' + paramValue;
		}
	};

	var parse = function(cookieName, defaultLngName) {
		var defaultvalue = cookieCtrl.read(cookieName) != null ? cookieCtrl.read(cookieName) : defaultLngName;
		var result = defaultvalue,
			tmp = [];
		location.search.substr(1).split("&")
			.forEach(function (item) {
				tmp = item.split('=');
				if (tmp[0] === cookieName) result = decodeURIComponent(tmp[1]);
			});
        
		cookieCtrl.create(cookieName,result);     
		return result;
	};

	var setupEventListeners = function(ObjectLang, cookieValue, cookieName) {
		var langObj = ObjectLang[parse(cookieName, cookieValue)];

		$(proximusObj.lngByIdClass).each(function() {

			try{
				if(langObj[$(this).attr('id')]){
					$(this).html(langObj[$(this).attr('id')]);
				}else if(!$(this).attr('id')){
					$(this).html('Missing id value');
				}else{
					$(this).html($(this).attr('id'));
				}
			}catch(e){
				console.log(e);
			}

		});

		$(proximusObj.lngByAtrrClass).each(function() {
			try{
				if(langObj[$(this).attr(proximusObj.lngAtrrName)]){
                    $(this).html(langObj[$(this).attr(proximusObj.lngAtrrName)]);
				}else if(!$(this).attr(proximusObj.lngAtrrName)){
					$(this).html(`Missing ${proximusObj.lngAtrrName} value`);
				}else{
                    $(this).html($(this).attr(proximusObj.lngAtrrName));
				}
			}catch(e){
                console.log(e);
			}
		});
		
		// Note: add a way to add your tagname and change that tag name base on your obj
        // $(proximusObj.lngAtrrClass).each(function() {
		// 	try{
		// 		if(langObj[$(this).attr('id')]){
		// 			$(this).attr(proximusObj.lngAtrrName, langObj[$(this).attr('id')]);
		// 		}else{
		// 			$(this).attr(proximusObj.lngAtrrName, $(this).attr('id'));
		// 		}
		// 	}catch(e){
		// 		$(this).attr(proximusObj.lngAtrrName, $(this).attr('id'));
		// 	}
		// });

		// Will change img src to what you difine on bundle
		$(proximusObj.lngImgClass).each(function() {
			if(langObj[$(this).attr(proximusObj.lngAtrrName)]){
				$(this).attr('src', langObj[$(this).attr(proximusObj.lngAtrrName)]);
			}
			// If is not in language object it will not be change
		});
	};

	return {
		init: function(langObj, lng = proximusObj.defaultLngName, cookieName = proximusObj.defaultcookieName) {
			setupEventListeners(langObj, lng, cookieName);
		},

		change: function(newValue, cookieName = proximusObj.defaultcookieName) {
			replaceUrlParam(cookieName, newValue);
		},

		getVariables: function() {
			return proximusObj;
		}

	};
}(jQuery, cookie));

// Init
// proximus.init(bundle, "es", "lnp");

// Change language
// change('es', 'ln');

// Get all variables
// getVariables();


// Next version without using JQuery
// Get a NodeList of all .demo elements
// const demoClasses = document.querySelectorAll('.demo-class');

// Change the text of multiple elements with a loop
// demoClasses.forEach(element => {
//   element.textContent = 'All demo classes updated.';
// });

// Access the first element in the NodeList
// demoClasses[0];