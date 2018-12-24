// date-function for news

import { companyHTML } from '../markup';
import { getCompanyList, getNews } from '../api';
import { createPie } from './pie';

// this is click-function for list of companies

const companyInfo = (company, index) => {
  const sumOfValues =
    company.partners
      .map(partner => partner.value)
      .reduce((prevPartnerValue, currentPartnerValue) => prevPartnerValue + currentPartnerValue, 0);

  let directionName = true; //direction of name-filter
  let directionPercentage = true; //direction of percentage-filter
  const sortedByNameForward = company.partners.sort((a, b) => a.name.localeCompare(b.name));

  const sortByName = () => {

    if (directionName === false) {
      $('#card-body-partners')
        .empty()
        .append(sortedByNameForward.map(partner =>
          `
            <div class='partners'><div class='partners-text'>${partner.name}<br>${Math.round(partner.value / sumOfValues*100)}%</div></div>
          `
        ));

      directionName = true;
      $('#name-filter').addClass('partners-filters-active-phase').addClass('partners-filters-active-phase-reverse');
      $('#percentage-filter').removeClass('partners-filters-active-phase');
    } else {
      $('#card-body-partners')
        .empty()
        .append(sortedByNameForward
          .slice()
          .reverse()
          .map(partner =>
            `
              <div class='partners'><div class='partners-text'>${partner.name}<br>${Math.round(partner.value / sumOfValues*100)}%</div></div>
            `
          )
      );

      directionName = false;
      $('#name-filter').addClass('partners-filters-active-phase').removeClass('partners-filters-active-phase-reverse');
      $('#percentage-filter').removeClass('partners-filters-active-phase');
    }
  };
    // add click-action for name-filter
  $('#name-filter').on('click', sortByName);

  const sortedByPercentageForward = company.partners.sort((a, b) => a.value - b.value);
  const sortByPercentage = () => {
    if (directionPercentage === true) {
      $('#card-body-partners')
        .empty()
        .append(
          sortedByPercentageForward
            .map(partner =>`<div class='partners'><div class='partners-text'>${partner.name}<br>${Math.round(partner.value / sumOfValues*100)}%</div></div>`)
        );

      directionPercentage = false;
      $('#percentage-filter').addClass('partners-filters-active-phase').removeClass('partners-filters-active-phase-reverse');
      $('#name-filter').removeClass('partners-filters-active-phase');

    } else {
      $('#card-body-partners')
        .empty()
        .append(
          sortedByPercentageForward
            .slice()
            .reverse()
            .map(partner => `<div class='partners'><div class='partners-text'>${partner.name}<br>${Math.round(partner.value / sumOfValues*100)}%</div></div>`)
        );

      directionPercentage = true;
      $('#percentage-filter').addClass('partners-filters-active-phase').addClass('partners-filters-active-phase-reverse');
      $('#name-filter').removeClass('partners-filters-active-phase');
    }
  };

    // add click-action for percentage-filter
  $('#percentage-filter').on('click', sortByPercentage);

  if($('#partner').hasClass('hide-this')) {$(".hide-this").show().removeClass('hide-this')};
  if($(`#${index}`).hasClass("chosen-li")) {
    $('#partner').addClass('hide-this').hide();
    $(`#${index}`).removeClass("chosen-li");;
  } else {
    $("ul li").removeClass("chosen-li");

    if($('#name-filter').hasClass('partners-filters-active-phase')) {
      sortByName();
      directionName = !directionPercentage;
    } else if ($('#percentage-filter').hasClass('partners-filters-active-phase')) {
      sortByPercentage();
      directionPercentage = !directionPercentage;
    } else {
      $('#card-body-partners')
        .empty()
        .append(company.partners
          .map(partner => `<div class='partners'><div class='partners-text'>${partner.name}<br>${Math.round(partner.value / sumOfValues*100)}%</div></div>`)
        )
    };
  $(`#${index}`).addClass('chosen-li');}
};


const blockListeners = () => {
  $('#card-body-circle').hide();
  $('#list-of-companies').hide();
  $('#circle').show();
  $('#companies-location').hide();
  $('#news').hide();
  $('.hide-this').hide();
  $('#location-info').hide();
  $('#back-to-chart').hide();
  // start height-parameters for all blocks
  let blockWidth = $('#list-of-companies').outerWidth();
  $("#list-of-companies").css("height", `${$('#card-body-circle').css("height")}`);
  if ($(window).outerWidth() > 480) {
    $("#companies-location").css("height", `${$('#card-body-circle').css("height")}`)
    $("#companies-location").removeClass('pie-container-small').addClass('pie-container');
    $("#location-info").css("height", `${$('#card-body-circle').css("height")}`)

  };
  if ($(window).outerWidth() < 480) {
    $("#companies-location").css("height", `auto`)
    $("#companies-location").removeClass('pie-container').addClass('pie-container-small');
    $("#location-info").css("height", `auto`)

  };
  $("#news").css("height", `${$('#card-body-circle').css("height")}`);
  // looking for changes in width and change heigth if something was changed
  $(window).resize(function() {
    if (blockWidth != $('#list-of-companies').outerWidth()) {

    $("#list-of-companies").css("height", `${$('#card-body-circle').css("height")}`);
    if ($(window).outerWidth() > 480) {
      $("#companies-location").css("height", `${$('#card-body-circle').css("height")}`);
      $("#companies-location").removeClass('pie-container-small').addClass('pie-container');
    }
    if ($(window).outerWidth() < 480) {
      $("#companies-location").css("height", `auto`)
      $("#companies-location").removeClass('pie-container').addClass('pie-container-small');
    };
    $("#news").css("height", `${$('#card-body-circle').css("height")}`);
    blockWidth = $('#list-of-companies').outerWidth();
    }
  });

  $("#circle").css("width", `${$('#circle').css("height")}`); // do nothing because height is fixed in css-file
  $("#list-of-companies").css("height", `${$('#card-body-circle').css("height")}`); // makes height of list-of-company block same as card-body-circle

};

const partnerFilterByLocation = (companies, location) => {
  $('#companies-location').hide();
  const companyWithLocFilter = companies.filter(company => company.location.name === location);
  const companyListWithLocFilter = companyWithLocFilter.map(company => `<li>${company.name}</li>`).join('');
  $('#location-info').empty()
    .append(`<ul>${companyListWithLocFilter}</ul>`);
  $('#location-info').show();
  $('#back-to-chart').show();
};

const onAuthSuccess = () => {
  $('#content-block').empty().append(companyHTML);

  getNews();
  getCompanyList();
  blockListeners();
};

const onGetCompaniesSuccess = (companies) => {
  // creating list of li-elements
  const companiesList = companies
    .map((company, index) =>
      $(`
        <li id='${index}'>
          <span>${company.name}</span>
        </li>
      `)
      .on('click', () => companyInfo(company, index))
    );

  $('#circle').text(companies.length);

  $('#list-of-companies')
    .append(`<div><ul></ul></div>`)
    .find('ul')
    .append(companiesList); // forming li-elements for companies-listTotal
  //Creating massive for locations
  const companiesLocations = companies.map(company => company.location.name);

  //Counting locations from massive
  const counts = {};

    for (let i = 0; i < companiesLocations.length; i++) {
        let location = companiesLocations[i];
        counts[location] = counts[location] ? counts[location] + 1 : 1;
      };

  const locationList = Object.keys(counts)
    .map(location =>
      $(`
        <li>
          <em>${location}</em>
          <span>${counts[location]}</span>
        </li>
      `)
      .on('click', () => partnerFilterByLocation(companies, location))
    );
  $('#companies-location')
    .append(`<dir class="legend-container"><ul class="pieID legend"></ul></dir>`)
    .find('ul.legend')
    .append(locationList);
  // instruction for back-button in Company Location container
  const backToChart = () => {
    $('#location-info').hide();
    $('#companies-location').show();
    $('#back-to-chart').hide();
  }

  $('#back-to-chart').on('click', backToChart);

  createPie(".pieID.legend", ".pieID.pie");
  $('.loader-company').hide().removeClass('loader-company')
  $('.loader-container-company').empty().removeClass('loader-container-company');
  $('#card-body-circle').fadeIn(1000);
  $('#list-of-companies').fadeIn(1000);
  $('#companies-location').fadeIn(1000);
}

export {
  onAuthSuccess,
  onGetCompaniesSuccess,
};
