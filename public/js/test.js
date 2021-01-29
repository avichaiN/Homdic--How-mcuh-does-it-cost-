var myForm = document.getElementById('formAjax');  // Our HTML form's ID
var myFile = document.getElementById('fileAjax');  // Our HTML files' ID
var statusP = document.getElementById('status');

myForm.onsubmit = function(event) {
    event.preventDefault();

    statusP.innerHTML = 'Uploading...';

    // Get the files from the form input
    var files = myFile.files;

    // Create a FormData object
    var formData = new FormData();

    // Select only the first file from the input array
    var file = files[0]; 

    // Check the file type
    if (!file.type.match('image.*')) {
        statusP.innerHTML = 'The file selected is not an image.';
        return;
    }

    // Add the file to the AJAX request
    formData.append('fileAjax', file, file.name);

    // Set up the request
    var xhr = new XMLHttpRequest();

    // Open the connection
    xhr.open('POST', '/uploadHandling.php', true);

    // Set up a handler for when the task for the request is complete
    xhr.onload = function () {
      if (xhr.status == 200) {
        statusP.innerHTML = 'Upload copmlete!';
      } else {
        statusP.innerHTML = 'Upload error. Try again.';
      }
    };

    // Send the data.
    xhr.send(formData);
}