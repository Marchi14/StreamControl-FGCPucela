var timestampOld;
var timestamp;
var pName1;
var pScore1;
var pName2;
var pScore2;
var Ronda;

var xmlDoc;

var xhr = new XMLHttpRequest();

var animating = false;
var doUpdate = false;

function init() {

    xhr.overrideMimeType('text/xml');

    var timeout = this.window.setInterval(function() {
        pollHandler();
    }, 250);
    $('#pName1').html('');
    $('#pScore1').html('');
    $('#pName2').html('');
    $('#pScore2').html('');
    $('#Ronda').html('');
    $('#board').tween({
        top: {
            start: '-100',
            stop: '0',
            units: 'px',
            time: 0,
            duration: 0.8,
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
        pName1 = getValueFromTag(xmlDoc, 'pName1');
        pName2 = getValueFromTag(xmlDoc, 'pName2');
        pScore1 = getValueFromTag(xmlDoc, 'pScore1');
        pScore2 = getValueFromTag(xmlDoc, 'pScore2');
        Ronda = getValueFromTag(xmlDoc, 'Ronda');
        timestampOld = timestamp;
        timestamp = getValueFromTag(xmlDoc, 'timestamp');

    }
}

function updateBoard() {
    if ($('#pName1').html() != pName1) {
        animating = true;
        $('#pName1').tween({
            left: {
                start: 313,
                stop: 413,
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
                $('#pName1').html(pName1);
            }
        });

        $('#pName1').tween({
            left: {
                start: 413,
                stop: 313,
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

    if ($('#pName2').html() != pName2) {
        animating = true;
        $('#pName2').tween({
            left: {
                start: 733,
                stop: 633,
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
                $('#pName2').html(pName2);
            }
        });

        $('#pName2').tween({
            left: {
                start: 633,
                stop: 733,
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

    if ($('#pScore1').html() != pScore1) {
        animating = true;
        $('#pScore1').tween({
            opacity: {
                start: 100,
                stop: 0,
                time: 0,
                duration: 0.5,
                effect: 'easeIn'
            },
            onStop: function() {
                $('#pScore1').html(pScore1);
            }
        });

        $('#pScore1').tween({
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

    if ($('#pScore2').html() != pScore2) {
        animating = true;
        $('#pScore2').tween({
            opacity: {
                start: 100,
                stop: 0,
                time: 0,
                duration: 0.5,
                effect: 'easeIn'
            },
            onStop: function() {
                $('#pScore2').html(pScore2);
            }
        });

        $('#pScore2').tween({
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

    if ($('#Ronda').html() != Ronda) {
        animating = true;
        $('#Ronda').tween({
            opacity: {
                start: 100,
                stop: 0,
                time: 0,
                duration: 0.5,
                effect: 'easeIn'
            },
            onStop: function() {
                $('#Ronda').html(Ronda);
            }
        });

        $('#Ronda').tween({
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