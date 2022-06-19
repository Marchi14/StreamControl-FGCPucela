var timestampOld;
var timestamp;
var bracket;
var xmlDoc;

var xhr = new XMLHttpRequest();

function init() {

    xhr.overrideMimeType('text/xml');

    var timeout = this.window.setInterval(function() {
        pollHandler();
    }, 250);
}

function pollHandler() {
    loadData();
    if (timestamp != timestampOld) {
        $('#bracket').attr('src', 'https://challonge.com/es/'+bracket+'/module');
    }
}

function loadData() {
    xhr.open('GET', 'streamcontrol.xml');
    xhr.send();
    xhr.onreadystatechange = function() {
        xmlDoc = xhr.responseXML;
        bracket = getValueFromTag(xmlDoc, 'bracket');
        timestampOld = timestamp;
        timestamp = getValueFromTag(xmlDoc, 'timestamp');

    }
}

//Recoge los valores del archivo streamcontrol.xml
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