﻿$(document).ready(function () {

    $('#likes').text('1000'+' Likes ');
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
        
        if($('#canvas').length != 0){
            $('.container-chart div').remove();
        }else{
            $('.container-chart').append('<div><canvas id="canvas"></canvas></div>');
            barChart();
        }
    });
    $('#expert').click(function () {
        
        if($('#canvas').length != 0){
            $('.container-chart div').remove();
        }else{
            $('.container-chart').append('<div><canvas id="canvas"></canvas></div>');
            barChart();
        }
    });

    $(document).keyup(function(e){
        if(e.keyCode == 27){
            if($('#canvas').length != 0){
                $('.container-chart div').remove();
            }
        }
    });

    $('.modal-trigger').click(function(e){
        var s = this.href.split('/');
        var target = s[s.length-1];

        if($('#canvas').length != 0){
            $('.container-chart div').remove();
        }

        if(target == '#who'){
            $('.modal-who div .data-who.right .container-radarchart div').remove();
            $('.modal-who div .data-who.right .container-radarchart').append('<div><canvas id="radarChart" width="500" height="260" style="position:absolute;left:48%;"></div>');
            radarChart();
        }
    });
    
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

function radarChart(){
    var radarOptions = {		
	    scaleOverlay : false,
	    scaleOverride : false,
	    scaleSteps : null,
	    scaleStepWidth : null,
	    scaleStartValue : null,
	    scaleShowLine : true,
	    scaleLineColor : "#999",
	    scaleLineWidth : 1,
	    scaleShowLabels : false,
	    scaleLabel : "<%=value%>",
	    scaleFontFamily : "'Arial'",
	    scaleFontSize : 12,
	    scaleFontStyle : "normal",
	    scaleFontColor : "#666",
	    scaleShowLabelBackdrop : true,
	    scaleBackdropColor : "rgba(255,255,255,1)",
	    scaleBackdropPaddingY : 2,
	    scaleBackdropPaddingX : 2,
	    angleShowLineOut : true,
	    angleLineColor : "rgba(255,255,255,0.3)",
	    angleLineWidth : 1,			
	    pointLabelFontFamily : "'Arial'",
	    pointLabelFontStyle : "normal",
	    pointLabelFontSize : 12,
	    pointLabelFontColor : "#EFEFEF",
	    pointDot : true,
	    pointDotRadius : 3,
	    pointDotStrokeWidth : 1,
	    datasetStroke : true,
	    datasetStrokeWidth : 1,
	    datasetFill : true,
	    animation : true,
	    animationSteps : 60,
	    animationEasing : "easeOutQuart",
	    onAnimationComplete : null
	
    }

    var radarData = {
	    labels : ["Web development","Desktop Application","Database","Reporting Tools","Animation","Coding","Designing"],
	    datasets : [
		    {
			    fillColor : "rgba(151,187,205,0.5)",
			    strokeColor : "rgba(151,187,205,1)",
			    data : [83,90,76,40,63,90,45]
		    }
	    ]
    }
    var ctx = document.getElementById("radarChart").getContext("2d");
    var myRadarChart = new Chart(ctx).Radar(radarData, radarOptions);
}

function barChart() { 
    var dData = function () {
        return Math.round(Math.random() * 5)
    };

    var barChartData = {
        labels: ["C#.NET", "ASP.NET", "HTML", "CSS", "JavaScript", "Ajax", "JQuery", "JSON", "VC++", "MSSQL", "Oracle DB", "MySQL","RESTful API"],
        datasets: [{
            fillColor: 'rgba(255, 99, 132, .4)',
            strokeColor: 'rgba(255, 206, 86, 1)',
            data: [4, 2, 4, 3, 5, 4, 3, 5, 1, 4, 4, 3, 2.5],
        }]
    }

    var ctx = document.getElementById("canvas").getContext("2d");
    var barChart = new Chart(ctx).Bar(barChartData, {
        animation: true,
        responsive: true,
        scaleOverride: true,
        scaleSteps: 5,
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