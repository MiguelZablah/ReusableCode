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