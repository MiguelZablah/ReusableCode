var pager = function(cookie) {

	var pagerObj = {};
	var onPage = 1;
	var cookieOnMz = 'pagerReset';
	var cookieName = "pagerCObj";

	var onMz = function() {
		// Gets where it came from 
		var urlPath = window.location.pathname;

		// Delete pager cookie if in memberzone
		if(urlPath =="/mz" || urlPath =="/memberzone"){
			cookie.create(cookieOnMz,true);
			return `On Mz/Index`;
		}else{
			setTimeout(function() {
				cookie.create(cookieOnMz,false);
				return `Not on Mz/index`;
			}, 500);
		}

	};

	var runPager = function(catName, totalPages, deleOnMz, nextIcon, prevIcon) {
		var cookieObj = cookie.read(cookieName);
		var onMzCookie = cookie.read(cookieOnMz);

		if(cookieObj != null)
			pagerObj = JSON.parse(cookieObj);
        
		if(pagerObj[catName] != null)
			onPage = pagerObj[catName];

		if(onMzCookie == 'true' && deleOnMz){
			cookie.delete(cookieName);
			onPage = 1;
		}

		if(nextIcon == null)
			nextIcon = "»";
        
		if(prevIcon == null)
			prevIcon = "«";

		$(".pager-container .pager-item").hide();      
		$(".pager-item#page"+onPage).fadeIn('slow');
		$('#pager-pagination').bootpag({
			total: totalPages,
			page: onPage,
			maxVisible: 5,
			next: nextIcon,
			prev: prevIcon
		}).on("page", function(event, pageNumber){
			$(".pager-item").hide();
			$(".pager-item#page"+pageNumber).fadeIn('slow');
			pagerObj[catName] = pageNumber;
			cookie.create(cookieName, JSON.stringify(pagerObj));
		});

		return "pager runing";
	};

	return {
		init: function(catName = null, totalPages = null, deleOnMz = false, nextIcon = null, prevIcon = null) {
			if (catName == null)
				return `You send categoryName: ${catName}, and is REQUIERED to run`;

			if(totalPages == null)
				return `You send totalPages: ${totalPages}, and is REQUIERED to run`;

			return runPager(catName, totalPages, deleOnMz, nextIcon, prevIcon);
		},

		restart: function() {
			return cookie.delete(cookieName);
		},

		restarOnMz: function() {
			return onMz();
		}
        
	};

}(cookie);
// To crete cookie on mz
pager.restarOnMz();

/* Pager Variables
* @{
* 	var pageCounter=0;
*   var totalItems= 1;
*   var pageCounterGlobal=1;
*   var catego= Model.Name;
*   var itemsPerPage=3;
*}
*/

/* Example use
*  pager.init('@catego', @pageCounter, true);
*/