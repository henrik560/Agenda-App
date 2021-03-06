/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************************!*\
  !*** ./resources/js/Components/navbar.js ***!
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
  var path = window.location.href.split(window.location.origin + '/')[1].split("/")[0]; // Account for home page with empty path  

  if (path == '' || path == undefined) {
    path = basePath + 'agenda';
  }

  var target = $('#navbarSupportedContent ul li a[id="' + path + '"]'); // Add active class to target link

  target.parent().addClass('active');
  setTimeout(function () {
    changeNavbar();
  }, 500);
});
$(document).ready(function () {
  $("#navbar-toggler").on("click", function () {
    var element = $("#navbarSupportedContent");

    if ($("#main-nav").css("borderBottomLeftRadius") == "25px") {
      $("#main-nav").css({
        borderBottomLeftRadius: "",
        borderBottomRightRadius: ""
      });
    } else {
      $("#main-nav").css({
        borderBottomLeftRadius: "25px",
        borderBottomRightRadius: "25px"
      });
    }

    element.css({
      height: ''
    });
    setTimeout(function () {
      changeNavbar();
      element.css({
        height: ''
      });
    }, 500);
  });
});
/******/ })()
;