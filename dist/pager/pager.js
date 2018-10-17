"use strict";

var pager = function (cookie) {
  var pagerObj = {};
  var onPage = 1;
  var cookieOnMz = 'pagerReset';
  var cookieName = "pagerCObj";

  var onMz = function onMz() {
    var urlPath = window.location.pathname;

    if (urlPath == "/mz" || urlPath == "/memberzone") {
      cookie.create(cookieOnMz, true);
      return "On Mz/Index";
    } else {
      setTimeout(function () {
        cookie.create(cookieOnMz, false);
        return "Not on Mz/index";
      }, 500);
    }
  };

  var runPager = function runPager(catName, totalPages, deleOnMz, nextIcon, prevIcon) {
    var cookieObj = cookie.read(cookieName);
    var onMzCookie = cookie.read(cookieOnMz);
    if (cookieObj != null) pagerObj = JSON.parse(cookieObj);
    if (pagerObj[catName] != null) onPage = pagerObj[catName];

    if (onMzCookie == 'true' && deleOnMz) {
      cookie.delete(cookieName);
      onPage = 1;
    }

    if (nextIcon == null) nextIcon = "»";
    if (prevIcon == null) prevIcon = "«";
    $(".pager-container .pager-item").hide();
    $(".pager-item#page" + onPage).fadeIn('slow');
    $('#pager-pagination').bootpag({
      total: totalPages,
      page: onPage,
      maxVisible: 5,
      next: nextIcon,
      prev: prevIcon
    }).on("page", function (event, pageNumber) {
      $(".pager-item").hide();
      $(".pager-item#page" + pageNumber).fadeIn('slow');
      pagerObj[catName] = pageNumber;
      cookie.create(cookieName, JSON.stringify(pagerObj));
    });
    return "pager runing";
  };

  return {
    init: function init() {
      var catName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var totalPages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var deleOnMz = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var nextIcon = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var prevIcon = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      if (catName == null) return "You send categoryName: ".concat(catName, ", and is REQUIERED to run");
      if (totalPages == null) return "You send totalPages: ".concat(totalPages, ", and is REQUIERED to run");
      return runPager(catName, totalPages, deleOnMz, nextIcon, prevIcon);
    },
    restart: function restart() {
      return cookie.delete(cookieName);
    },
    restarOnMz: function restarOnMz() {
      return onMz();
    }
  };
}(cookie);

pager.restarOnMz();