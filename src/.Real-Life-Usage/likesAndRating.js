// Cookies
var cookie=function(e){var t=function(t,o,i){var r="";if(i){var l=new Date;l.setTime(l.getTime()+24*i*60*60*1e3),r="; expires="+l.toUTCString()}return null==t||void 0==t?"Cookie key not set: "+t:null==o||void 0==o?"Cookie Value not set: "+t:(e.cookie=t+"="+o+r+"; path=/",n.length>0?"cookie create => Name: "+t+", Value: "+o+", Expires in: "+i+" days":null)},n=function(t){if(null==t||void 0==t)return"Cookie key not set: "+t;var n=("; "+e.cookie).split("; "+t+"=");return 2==n.length?n.pop().split(";").shift():null};return{create:function(e,n){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10;return t(e,n,o)},read:function(e){return n(e)},delete:function(e){return null==(o=e)||void 0==o?"Cookie key not set: "+o:(t(o,"",-1),n.length>0?"Cookie Deleted":null);var o}}}(document);

// If in download wun likes
$(document).ready(function() {
	// For testing firebase conection
	// const connectedRef = db.ref('.info/connected');
	// connectedRef.on('value', function(snap) {
	// 	if (snap.val() === true) {
	// 		console.log('CONNECT')
	// 		connected = true
	// 	} else {
	// 		console.log('DISCONNECT')
	// 		connected = false
	// 	}
	// })

	var pathOn = window.location;
	if (~pathOn.href.indexOf("DownloadConfirm")){
		var urlParams = parse_query_string(pathOn.search.substring(1));
		var id = urlParams.id;
        
		// Connects to firebase
		db.goOnline();
		// Gets likes
		getItemLikes(id);
        // Rating
        // initializa rateYo plugin for each item
        var rateYo = $("#rateYo-"+id).rateYo({ halfStar: true });
        // Gets rating for items
        rateGame(id, rateYo);
        getRating(id, rateYo);
	}else{
		// Se desconecta de firebase
		db.goOffline();
	}
});
// Funcion para guardar likes en FireBase
function itemLike(id) {
	var locUse = cookie.read("t");
	if(locUse){
		var locUser = locUse.replace(/\./g, "");
		locUser.replace(/\./g, "");
		db.ref(`${RTbase}/${id}`).once("value", snapshot => {
			var personObj = snapshot.val();
			if (personObj) {
				if(!personObj[locUser]){
					db.ref(RTbase +"/" + id + "/UserLikes").update({ [locUser] : 1});
					getItemLikes(id);
				}else{
					getItemLikes(id);
				}
			}else{
				db.ref(RTbase +"/" + id).update({ ["UserLikes"] : {[locUser] : 1} });
				getItemLikes(id);
			}
		});
	}
}
// Funcion para sacar los likes de FireBase
function getItemLikes(id) {
	var locUse = cookie.read("t");
	if(locUse){
		db.ref(`${RTbase}/${id}/UserLikes`).once("value", snapshot => {
			const personLikes = snapshot.val();
			if (personLikes) {
				var likes = 0;
				Object.keys(personLikes).forEach(function () {
					likes += 1;
				});
				$("#likeN-"+id).html(likes + " Likes");
			} else {
				$("#likeN-"+id).html("0 Likes");
			}
		});
	}
}
// Function rate Game
function rateGame(id, rateYo) {
	rateYo.rateYo().on("rateyo.set", function () {
		saveRating(id, rateYo);
	});
}
// Guarda el rating
function saveRating(id, rateYo) {
	var locUse = cookie.read("t");
	if(locUse){
		var locUser = locUse.replace(/\./g, "");
		locUser.replace(/\./g, "");
		db.ref(`${RTbase}/${id}/rating`).once("value", snapshot => {
			var itemRating = snapshot.val();
			var rated = rateYo.rateYo("rating");
			if (itemRating != null && itemRating["rating"] >= 0) {
				db.ref(RTbase +"/" + id + "/rating").update({ [locUser] : { ["rated"]: rated } });
			} else {
				db.ref(RTbase +"/" + id + "/rating").update({ [locUser] : { ["rated"]: rated } });
			}
		});
	}
}
// Saca el promedio de todos los rating que hay y lo pone
function getRating(id, rateYo) {
	db.ref(`${RTbase}/${id}/rating`).once("value", snapshot => {
		var itemRating = snapshot.val();
		if (itemRating) {
			var ratingSum = 0;
			var personSum = 0;
			Object.keys(itemRating).forEach(function (key) {
				ratingSum += itemRating[key].rated;
				personSum += 1;
			});
			var avg = ratingSum/personSum;
			rateYo.rateYo("rating", avg);
		}
	});
}

// Function get param from url
function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}