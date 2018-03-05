var localStorage = (function(window){

    // Creates and checks local storage exist
    var createLocalStorage = function(key, value) {
        if (key == null || key == undefined)
            return `LocalStorage key not set: ${key}`;

        if (value == null || value == undefined)
            return `LocalStorage Value not set: ${name}`;

        window.localStorage.setItem(key, value);

        if (readLocalStorage(key) != null)
            return "Cookie created";

        return null;
    };

    // Read and returns value of local storage if exist
    var readLocalStorage = function(key) {
        if (key == null || key == undefined)
            return `LocalStorage key not set: ${key}`;

        var newCookie = window.localStorage.getItem(key);

        if(newCookie.value != null)
            return newCookie;

        return null;
    };

    // Deletes local storage and return string if success full
    var deleteLocalStorage = function(key) {
        if (key == null || key == undefined)
            return `LocalStorage key not set: ${key}`;
        
        window.localStorage.removeItem(key);

        if(readLocalStorage(key))
            return "Cookie deleted";
        
        return null;
    };

    return{
        
        create: function(localStorageKey, localStorageValue) {
            return createLocalStorage(localStorageKey, localStorageValue);
        },
        
        read: function(localStorageKey) {
            return readLocalStorage(localStorageKey);
        },

        delete: function(localStorageKey) {
            return deleteLocalStorage(localStorageKey);
        },

        deleteAll: function() {
            window.localStorage.clear();
            return "All Local Storage clear";
        }
    };

}(window));