## Reusable Code

All of this code uses JQuery
```html
<!-- I use JQuery 3.3.1 CDN -->
<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
```

## Likes and Rating

Requierd CSS and JS
```html
<!-- My cookies and Local Storage controller -->
<script src="cookies-min.js"></script>
<!-- Firebase CDN -->
<script src="https://www.gstatic.com/firebasejs/4.9.1/firebase.js"></script>
<!-- Optional => Font Awesome CDN (I use it for the thumbs Up Icon) -->
<script src="https://use.fontawesome.com/ceaa390e68.js"></script>
```

Install
```html
<!-- Add cookies JS -->
<script src="likesAndRating-min.js"></script>
<script src="likesAndRating.css"></script>
```

Add firebase configuration
```javascript
// Initialize FireBase for lang
firebase.initializeApp({
    apiKey: "yourkey",
    authDomain: "yourDomain",
    databaseURL: "yourUrl",
    storageBucket: "yourBucket",
});

// Sets where the items will be save
var RTbase = "RateLike";

// Inicialize variables
var db = firebase.database();
var pageData = db.ref(RTbase);
```

Html example
```html
<!-- For Rating just add -->
<div id="rateYo-(item-Id)" class="card-rating"></div>
<!-- For Likes add somthing like this -->
<div class="like-content likeRate" likeRate="(item-Id)">
    <button onclick="itemLike('item-Id')" class="btn btn-custom">
        <i class="fa fa-thumbs-up" aria-hidden="true"></i> 
        Like
    </button>
    <span id="likeN-(item-Id)" class="likeText">0 likes</span>
</div>
```

Javascrip usage Example
```javascript
//  Likes and Rating use Example
$(document).ready(function() {
    // Gets url
    var pathOn = window.location.href;
    // If you are in category
    if (~pathOn.indexOf("Category")){
        // get Id for each item
        var IdsArray = $(".likeRate").map(function() { return $(this).attr("likeRate"); }).get();
        // Rating init
        IdsArray.forEach(function(id) {
            // Get Likes for items
            getItemLikes(id);
            // initializa rateYo plugin for each item
            var rateYo = $("#rateYo-"+id).rateYo({ halfStar: true });
            // Gets rating for items
            rateGame(id, rateYo);
            getRating(id, rateYo);
        });
    }
});
```

## Cookies

Install
```html
<!-- Add cookies JS -->
<script src="cookies-min.js"></script>
```

Function available
```javascript
// Creates Cookie
/*
* If Cookie was not created return null
* If it was creted return a string with what it was created
* durationInDays is optional, by default its 10 days
*/
cookie.create(cookieName, cookieValue, durationInDays);

// Read Cookie
/*
* Return value of cookie
* No value return null
*/
cookie.read(cookieName);

// Delete Cookie
/*
* If Cookie was not delete return null
* If it was delete return a confirmation string
*/
cookie.delete(cookieName);
```

## Local Storage

Install
```html
<!-- Add Local Storage JS -->
<script src="localStorage-min.js"></script>
```

Function available
```javascript
// Creates Local Storage
/*
* If Local Storage was not created return null
* If it was creted return a string with what it was created
*/
localStorage.create(localStorageKey, localStorageValue);

// Read Local Storage
/*
* Return value of Local Storage
* No value return null
*/
localStorage.read(localStorageKey);

// Delete Local Storage
/*
* If Local Storage was not delete return null
* If it was delete return a confirmation string
*/
localStorage.delete(localStorageKey);

// Deletes All Local Storage
localStorage.deleteAll();
```