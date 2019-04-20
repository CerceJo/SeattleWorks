function handleFiles(files) {
	// Check for the various File API support.
	if (window.FileReader) {
		// FileReader are supported.
		getAsText(files[0]);
	} else {
		alert('FileReader are not supported in this browser.');
	}
}

function getAsText(fileToRead) {
	var reader = new FileReader();
	// Handle errors load
	reader.onload = loadHandler;
	reader.onerror = errorHandler;
	// Read file into memory as UTF-8      
	reader.readAsText(fileToRead);
}

function loadHandler(event) {
	var csv = event.target.result;
	processDataAsObj(csv);             
}

//if your csv file contains the column names as the first line
function processDataAsObj(csv){
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
	
    //first line of csv
    var keys = allTextLines.shift().split(',');
	
    while (allTextLines.length) {
        var arr = allTextLines.shift().split(',');
        var obj = {};
        for(var i = 0; i < keys.length; i++){
            obj[keys[i]] = arr[i];
	}
        lines.push(obj);
    }
        console.log(lines);
	drawOutputAsObj(lines);
}

function errorHandler(evt) {
	if(evt.target.error.name == "NotReadableError") {
		alert("Canno't read file !");
	}
}

//draw the table, if first line contains heading
function drawOutputAsObj(lines){
	//Clear previous data
	document.getElementById("output").innerHTML = "";
	var table = document.createElement("table");
	
	//for the table headings
	var tableHeader = table.insertRow(-1);
 	Object.keys(lines[0]).forEach(function(key){
 		var el = document.createElement("TH");
		el.innerHTML = key;		
		tableHeader.appendChild(el);
	});	
	
	//the data
	for (var i = 0; i < lines.length; i++) {
		var row = table.insertRow(-1);
		Object.keys(lines[0]).forEach(function(key){
			var data = row.insertCell(-1);
			data.appendChild(document.createTextNode(lines[i][key]));
		});
	}
	document.getElementById("output").appendChild(table);
}
var allTeams = [];

/*
Team Object
string teamName
string teamCaptain
boolean blackberriesAllowed
Map[] projects
*/
function createTeam(inputTeamName, inputTeamCaptain, inputBlackberriesAllowed) {
	allTeams.push({teamName: inputTeamName, 
				     teamCaptain: inputTeamCaptain, 
				     blackberriesAllowed: inputBlackberriesAllowed,
				     projects:[]});
}

// mapOfArrays unclaimedProjects
// Represents projects for each date
var unclaimedProjects = new Map();

/*
Project Object
String projectName
boolean hasBlackberries
*/
function createProject(inputDateString, inputProjectName, inputHasBlackberries) {
	var projectArrayForDate = unclaimedProjects.get(inputDateString);
	if (!projectArrayForDate) {
		projectArrayForDate = new Array();
	}
	projectArrayForDate.push({projectName: inputProjectName, 
				     hasBlackberries: inputHasBlackberries});
	unclaimedProjects.set(inputDateString, projectArrayForDate);
}
