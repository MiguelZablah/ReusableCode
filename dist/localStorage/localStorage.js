"use strict";

var localStorage = function (window) {

    var createLocalStorage = function createLocalStorage(key, value) {
        window.localStorage.setItem(key, value);

        if (readLocalStorage(key) != null) return "Cookie created";

        return null;
    };

    var readLocalStorage = function readLocalStorage(key) {
        var newCookie = window.localStorage.getItem(key);
        if (newCookie.value != null) return newCookie;

        return null;
    };

    var deleteLocalStorage = function deleteLocalStorage(key) {
        window.localStorage.removeItem(key);

        if (readLocalStorage(key)) return "Cookie deleted";

        return null;
    };

    return {

        create: function create(localStorageKey, localStorageValue) {
            return createLocalStorage(localStorageKey, localStorageValue);
        },

        read: function read(localStorageKey) {
            return readLocalStorage(localStorageKey);
        },

        delete: function _delete(localStorageKey) {
            return deleteLocalStorage(localStorageKey);
        },

        deleteAll: function deleteAll() {
            window.localStorage.clear();
            return "All Local Storage clear";
        }
    };
}(window);