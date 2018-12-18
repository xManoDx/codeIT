$(document).ready(function() {

  // looking for changes in width and change heigth if something was changed
  let blockWidth = $('#list-of-companies').outerWidth();
$(window).resize(function() {
  if (blockWidth != $('#list-of-companies').outerWidth()) {
  $("#list-of-companies").css("height", `${$('#card-body-circle').css("height")}`);
  blockWidth = $('#list-of-companies').outerWidth();
  }
});


  $("#circle").css("width", `${$('#circle').css("height")}`); // do nothing because height is fixed in css-file
  $("#list-of-companies").css("height", `${$('#card-body-circle').css("height")}`); // make height of list-of-company block same as card-body-circle
});
