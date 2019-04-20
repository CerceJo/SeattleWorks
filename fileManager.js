function handleFiles(files, isTeam) {
	// Check for the various File API support.
	if (window.FileReader) {
		// FileReader are supported.
		getAsText(files[0], isTeam);
	} else {
		alert('FileReader are not supported in this browser.');
	}
}

function getAsText(fileToRead, isTeam) {
	var reader = new FileReader();
	// Handle errors load
	reader.onload = (isTeam) ? teamLoadHandler : projectLoadHandler;
	reader.onerror = errorHandler;
	// Read file into memory as UTF-8      
	reader.readAsText(fileToRead);
}

function teamLoadHandler(event) {
    console.log("teamLoadHandler running");
	var csv = event.target.result;
	processTeamDataAsObj(csv);             
}

function projectLoadHandler(event) {
    console.log("projectLoadHandler running");
	var csv = event.target.result;
	processProjectDataAsObj(csv);             
}

function processProjectDataAsObj(csv){
    var allTextLines = csv.split(/\r\n|\n/);
	allTextLines.shift();
    
    while (allTextLines.length) {
        var arr = allTextLines.shift().split(',');
        createProject(arr[0], arr[1], arr[2].toLowerCase() == 'true');
    }
	drawOutputAsObj();
}

function processTeamDataAsObj(csv){
    var allTextLines = csv.split(/\r\n|\n/);
    allTextLines.shift();
    
    while (allTextLines.length) {
        var arr = allTextLines.shift().split(',');
        createTeam(arr[0], arr[1], arr[2].toLowerCase() == 'true', arr.slice(3));
    }
	drawOutputAsObj();
}

function errorHandler(evt) {
	if(evt.target.error.name == "NotReadableError") {
		alert("Cannot read file !");
	}
}

//draw the table, if first line contains heading
function drawOutputAsObj(){
	//Clear previous data
	document.getElementById("output").innerHTML = "";
    var row = document.createElement("div");
    
	//the data for Teams
    document.getElementById("output").appendChild(row);
    row.innerHTML = "Teams:";
    for (var i = 0; i < allTeams.length; i++) {
        row = document.createElement("div");
        document.getElementById("output").appendChild(row);
        row.innerHTML = printTeam(allTeams[i]);
	}
    
    //the data for Unclaimed Projects
    row = document.createElement("div");
    document.getElementById("output").appendChild(row);
    row.innerHTML = "Unclaimed Projects:";
    unclaimedProjects.forEach(logProjectElements);
}

function logProjectElements(value, key, map) {
    var row = document.createElement("div");
    document.getElementById("output").appendChild(row);
    var projectsList = '';
    
    for (var i=0; i<value.length; i++) {
        projectsList += value[i].projectName + ' ';
    }   
    row.innerHTML = 'Date: ' + key + ', Projects: ' + projectsList;
}

var allTeams = [];

/*
Team Object
string teamName
string teamCaptain
boolean blackberriesAllowed
Map[] projects
*/
function createTeam(inputTeamName, inputTeamCaptain, inputBlackberriesAllowed, inputPreferredProjectNames) {
	allTeams.push({
        teamName: inputTeamName, 
        teamCaptain: inputTeamCaptain, 
        blackberriesAllowed: inputBlackberriesAllowed,
        preferredProjects: inputPreferredProjectNames,
        preferredProjectUsed: false;
        projects:[]
    });
}

function printTeam(team) {
   return 'teamName: ' + team.teamName + 
                ', teamCaptain: ' + team.teamCaptain + 
                ', blackberries? ' + team.blackberriesAllowed +
                ', preferred projects: ' + team.preferredProjects;
}

function printProject(project) {
    return 'projectName: ' + project.projectName 
        + ' blackberries? ' + project.hasBlackberries;
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

function matchTeams(){
    unclaimedProjects.forEach(matchTeamsForDate);
}

function matchTeamsForDate(projectArray, dateValue, unclaimedProjectsMap){
    if(projectArray.length != allTeams.length){
        alert("Date: '" + dateValue.toString() + "' does not have the same number of projects as you have teams");
    } else {
        console.log("Matching projects for: '" + dateValue + "'.");
        
        //shuffle the allTeams array for fairness
        allTeams.sort(() => Math.random() - 0.5);
        
        for (var team in allTeams){
            //TODO: match team to project
        }
    }
}
