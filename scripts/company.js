// this is click-function for list of companies
const companyInfo = (company, index) => {
  $("ul li").removeClass("chosen-li");
  const sumOfValues = company.partners.map(partner => partner.value).reduce((prevPartnerValue, currentPartnerValue) => prevPartnerValue + currentPartnerValue, 0);
  $('#card-body-partners')
    .empty()
    .append(company.partners
      .map(partner => `<div class='partners'><div class='partners-text'>${partner.name}<br>${Math.round(partner.value / sumOfValues*100)}%</div></div>`)
    );
  $(`#${index}`).addClass('chosen-li');
}

$(document).ready(function() {

  // looking for changes in width and change heigth if something was changed
  const blockWidth = $('#list-of-companies').outerWidth();
  $(window).resize(function() {
    if (blockWidth != $('#list-of-companies').outerWidth()) {
    $("#list-of-companies").css("height", `${$('#card-body-circle').css("height")}`);
    blockWidth = $('#list-of-companies').outerWidth();
    }
  });

  $("#circle").css("width", `${$('#circle').css("height")}`); // do nothing because height is fixed in css-file
  $("#list-of-companies").css("height", `${$('#card-body-circle').css("height")}`); // makes height of list-of-company block same as card-body-circle


  getCompanyList();

});

const getCompanyList = () => {
  const urlCompanies = 'https://codeit.pro/codeitCandidates/serverFrontendTest/company/getList'  // url for companies info request

  return $.getJSON( urlCompanies, function( data ) {
    const { list: companies } = data;

    const companiesList = companies.map((company, index) => `<li id='${index}' onclick='companyInfo(${JSON.stringify(company)}, ${index})'><span>${company.name}</span></li>`).join('')  // creating list of li-elements
    $('#circle').text(companies.length);
    $('#list-of-companies').append(`<div><ul>${companiesList}</ul></div>`); // forming li-elements
  });
}
