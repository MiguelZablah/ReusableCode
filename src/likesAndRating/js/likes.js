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
					db.ref(RTbase +"/" + id + "/PersonsLiked").update({ [locUser] : 1});
					getItemLikes(id);
				}else{
					getItemLikes(id);
				}
			}else{
				db.ref(RTbase +"/" + id).update({ ["PersonsLiked"] : {[locUser] : 1} });
				getItemLikes(id);
			}
		});
	}
}

// Funcion para sacar los likes de FireBase
function getItemLikes(id) {
	db.ref(`${RTbase}/${id}/PersonsLiked`).once("value", snapshot => {
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