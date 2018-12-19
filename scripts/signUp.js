"use strict"
// Blocking SUBMIT BUTTON if checkbox isn't field
$(document).ready(function() {
 $("#AgreementCheck").change(function() {
     if(this.checked) {
       $("#submit-data").prop("disabled", false).removeClass('btn-danger').addClass('btn-success');
    } else {
      $("#submit-data").prop("disabled", true).removeClass('btn-success').addClass('btn-danger');
    }
})
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

  console.log(data);
  // Making ajax-POST request and getting response.
  $.ajax({
  method: "POST",
  url: "https://codeit.pro/codeitCandidates/serverFrontendTest/user/registration",
  data: data
}).done(dataResponse => {

  console.log(dataResponse);
  // Showing where was the ERROR or clear SINGUP-FORM container to creat new elements
  if (dataResponse.status.toLowerCase() === "ok") {
    $('#content-block').empty();
  } else if (dataResponse.status.toLowerCase() === "form error") {
    $(`#${dataResponse.field}`).addClass('error-input');
    setTimeout(function() {
      $(`#${dataResponse.field}`).removeClass('error-input')
    }, 2000);
    $('#error-message').text(dataResponse.message);
  } else if (dataResponse.status.toLowerCase() === "error") {
    $('#error-message').text(dataResponse.message);
  }
});
}


$('#submit-data').click(submitForm);
