import { onGetCompaniesSuccess, onGetNewsSuccess } from './company/index';
import { onFormPostSuccess } from './authForm';
import { registrationUrl, companiesUrl, newsUrl } from './urls';

const postAuthForm = (data) => $.ajax({
  method: "POST",
  url: registrationUrl,
  data,
}).done(onFormPostSuccess);

const getCompanyList = () => {
  return $.getJSON(companiesUrl, (responseData) => {
    const { list: companies } = responseData;

    onGetCompaniesSuccess(companies);
  });
};

const getNews = () => {
  return $.getJSON(newsUrl, (responseData) => {
    const { list: news } = responseData;

    onGetNewsSuccess(news);
  });
};

export {
  postAuthForm,
  getCompanyList,
  getNews,
};
