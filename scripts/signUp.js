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
  let data = {
    name: $('#name').val(),
    secondname: $('#secondname').val(),
    email: $('#email').val(),
    pass: $('#pass').val(),
    gender: $('#gender').val().toLowerCase(),
  };

  console.log(data);
  // Making ajax-POST request and getting responce.
  $.ajax({
  method: "POST",
  url: "https://codeit.pro/codeitCandidates/serverFrontendTest/user/registration",
  data: data
}).done(dataResponce => {

  console.log(dataResponce);
  // Showing where was the ERROR or clear SINGUP-FORM container to creat new elements
  if (dataResponce.status.toLowerCase() === "ok") {
    $('#content-block').empty();
  } else if (dataResponce.status.toLowerCase() === "form error") {
    $(`#${dataResponce.field}`).addClass('error-input');
    setTimeout(function() {
      $(`#${dataResponce.field}`).removeClass('error-input')
    }, 2000);
    $('#error-message').text(dataResponce.message);
  } else if (dataResponce.status.toLowerCase() === "error") {
    $('#error-message').text(dataResponce.message);
  }
});
}


$('#submit-data').click(submitForm);
