"use strict"
// Blocking SUBMIT BUTTON if checkbox isn't field

import { postAuthForm } from './api';
import { signUpHTML } from './markup';
import { onAuthSuccess } from './company/index';

$(document).ready(function() {

  $('#content-block').empty().append(signUpHTML);

  $("#AgreementCheck").change(function() {
    if(this.checked) {
      $("#submit-data").prop("disabled", false).removeClass('btn-danger').addClass('btn-success');
    } else {
      $("#submit-data").prop("disabled", true).removeClass('btn-success').addClass('btn-danger');
    }
  });

  $('#submit-data').on('click', submitForm);
});

// AJAX-post function

const submitForm = () => {
  // Creating form-object for sending to server
  const data = {
    name: $('#name').val(),
    secondname: $('#secondname').val(),
    email: $('#email').val(),
    pass: $('#pass').val(),
    gender: $('#gender').val().toLowerCase(),
  };

  //Form validation
    let validationError = {
      name: true,
      secondname: true,
      email: true,
      pass: true
    }
    //filters for name-field
    const checkName = () => {
      if (/[^а-яА-ЯёЁa-zA-Z]/.test($('#name').val()) || $('#name').val() === '' || $('#name').val().length < 3 || $('#name').val().length > 20) {
        validationError.name = true;
        $('#error-message').text('Incorrect NAME. The field must contain from 3 to 20 characters. Only letters are allowed');
      } else {
        validationError.name = false;
      }
    };
    //filters for secondname-field
    const checkSecondname = () => {
      if (/[^а-яА-ЯёЁa-zA-Z]/.test($('#secondname').val()) || $('#secondname').val() === '' || $('#secondname').val().length < 3 || $('#secondname').val().length > 20) {
        validationError.secondname = true;
        $('#error-message').text('Incorrect SECONDNAME. The field must contain from 3 to 20 characters. Only letters are allowed');
      } else {
        validationError.secondname = false;
      }
    };
    const checkEmail = () => {
      if (/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test($('#email').val()) === false || $('#email').val() === '' || $('#email').val().length < 3 || $('#email').val().length > 20) {
        validationError.email = true;
        $('#error-message').text('Incorrect EMAIL. The field must contain xxx@yyy.zzz structure.');
      } else {
        validationError.email = false;
      }
    };
    const checkPass = () => {
      if (/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test($('#pass').val()) || $('#pass').val() === '' || $('#pass').val().length < 3 || $('#pass').val().length > 20) {
        validationError.pass = true;
        $('#error-message').text('Incorrect PASSWORD. The field must contain from 3 to 20 characters.');
      } else {
        validationError.pass = false;
      }
    };

    checkPass();
    checkEmail();
    checkSecondname();
    checkName();
  // Making ajax-POST request and getting response.
  if (validationError.name === false && validationError.secondname === false && validationError.email === false && validationError.pass === false) {
    postAuthForm(data);
  }
}

const onFormPostSuccess = (responseData) => {
  const companyBlocksStructure = `<div class="container"></div>`;
  // Showing where was the ERROR or clear SINGUP-FORM container to creat new elements
  if (responseData.status.toLowerCase() === "ok") {
    onAuthSuccess();
  } else if (responseData.status.toLowerCase() === "form error") {
    $(`#${responseData.field}`).addClass('error-input');

    setTimeout(function() {
      $(`#${responseData.field}`).removeClass('error-input')
    }, 2000);

    $('#error-message').text(responseData.message);
  } else if (responseData.status.toLowerCase() === "error") {
    $('#error-message').text(responseData.message);
  }
};

export {
  onFormPostSuccess,
};
