## Reusable Code

This Project is for documentation and easy acces to some stuff that I used personally but you can use it if you wish maybe it helps you or someone out there...

### Requierments
All of this code uses JQuery
```html
<!-- I use JQuery 3.3.1 CDN -->
<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
```

## Table of Content
**1. (Not longer supported) [Proximus](#proximus)**<br>
**2. [Likes and Rating](#likes-and-rating)**<br>
**3. [Video Player](#video-player)**<br>
**4. [Search Bar](#search-bar)**<br>
**5. [Pager with bootPag](#pager-with-bootpag)**<br>
**6. [Cookies](#cookies)**<br>
**7. [Local Storage](#local-storage)**<br>

**[MIT License](#license)**<br>

## Proximus

(Not longer supported)

There is a newer version witch dosen't use JQuery and will become the new supported proximus.
[NEW PROXIMUS!](https://github.com/MiguelZablah/Proximus)

Install JS
```html
<!-- My cookies JS -->
<script src="cookies-min.js"></script>
<!-- My cookies JS -->
<script src="proximus-min.js"></script>
```

Text change with class i18n, usage example:
```html
<!-- Proximus will change the inside of the h1 tags to the one define in the language object  -->
<!-- Proximus knows you want to change the inside of this because of the class 'i18n'  -->
<!-- Proximus will take the 'id' and look for a key with that same 'id' and set it's value  -->
<!-- Note: If the key is not found proximus will set the inside with the 'id' name -->
<h1 class="i18n" id="title"></h1>
<!-- If we use the configuration of the simple initialization example --> 
<!-- Then this will be the result: -->
<h1 class="i18n" id="title">Hello world!</h1>
```

Text change with class i18nAtt, usage example:
```html
<!-- Proximus will change the inside of the h1 tags to the one define in the language object  -->
<!-- Proximus knows you want to change the inside of this because of the class 'i18nAtt'  -->
<!-- Proximus will take the 'data-i18n' and look for a key with that same 'data-i18n' and set it's value  -->
<!-- Note: If the key is not found proximus will set the inside with the 'data-i18n' name -->
<h1 class="i18nAtt" data-i18n="title"></h1>
<!-- If we use the configuration of the simple initialization example --> 
<!-- Then this will be the result: -->
<h1 class="i18nAtt" data-i18n="title">Hello world!</h1>
```

Src change with class imgi18n, usage example:
```html
<!-- Proximus will change the inside of the 'src' tag for what you specify in the language object if it's define -->
<!-- Proximus knows you want to change this because of the class 'imgi18n'  -->
<!-- Proximus will take the data-i18n and look for a key with that same data-i18n and set it's value  -->
<!-- Note: If the key is not found proximus will not change the src -->
<img class="imgi18n" data-i18n="logo" src="../img/placeholder.png"></img>
<!-- If we use the configuration of the simple initialization example --> 
<!-- Then this will be the result: -->
<img class="imgi18n" data-i18n="logo" src="../img/logo.png"></img>
```

Simple initialization
```javascript
// Create your language object
var langObj = {
    'en':{
        "title":"Hello world!",
        "logo": "../img/logo.png"
    },
    'es':{
        'title': "Hola mundo",
    }
}
// Initialize Proximus
/*
* 1. The language object ir Required.
* 2. Default staring language is 'en'.
* 3. Default cookie is lng.
*/
proximus.init(langObj);
```

Complex initialization
```javascript
// Create your language object
var langObj = {
    'en':{
        "title":"Hello world!",
    },
    'es':{
        'title': "Hola mundo",
    }
}
/*
* 1. The language object ir Required.
* 2. Default staring language is 'en', but here I set it to 'es'.
* 3. Default cookie is 'lng', but here I set it to 'lang'.
*/
proximus.init(langObj, 'es', 'lang');
```

Utils functions
```javascript
// You can change the cookie with this function
/*
* 1. The value variable is Required and will definde to what the language cookie will be change to.
* 2. The cookie name is optional and by default it will be 'lng'.
*/
proximus.change('es', 'lnp');

// Will return and obj with default values and the variables use by proximus
proximus.getVariables();

/* Returns:
* var proximusObj = {
*   defaultLngName: 'en',
*   defaultcookieName: 'lng',
*   lngByIdClass: '.i18n',
*   lngImgClass: '.imgi18n',
*   lngByAtrrClass: '.i18nAtt',
*   lngAtrrName: 'data-i18n'
* };
*/
```

## Likes and Rating

Requierd CSS and JS
```html
<!-- My cookies JS -->
<script src="cookies-min.js"></script>
<!-- Firebase CDN -->
<script src="https://www.gstatic.com/firebasejs/4.9.1/firebase.js"></script>
<!-- Optional => Font Awesome CDN (I use it for the thumbs Up Icon) -->
<script src="https://use.fontawesome.com/ceaa390e68.js"></script>
```

Install
```html
<!-- Add Likes and Rating JS and CSS -->
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
<div id="rateYo-item-Id" class="card-rating"></div>
<!-- For Likes add somthing like this -->
<div class="like-content likeRate" likeRate="item-Id">
    <button onclick="itemLike('item-Id')" class="btn btn-custom">
        <i class="fa fa-thumbs-up" aria-hidden="true"></i> 
        Like
    </button>
    <span id="likeN-item-Id" class="likeText">0 likes</span>
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

## Video Player

Supports MP4 and MP3**<br>

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

Example using Razor

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

## Search Bar

Install
```html
<!-- Add Search Bar JS -->
<script src="searchBar-min.js"></script>
```

Recommended CSS
```css
.autocomplete-suggestions { 
    border: 1px solid #e0e0e0;
    background: #fbfbfb;
    overflow: auto;
    color: #252525;
    box-shadow: 4px 5px 8px #696969cc;
}
.autocomplete-suggestion { 
    padding: 2px 5px; 
    white-space: nowrap; 
    overflow: hidden; 
}
.autocomplete-selected { 
    background: #F0F0F0; 
}
.autocomplete-suggestions strong { 
    font-weight: normal; 
    color: #f84949; 
}
.autocomplete-group { 
    padding: 2px 5px; 
}
.autocomplete-group strong { 
    display: block; 
    border-bottom: 1px solid #000; 
}
```

Example using Razor
```html
<!-- Search Box Fill -->
<ul style="display: none;" class="searchItemList">
	@foreach (var item in items.OrderBy(cz => cz.Name)){
        <li url="item-url">item-name</li>
	}
</ul>
<!-- /Search Box Fill -->
```

Search Input
```html
<input id="autocomplete" type="text" placeholder="Search...">
<button class="searchBtn" type="submit" value="Search">Search</button>
```

## Pager with bootPag

Installation without bootstrap
```html
<!-- Add cookies JS -->
<script src="cookies-min.js"></script>
<!-- Add bootpag CSS and JS -->
<link rel="stylesheet" type="text/css" href="bootpag.css" />
<script src="bootpag-min.js"></script>
<!-- Add Pager -->
<script src="pager-min.js"></script>
```

Installation using bootstrap 4
```html
<!-- Add bootstrap Code here -->
<!-- Add cookies JS -->
<script src="cookies-min.js"></script>
<!-- Add bootpag CSS and JS -->
<link rel="stylesheet" type="text/css" href="bootpagB4.css" />
<script src="bootpagB4-min.js"></script>
<!-- Add Pager -->
<script src="pager-min.js"></script>
```

Simple Html Example Usage
```html
<!-- Pager Container -->
<div class="pager-container">
    <div class="pager-item" id="1">
        <!-- stuf and things... -->
    </div>
    <div class="pager-item" id="2">
        <!-- stuf and things... -->
    </div>
</div>
<!-- /Pager Container -->
<!-- PAGINATION -->
<ul id="paginator" class="pagination clearfix">
    <div id="pager-pagination"></div>
</ul>
<!-- /PAGINATION -->
```

Simple JS Example Usage
```javascript
pager.init('categoryName', 2);
```

Function available
```javascript
// Complex Pager init usage
/*
* Return a string that ca be use for debuging
* 1. First argument should be a string with the name of the pager to save in cookie the page you are.
* 2. Second argument should be a number with the number of pages it will have
* 3. Third argument is an optianl value and should be a boolean for deleting when in index(@razer Only), by default is false
* 4. Fourth argument is an optianl value and should be a string with a a custom arrow for next, by default is "»"
* 5. Fifth argument is an optianl value and should be a string with a a custom arrow for next, by default is "«"
*/
pager.init('categoryName', 
            5, 
            true,
            '<i class="fa fa-arrow-right" aria-hidden="true"></i>', 
            '<i class="fa fa-arrow-left" aria-hidden="true"></i>');

// Pager restar
/*
* Return a string that can be use for debuging
* Deletes storage of pager in cookies
*/
pager.restart();
```

Real Example using razer foreach
```html
<!-- Pager Razer Variables -->
@{
    var pageCounter=0;
    var totalItems= 1;
    var pageCounterGlobal=1;
    var catego= Model.Name;
    var itemsPerPage=10;
}
<!-- /Pager Razer Variables -->
<!-- Pager Container -->
<div class="pager-container">
    @foreach (var item in itemObj)
    {
        if(totalItems>=1 && totalItems<=itemsPerPage){
            var idPage="page" + pageCounterGlobal; 
                    <div class="pager-item" id="@idPage" data-animated="fadeInUp">
                        @item.Name
                    </div>
            pageCounter = pageCounterGlobal;
        }
        if(totalItems==itemsPerPage){
            totalItems=0;
            pageCounterGlobal++;
        }
        totalItems ++;
    }
</div>
<!-- /Pager Container -->

<!-- PAGINATION -->
<ul id="paginator" class="pagination clearfix">
    <div id="pager-pagination"></div>
</ul>
<!-- /PAGINATION -->

<!-- JS for pager -->
<script>
    // Send categoryName(as string), pageTotal(in number), and true(for delete on index/home)
    pager.init('@catego', @pageCounter, true);
</script>
<!-- /JS for pager -->
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
* If CookieName or CokieValue null or undifine will not create cookie and will return string with error
* If Cookie was not created return null
* If it was creted return a string with what it was created
* It recive the following object:
sameSite: that it has 3 options: 
** 1 that is the default value that will not set sameSite parrameter 
** 2 that will set the sameSite parrameter to Strict
** 3 that will set the sameSite parrameter to Lax
secure: that is a boolean:
** if true it will set the secure parrameter (secure parrameter will set cookie to only be request by https)
** if false it will not set parrameter
** by default is False. 
httpOnly: that is a boolean:
** if true it will set the httpOnlt parrameter (HTTP-only cookies aren't accessible via JavaScript through the Document.cookie)
** if false it will not set parrameter
** by default is False. 
path: that is a string:
** it will set the page path if sent
** by default is '/'
domain: this is a string:
** it will set the cookie domain
** by default is null and it will not set parrameter (defaults to the host portion of the current document location (but not including subdomains))
days: that is a number:
** it will set the duration of the cookie in days
** by default is 0 (this will leave the cookie active until browser is close)
*/
cookie.create(cookieName, cookieValue, { 
	sameSite = 3, 
	secure = true,
	httpOnly = true, 
	path = '/about',
	domain = 'example.com'
	days = 10 
});

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
* If localStorageKey or localStorageValue null or undifine will not create Local Storage and will return string with error
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
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details**<br>

[Go Top](#table-of-content)