/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************************!*\
  !*** ./resources/js/components/navbar.js ***!
  \*******************************************/
function changeNavbar() {
  var tabsNewAnim = $('#navbarSupportedContent');
  var activeItemNewAnim = tabsNewAnim.find('.active');
  var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
  var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
  var itemPosNewAnimTop = activeItemNewAnim.position();
  var itemPosNewAnimLeft = activeItemNewAnim.position();
  $(".hori-selector").css({
    "top": itemPosNewAnimTop.top + "px",
    "left": itemPosNewAnimLeft.left + "px",
    "height": activeWidthNewAnimHeight + "px",
    "width": activeWidthNewAnimWidth + "px"
  });
  $("#navbarSupportedContent").on("click", "li", function (e) {
    var _this = this;

    $('#navbarSupportedContent ul li').removeClass("active");
    $(this).addClass('active');
    var activeWidthNewAnimHeight = $(this).innerHeight();
    var activeWidthNewAnimWidth = $(this).innerWidth();
    var itemPosNewAnimTop = $(this).position();
    var itemPosNewAnimLeft = $(this).position();
    $(".hori-selector").css({
      "top": itemPosNewAnimTop.top + "px",
      "left": itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").click(function () {
      $(_this).css({
        height: 0
      });
    });
  });
}

$(document).ready(function () {
  setTimeout(function () {
    changeNavbar();
  });
});
$(window).on('resize', function () {
  setTimeout(function () {
    changeNavbar();
  }, 500);
});
$(".navbar-toggler").click(function () {
  setTimeout(function () {
    changeNavbar();
  });
}); // --------------add active class-on another-page move----------

jQuery(document).ready(function ($) {
  // Get current path and find target link
  var path = window.location.href;
  var basePath = window.location.origin || ''; // Account for home page with empty path

  if (path == '' || path == undefined) {
    path = basePath + 'agenda';
  }

  console.log(path);
  var target = $('#navbarSupportedContent ul li a[href="' + path + '"]'); // Add active class to target link

  target.parent().addClass('active');
  setTimeout(function () {
    changeNavbar();
  }, 500);
});
setTimeout(function () {
  changeNavbar();
}, 500);
/******/ })()
;