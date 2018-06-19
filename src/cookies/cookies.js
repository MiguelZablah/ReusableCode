var cookie = (function(document){

	// Create Cookie
	var createsCookie = function(name, value, days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = "; expires=" + date.toUTCString();
		}

		if (name == null || name == undefined)
			return `Cookie key not set: ${name}`;

		if (value == null || value == undefined)
			return `Cookie Value not set: ${name}`;

		document.cookie = name + "=" + value + expires + "; path=/";

		if(readsCookie.length > 0)
			return `cookie create => Name: ${name}, Value: ${value}, Expires in: ${days} days`;
            
		return null;
	};

	// Reads Cookie
	var readsCookie = function(name) {
		if (name == null || name == undefined)
			return `Cookie key not set: ${name}`;

		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length == 2)
			return parts.pop().split(";").shift();
        
		return null;
	};

	// Delete Cookie
	var deleteCookie = function(name) {
		if (name == null || name == undefined)
			return `Cookie key not set: ${name}`;
        
		createsCookie(name,"",-1);
		if(readsCookie.length > 0)
			return "Cookie Deleted";
            
		return null;
	};

	return{
        
		create: function(cookieName, cookieValue, days = 10) {
			return createsCookie(cookieName, cookieValue, days);
		},
        
		read: function(cookieName) {
			return readsCookie(cookieName);
		},

		delete: function(cookieName) {
			return deleteCookie(cookieName);
		}
	};

}(document));
