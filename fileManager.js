function handleFormSubmit() {
  filesToRead = document.getElementById("file").files;
  getAsText(filesToRead);
}

function getAsText(filesToRead) {
	var reader = new FileReader();
	// Handle errors load
	reader.onload = loadHandler;
	reader.onerror = errorHandler;
	// Read file into memory as UTF-8      
	reader.readAsText(filesToRead[0]); //TODO: handle empty array
}

function loadHandler(event) {
	alert ("started loadHandler");
	var csv = event.target.result;
	processData(csv);             
}

function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
    while (allTextLines.length) {
        lines.push(allTextLines.shift().split(','));
    }
	console.log(lines);
	//drawOutput(lines);
}

 function errorHandler (event){
   alert("Oh no!"); // TODO: Error Handling
 }
