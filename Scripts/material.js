$(document).ready(function () {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
    $('ul.tabs').tabs();

    $('.about .modal-trigger').click(function () {
        //alert(this);
    });

    $('.collapsible').collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    
    $('.slider').slider({ full_width: false });
    
    
    //$('.carousel').carousel();
    //$('.carousel.carousel-slider').carousel({ full_width: true });
});

function sendEmail() {
    
    $('#send-button').addClass('disabled');

    sendMessage(
    {
        'To': $('#compose-to').val(),
        'Subject': $('#compose-subject').val()
    },
    $('#compose-message').val(),
    composeTidy
  );

    return false;
}

function sendMessage(headers_obj, message, callback) {
    var email = '';

    for (var header in headers_obj)
        email += header += ": " + headers_obj[header] + "\r\n";

    email += "\r\n" + message;

    var sendRequest = gapi.client.gmail.users.messages.send({
        'userId': 'me',
        'resource': {
            'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
        }
    });
    return sendRequest.execute(callback);
}

function composeTidy() {
   
    $('#compose-to').val('');
    $('#compose-subject').val('');
    $('#compose-message').val('');
    $('#send-button').removeClass('disabled');
    location.reload();
}