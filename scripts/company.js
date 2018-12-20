// this is click-function for list of companies
const companyInfo = (company, index) => {
  if($('#partner').hasClass('hide-this')) {$(".hide-this").show().removeClass('hide-this')};
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
  $('#card-body-circle').hide();
  $('#list-of-companies').hide();
  $('#circle').show();
  $('#companies-location').hide();
  $('#news').hide();
  $('.hide-this').hide();
  // start height-parameters for all blocks
  let blockWidth = $('#list-of-companies').outerWidth();
  $("#list-of-companies").css("height", `${$('#card-body-circle').css("height")}`);
  $("#companies-location").css("height", `${$('#card-body-circle').css("height")}`);
  $("#news").css("height", `${$('#card-body-circle').css("height")}`);
  // looking for changes in width and change heigth if something was changed
  $(window).resize(function() {
    if (blockWidth != $('#list-of-companies').outerWidth()) {

    $("#list-of-companies").css("height", `${$('#card-body-circle').css("height")}`);
    $("#companies-location").css("height", `${$('#card-body-circle').css("height")}`);
    $("#news").css("height", `${$('#card-body-circle').css("height")}`);
    blockWidth = $('#list-of-companies').outerWidth();
    }
  });

  $("#circle").css("width", `${$('#circle').css("height")}`); // do nothing because height is fixed in css-file
  $("#list-of-companies").css("height", `${$('#card-body-circle').css("height")}`); // makes height of list-of-company block same as card-body-circle


  setTimeout(getCompanyList,2000);  //testing of loaders
  setTimeout(getNews, 2000);  //testing of loaders
});

const getCompanyList = () => {
  const urlCompanies = 'https://codeit.pro/codeitCandidates/serverFrontendTest/company/getList'  // url for companies info request

  return $.getJSON( urlCompanies, function( data ) {
    const { list: companies } = data;

    const companiesList = companies.map((company, index) => `<li id='${index}' onclick='companyInfo(${JSON.stringify(company)}, ${index})'><span>${company.name}</span></li>`).join('')  // creating list of li-elements
    $('#circle').text(companies.length);
    $('#list-of-companies').append(`<div><ul>${companiesList}</ul></div>`); // forming li-elements for companies-listTotal
    //Creating massive for locations
    const companiesLocations = companies.map(company => company.location.name);

    //Counting locations from massive
    let counts = {};

      for (let i = 0; i < companiesLocations.length; i++) {
          let location = companiesLocations[i];
          counts[location] = counts[location] ? counts[location] + 1 : 1;
        };

    const locationList = Object.keys(counts).map(location=> `<li onclick='#' id='${location}'><em>${location}</em><span>${counts[location]}</span></li>`).join('')
    $('#companies-location').append(`<ul class="pieID legend">${locationList}</ul>`);


      //pieChart function
      function sliceSize(dataNum, dataTotal) {
        return (dataNum / dataTotal) * 360;
      }
      function addSlice(sliceSize, pieElement, offset, sliceID, color) {
        $(pieElement).append("<div class='slice "+sliceID+"'><span></span></div>");
        var offset = offset - 1;
        var sizeRotation = -179 + sliceSize;
        $("."+sliceID).css({
          "transform": "rotate("+offset+"deg) translate3d(0,0,0)"
        });
        $("."+sliceID+" span").css({
          "transform"       : "rotate("+sizeRotation+"deg) translate3d(0,0,0)",
          "background-color": color
        });
      }
      function iterateSlices(sliceSize, pieElement, offset, dataCount, sliceCount, color) {
        var sliceID = "s"+dataCount+"-"+sliceCount;
        var maxSize = 179;
        if(sliceSize<=maxSize) {
          addSlice(sliceSize, pieElement, offset, sliceID, color);
        } else {
          addSlice(maxSize, pieElement, offset, sliceID, color);
          iterateSlices(sliceSize-maxSize, pieElement, offset+maxSize, dataCount, sliceCount+1, color);
        }
      }
      function createPie(dataElement, pieElement) {
        var listData = [];
        $(dataElement+" span").each(function() {
          listData.push(Number($(this).html()));
        });
        var listTotal = 0;
        for(var i=0; i<listData.length; i++) {
          listTotal += listData[i];
        }
        var offset = 0;
        var color = [
          "cornflowerblue",
          "olivedrab",
          "orange",
          "tomato",
          "crimson",
          "purple",
          "turquoise",
          "forestgreen",
          "navy",
          "gray"
        ];
        for(var i=0; i<listData.length; i++) {
          var size = sliceSize(listData[i], listTotal);
          iterateSlices(size, pieElement, offset, i, 0, color[i]);
          $(dataElement+" li:nth-child("+(i+1)+")").css("border-color", color[i]);
          offset += size;
        }
      }
      createPie(".pieID.legend", ".pieID.pie");
      $('.loader-company').hide().removeClass('loader-company')
      $('.loader-container-company').empty().removeClass('loader-container-company');
      $('#card-body-circle').fadeIn(1000);
      $('#list-of-companies').fadeIn(1000);
      $('#companies-location').fadeIn(1000);

  });
};


const getNews = () => {
  const urlNews = 'http://codeit.pro/codeitCandidates/serverFrontendTest/news/getList'  // url for News request

  return $.getJSON( urlNews, function( data ) {
    const { list: news } = data;
    const newsList = news.map((block, index) => `<div class="container news-blocks">
      <div class="row">
        <div class="col-xs-12 col-sm-12 row">
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6"><img src="${block.img}" alt="news image" style="width: 100%;
    height: auto;"></div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 description">
            ${block.description}
          </div>
        </div>
        <div class="col-12">
          <b>Author:</b> ${block.author} <br>
          <b>Public:</b> ${block.date}
        </div>
      </div>
    </div>`).join('')  // creating news-blocks
    $('#news').append(`${newsList}`); // forming li-elements for NewsList

    $('.loader-news').hide().removeClass('loader-company')
    $('.loader-container-news').empty().removeClass('loader-container-news');
    $('#news').fadeIn(1000);
  });
};
