// Nuevo Paginador
var onPage = 1;
var pagerObj = {};
var catName = '@catego';
var totalPages = @pageCounter;
var cookieName = "pagerObj";
var cookieObj = cookie.read(cookieName);

if(cookieObj != null)
    pagerObj = JSON.parse(cookieObj);

if(pagerObj[catName] != null)
    onPage = pagerObj[catName];

$(".pager-container .pager-item").hide();      
$(".pager-item#page"+onPage).fadeIn('slow');
$('#pager-pagination').bootpag({
    total: totalPages,
    page: onPage,
    maxVisible: 5,
    next:'»',
    prev:'«'
}).on("page", function(event, pageNumber){
    $(".pager-item").hide();
    $(".pager-item#page"+pageNumber).fadeIn('slow');
    pagerObj[catName] = pageNumber;
    cookie.create(cookieName, JSON.stringify(pagerObj));
});

// Clear Pager cookies
var clearPages = function() {
	cookie.delete('cookieCatego');
}

// Pager Variables
// @{
// 	var pageCounter=0;
//     var totalItems= 1;
//     var pageCounterGlobal=1;
//     var catego= Model.Name;
//     var itemsPerPage=3;
// }