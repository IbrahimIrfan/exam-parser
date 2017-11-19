// This file creates the necessary final (public) exam files given exam data content files.

var q = 11; // keep iterating, file name
var json_q = 4; //reset for 9+ weeks, exam content
var week = 11; //keep iterating, file name
var cluster = "Hospitality";
var type = "Homework";

var server_file = cluster + '_' + q + '_Whole_' + type + '_Server.php';
var jsonfilelocation = '/Users/ibrahimirfan/Desktop/scratch/exams/' + cluster + '/' + cluster + '_' + json_q + '_Whole.json';
var phpfilelocation = '/Users/ibrahimirfan/Desktop/DECA-Web-App/' + cluster + '_' + q + '_Whole_' + type + '.php';
var phpfilelocation2 = '/Users/ibrahimirfan/Desktop/DECA-Web-App/' + cluster + '_' + q + '_Whole_' + type + '_Server.php';
var jsfilelocation = '/Users/ibrahimirfan/Desktop/DECA-Web-App/' + cluster + '_' + q + '_Whole_' + type + '.js';
var jsfile = cluster + '_' + q + '_Whole_' + type + '.js';
var examtitle = cluster + " Exam " + week;

// php
var string = "<?php " +
    "ob_start(); " +
    "session_start(); " +
    "require_once 'dbconnect.php'; " +
    'if( !isset($_SESSION["user"]) ) {' +
    '  header("Location: login.php");' +
    '  exit;' +
    ' }; ?>';


//html
string += '<html><head><title>IRHS DECA</title>' +
    '<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>' +
    '<link rel="icon" href="img/favicon.ico" sizes="16x16">' +
    '<link rel="stylesheet" type="text/css" href="css/main.css"></link>' +
    "<meta charset='utf-8'>" +
    '<meta http-equiv="X-UA-Compatible" content="IE=edge">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<link rel="stylesheet" href="css/cssmenu/styles.css">' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">' +
    '<link rel="stylesheet" href="https://code.getmdl.io/1.1.3/material.blue_grey-red.min.css">' +
    '<script defer src="https://code.getmdl.io/1.1.3/material.min.js"></script>' +
    '</head><body><div id="cssmenu">' +
    "  <ul><li><a href='index.php'><span>Home</span></a></li>" +
    "<li><a href='about.php'><span>About DECA</span></a></li>" +
    "<li><a href='events.php'><span>Events</span></a></li>" +
    "<li class='active'><a href='dashboard.php'><span>Dashboard</span></a></li>" +
    "          <li><a href='announcements.php'><span>Announcements</span></a></li>" +
    "  <li><a href='dates.php'><span>Schedules</span></a></li>" +
    "  <li><a href='exams.php'><span>Exams</span></a></li>" +
    "<li class='last'><a href='logout.php?logout'><span>Logout</span></a></li></ul></div></br>" +
    "  <div id='timer-label'>Time Remaining:</div><div class='timer' data-minutes-left=70></div>" +
    '<div class="content"><h4 style="color: red;">IRHS DECA does not own any of these exams.</h4><h4>' + examtitle + '</h4><h4 id="score" style="color: blue;"></h4><form id="myform">';
var fs = require('fs');
var exam = require(jsonfilelocation);

for (var i in exam) {
    string += "<h5 id='q" + i + "'>" + i + ". " + exam[i].q + "</h5>";

    string += '<select class="select-style" id="_' + i + '"><option value="def" disabled selected>Select</option><option value="A">A. ' + exam[i].a + '</option>' +
        '<option value="B">B. ' + exam[i].b + '</option>' +
        '<option value="C">C. ' + exam[i].c + '</option>' +
        '<option value="D">D. ' + exam[i].d + '</option></select></br></br>' +
        '<div id="' + i + 'answer" style="display: none;"><h5>Incorrect. The correct answer is ' + exam[i].ans + ': ';
    if (exam[i].ans == "A") {
        string += exam[i].a;
    } else if (exam[i].ans == "B") {
        string += exam[i].b;
    } else if (exam[i].ans == "C") {
        string += exam[i].c;
    } else {
        string += exam[i].d;
    }
    if (exam[i].exp == undefined) {
        string += '</h5><h5>Explanation not available</h5></div>';
    } else {
        string += '</h5><h5>' + exam[i].exp + '</h5></div>';
    }
}



string += '<input id="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary" type="submit"></input>' +
    '</form></div>'
string += '</body><script src="jquery-timer/jquery.simple.timer.js"></script><script src="' + jsfile + '"></script>';

string += '</html>';


var string2 = "function parseExam(){\n";
string2 += "window.scrollTo(0, 0);\n";
string2 += "$('.select-style').prop('disabled', 'true');\n"
string2 += "$('#submit').css('display', 'none');\n";
string2 += "var exam = {};\n";

for (var i in exam) {
    string2 += 'exam[' + i + '] = {};\n';
    string2 += 'exam[' + i + '].ans ="' + exam[i].ans + '";\n';
}
string2 += "var score = 0;\n"
string2 += 'for (var i in exam) {\n'
string2 += "if ($('#_' + i).val() == exam[i].ans){\n"
string2 += "score++;\n"
string2 += "document.getElementById('q' + i).style.color = '#00cc00';\n"
string2 += "}else{\n"
string2 += "document.getElementById('q' + i).style.color = 'red';\n"
string2 += "document.getElementById(i + 'answer').style.display = 'block';\n"
string2 += "}\n}\n"

string2 += "document.getElementById('score').innerHTML = 'Score: ' + score + '/100';\n";
string2 += 'var data_to_post = {\n';
string2 += '"score": score\n';
string2 += '}\n';
string2 += '$.ajax({\n';
string2 += 'type: "POST",\n';
string2 += 'url: "' + server_file + '",\n';
string2 += 'data: data_to_post,\n';
string2 += 'success: function(r){\n';
string2 += 'console.log("success " + r);\n';
string2 += '},\n';
string2 += 'error: function(r) {\n';
string2 += 'console.log("error " + r);\n';
string2 += ' }\n';
string2 += '});\n';
string2 += "}";

string2 += "$('.timer').startTimer({\n";
string2 += "onComplete: function(element){\n";
string2 += "  element.addClass('complete');\n";
string2 += " parseExam();\n";
string2 += "}\n";
string2 += "});\n";

string2 += "$('#myform').on('submit', function(e){\n";
string2 += "$('.timer').hide();";
string2 += "e.preventDefault();\n";
string2 += "parseExam();\n";
string2 += "});\n";

var string3 = "";

string3 += '<?php '
string3 += 'ob_start(); '
string3 += 'session_start(); '
string3 += "require_once 'dbconnect.php'; "
string3 += '$score = $_POST["score"]; ';
string3 += "$UID = $_SESSION['user']; ";
string3+=  "$query = \"UPDATE exams SET score_" + week + "='$score', cluster='" + cluster + "' WHERE userId=\".$UID;"
string3 += "$res = mysql_query($query); ";
string3 += "?>";

fs.writeFile(phpfilelocation, string, function(err, data) {
    if (err) {
        return console.log(err);
    };
    console.log("SAVED");
});

fs.writeFile(jsfilelocation, string2, function(err, data) {
    if (err) {
        return console.log(err);
    };
    console.log("SAVED");
});

fs.writeFile(phpfilelocation2, string3, function(err, data) {
    if (err) {
        return console.log(err);
    };
    console.log("SAVED");
});
