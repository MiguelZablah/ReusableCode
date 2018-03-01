"use strict";

var cookie = function (document) {

    // Create Cookie
    var createsCookie = function createsCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";

        if (readsCookie.length > 0) return "cookie create => Name: " + name + ", Value: " + value + ", Expires in: " + days + " days";

        return null;
    };

    // Reads Cookie
    var readsCookie = function readsCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();

        return null;
    };

    // Delete Cookie
    var deleteCookie = function deleteCookie(name) {
        createsCookie(name, "", -1);
        if (readsCookie.length > 0) return "Cookie Deleted";

        return null;
    };

    return {

        create: function create(cookieName, cookieValue) {
            var days = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

            return createsCookie(cookieName, cookieValue, days);
        },

        read: function read(cookieName) {
            return readsCookie(cookieName);
        },

        delete: function _delete(cookieName) {
            return deleteCookie(cookieName);
        }
    };
}(document);