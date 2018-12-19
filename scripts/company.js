// this is click-function for list of companies
const companyInfo = (id) => {
  $.getJSON( 'https://codeit.pro/codeitCandidates/serverFrontendTest/company/getList', function( data ) {
    $("ul li").removeClass("chosen-li");
    let sumOfValues = data.list[id].partners.map(e => e.value).reduce((a,b) => a+b,0);
    $('#card-body-partners').empty().append(data.list[id].partners.map(e => `<div class='partners'><div class='partners-text'>${e.name}<br>${Math.round(e.value/sumOfValues*100)}%</div></div>`));
    $(`#${id}`).addClass('chosen-li');
  });
}

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
$("#list-of-companies").css("height", `${$('#card-body-circle').css("height")}`); // makes height of list-of-company block same as card-body-circle

const urlCompanies = 'https://codeit.pro/codeitCandidates/serverFrontendTest/company/getList'  // url for companies info request

$.getJSON( urlCompanies, function( data ) {
  let companies = data.list.map(e => e.name);



  let companiesList = companies.map((e,index) => `<li id='${index}' onclick='companyInfo(this.id)'><span>${e}</span></li>`).join('')  // creating list of li-elements
  $('#circle').text(companies.length);
  $('#list-of-companies').append(`<div><ul>${companiesList}</ul></div>`); // forming li-elements


});

});
