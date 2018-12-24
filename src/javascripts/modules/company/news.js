import { shortDescription, toDateTime } from '../utils';

export const onGetNewsSuccess = (news) => {
  const newsList = news.map((block, index) =>
    $(`
      <div class="container news-blocks">
        <div class="row">
          <div class="col-xs-12 col-sm-12 row">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 image-news"><img src="${block.img}" alt="news image"></div>
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 description">
              <a href="https://${block.link}">Title ${index+1}<br> </a>
              ${shortDescription(block.description)}
            </div>
          </div>
          <div class="col-12">
            <b>Author:</b> ${block.author} <br>
            <b>Public:</b> ${toDateTime(block.date)}
          </div>
        </div>
      </div>
    `)
  );  // creating news-blocks
  $('#news').append(newsList); // forming li-elements for NewsList

  $('.news-slider').slick({
    arrows: true,
    autoplay:true,
    autoplaySpeed: 3000,
    draggable:true,
    adaptiveHeight: true,
    prevArrow: '<div id="prev"></div>',
    nextArrow: '<div id="next"></div>',
    });

    // Trigger the click-event from our arrows
    $('#slider-prev').on('click', () => {
      $('#prev').click();
    });

    $('#slider-next').on('click', () => {
      $('#next').click();
    });

  $('.loader-news').hide().removeClass('loader-company')
  $('.loader-container-news').empty().removeClass('loader-container-news');
  $('#news').fadeIn(1000);
};
