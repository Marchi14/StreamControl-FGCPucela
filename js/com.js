var timestampOld;
var timestamp;
var com1;
var com2;
var com3;
var alturacom12 = parseInt($('#com1').css("top"));
var alturacom3= parseInt($('#com3').css("top")); //recoge los valores de altura para evitar modificar los valores en este archivo constantemente

var xmlDoc;

var xhr = new XMLHttpRequest();

var animating = false;
var doUpdate = false;

function init() {
    console.log(alturacom12);
    xhr.overrideMimeType('text/xml');

    var timeout = this.window.setInterval(function() {
        pollHandler();
    }, 250);
    $('#com1').html('');
    $('#com2').html('');
    $('#com3').html('');
    $('#boardc').tween({
        opacity: {
            start: 0,
            stop: 100,
            time: 0.5,
            duration: 1,
            effect: 'easeOut'
        }
    });

    $.play();
}

function pollHandler() {
    loadData();
    if (timestamp != timestampOld) {
        doUpdate = true;
    }
    if (!animating && doUpdate) {
        updateBoard();
    }
}

function loadData() {
    xhr.open('GET', 'streamcontrol.xml');
    xhr.send();
    xhr.onreadystatechange = function() {
        xmlDoc = xhr.responseXML;
        com1 = getValueFromTag(xmlDoc, 'com1');
        com2 = getValueFromTag(xmlDoc, 'com2');
        com3 = getValueFromTag(xmlDoc, 'com3');
        timestampOld = timestamp;
        timestamp = getValueFromTag(xmlDoc, 'timestamp');

    }
}

function updateBoard() {
    if ($('#com1').html() != com1) {
        animating = true;
        $('#com1').tween({
            top: {
                start: alturacom12,
                stop: alturacom12 + 40,
                units: 'px',
                time: 0,
                duration: 0.5,
                effect: 'easeIn'
            },
            opacity: {
                start: 100,
                stop: 0,
                time: 0,
                duration: 0.5,
                effect: 'easeIn'
            },
            onStop: function() {
                $('#com1').html(com1);
            }
        });

        $('#com1').tween({
            top: {
                start: alturacom12 + 40,
                stop: alturacom12,
                units: 'px',
                time: 0.5,
                duration: 0.5,
                effect: 'easeOut'
            },
            opacity: {
                start: 0,
                stop: 100,
                time: 0.5,
                duration: 0.5,
                effect: 'easeOut'
            },
            onStop: function() {
                animating = false;
            }
        });
    }

    if ($('#com2').html() != com2) {
        animating = true;
        $('#com2').tween({
            top: {
                start: alturacom12,
                stop: alturacom12 + 40,
                units: 'px',
                time: 0,
                duration: 0.5,
                effect: 'easeIn'
            },
            opacity: {
                start: 100,
                stop: 0,
                time: 0,
                duration: 0.5,
                effect: 'easeIn'
            },
            onStop: function() {
                $('#com2').html(com2);
            }
        });

        $('#com2').tween({
            top: {
                start: alturacom12 + 40,
                stop: alturacom12,
                units: 'px',
                time: 0.5,
                duration: 0.5,
                effect: 'easeOut'
            },
            opacity: {
                start: 0,
                stop: 100,
                time: 0.5,
                duration: 0.5,
                effect: 'easeOut'
            },
            onStop: function() {
                animating = false;
            }
        });
    }

    if ($('#com3').html() != com3) {
        animating = true;
        $('#com3').tween({
            top: {
                start: alturacom3,
                stop: alturacom3 + 40,
                units: 'px',
                time: 0,
                duration: 0.5,
                effect: 'easeIn'
            },
            opacity: {
                start: 100,
                stop: 0,
                time: 0,
                duration: 0.5,
                effect: 'easeIn'
            },
            onStop: function() {
                $('#com3').html(com3);
            }
        });

        $('#com3').tween({
            top: {
                start: alturacom3 + 40,
                stop: alturacom3,
                units: 'px',
                time: 0.5,
                duration: 0.5,
                effect: 'easeOut'
            },
            opacity: {
                start: 0,
                stop: 100,
                time: 0.5,
                duration: 0.5,
                effect: 'easeOut'
            },
            onStop: function() {
                animating = false;
            }
        });
    }

    $.play();

    doUpdate = false;
}

function getValueFromTag(xmlDoc, tag) {
    if (xmlDoc.getElementsByTagName(tag).length != 0) {
        if (xmlDoc.getElementsByTagName(tag)[0].childNodes.length == 0) {
            return '';
        } else {
            return xmlDoc.getElementsByTagName(tag)[0].childNodes[0].nodeValue;
        }
    } else {
        return '';
    }
}