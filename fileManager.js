var reader = new FileReader();
reader.onload = loadhandler();

function handleFormSubmit() {
  fileToRead = document.getElementById("file").files[0];
  reader.readAsText(fileToRead);
}

function loadhandler(event) {
  alert("File Loaded");
}
