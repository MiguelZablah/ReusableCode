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
<link rel="stylesheet" type="text/css" href="likesAndRating.css" />
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

## Video Player (Supports MP4 and MP3)

Requierd Css
```html
<!-- Font Awesome CDN -->
<script src="https://use.fontawesome.com/ceaa390e68.js"></script>
```

Install
```html
<!-- Add Video Player PlugIns JS and CSS -->
<script src="videoPlayerPlugIns-min.js"></script>
<link rel="stylesheet" type="text/css" href="videoPlayerPlugIns.css" />
<!-- Add Video Player JS -->
<script src="videoPlayers-min.js"></script>
```

Usage using Razor for display an array of items Example

Razor
```javascript
@{
// VideoPlayer array for mp4
    // Creates a list for all video url (in case more than 1 resolution)
    var videos = new List<string>();
    // Add each mp4 url to list
    foreach (var video in Model.(item))
    {
	    if (video.(url).Contains(".mp4"))
	    {
		    videos.Add(@video.(name));
	    }
    }
}


// Assume code will be inside a foreach with html items 
var isVideo = false; // Check if is .mp4
var sinlgeVideo = new List<string>(); // For multiple resolutions
foreach (var vid in videos)
{
    // If its a video add
    if (vid.Contains(clubItem.Name))
    {
        // Add all resolutions of that video
        sinlgeVideo.Add(@vid);
        isVideo = true;
    }
}
```

Html
```html
<!-- Add a parrent div to encapsulate code -->
<div>
    <!-- Container for video rendering -->
    <div id="vidItem-(item-name)">
    </div>
    <!-- Img to show when video not jet click -->
    <!-- Requierd class 'imgItem' for hide when video render -->
    <!-- Requierd class whith the '(item-name)' to know specific img for vid -->
    <img class="imgItem (item-name)" src="item-url" alt="...">
    
    <!-- Requierd class 'imgItem' for hide when video render -->
    <div class="card-img-text-container imgItem (item-name)">
        <!-- Play btn with onClik for Video Player -->
        <!-- Calls function 'videoP()' -->
        <i class="fa fa-play-circle" OnClick="videoP('(item-name)',
            <!-- if mp4 send 'playVide' else(asumes it's a mp3) 'playSong'  -->
            '@(isVideo ? "playVid" : "playSong")', 
            <!-- Sends if it has more than 1 resolution (if mp3 sends only 1)  -->
            '@string.Join("^-^", sinlgeVideo)', 
            <!-- Send Img Url  -->
            'item-url', 
            <!-- Send Category from witch item is  -->
            'item-category">
        </i>
    </div>
</div>
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