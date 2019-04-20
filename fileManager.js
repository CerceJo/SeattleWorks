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
  alert("File Loaded");
}
 function errorHandler (event){
   alert("Oh no!"); // TODO: Error Handling
 }
