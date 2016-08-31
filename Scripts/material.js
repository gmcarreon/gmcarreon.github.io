var click = 0;

$(document).ready(function () {

    $('.modal-trigger').leanModal();
    $('ul.tabs').tabs();

    $('.about .modal-trigger').click(function () {
        //alert(this);
    });

    $('.collapsible').collapsible({
        accordion: false
    });


    $('.slider').slider({ full_width: false });
    $('#expert-mob').click(function(){
        if (click == 0) {
            click++;
            $('.container-chart').append('<div><canvas id="canvas"></canvas></div>');
            renderChart();
        } else {
            $('.container-chart div').remove();    
            click = 0;
        }
    });
    $('#expert').click(function () {
        if (click == 0) {
            click++;
            $('.container-chart').append('<div><canvas id="canvas"></canvas></div>');
            renderChart();
        } else {
            $('.container-chart div').remove();    
            click = 0;
        }
    });

    $(document).keyup(function(e){
        if(e.keyCode == 27){
            if($('#canvas').length != 0){
                $('.container-chart div').remove();
                click = 0;
            }
        }
    });
    
    //$('.carousel').carousel();
    //$('.carousel.carousel-slider').carousel({ full_width: true });
});

function resume(){
    
    width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    var screenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var screentop = window.screenTop != undefined ? window.screenTop : screen.top;

    var w = '1100';
    var h = '600';
    var left = ((width / 2) - (w / 2)) + screenLeft;
    var top = ((height / 2) - (h / 2)) + screentop;

    printWindow = window.open('curriculum.html', '', 'left=' + left + ',top=' + top + ',width=' + w + ',height=' + h + ',status=0');
}

function renderChart() { 
    var dData = function () {
        return Math.round(Math.random() * 5)
    };

    var barChartData = {
        labels: ["C#.NET", "ASP.NET", "HTML", "CSS", "JavaScript", "Ajax", "JQuery", "JSON", "VC++", "MSSQL", "Oracle DB", "MySQL","RESTful API"],
        datasets: [{
            fillColor: 'rgba(255, 99, 132, .4)',
            strokeColor: 'rgba(255, 206, 86, 1)',
            data: [9, 7, 9, 8, 10, 9, 8, 10, 6, 9, 9, 8, 5],
        }]
    }

    var ctx = document.getElementById("canvas").getContext("2d");
    var barChart = new Chart(ctx).Bar(barChartData, {
        animation: true,
        responsive: true,
        scaleOverride: true,
        scaleSteps: 10,
        scaleStartValue: 0,
        scaleStepWidth: 1,
        scaleFontColor: "white",
    });
    /*
    var index = 11;
    setInterval(function () {
        barChartDemo.removeData();
        barChartDemo.addData([dData()], "dD " + index);
        index++;
    }, 3000);
    */
}

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