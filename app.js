// Event Listeners
// Uploaded file listener
document.querySelector('#json-file').addEventListener('change', fileToConvert);
// Convert file listener
document.querySelector('#convert').addEventListener('click', convertFile);
// Download listener
document.querySelector('#download').addEventListener('click', downloadFile);

// Get uploaded file
function fileToConvert(e){
    const convertBtn = document.querySelector("#convert");
    const jsonText = document.querySelector('#json-text');
    const downloadBtn = document.querySelector('#download');
    const csvText = document.querySelector('#csv-text');
    const fileList = e.target.files;
    const fileToRead = e.target.files[0];

    if(fileList[0].type === "application/json") {
      var fileread = new FileReader();
      fileread.onload = function(e) {
        const json = e.target.result;
        jsonText.textContent = json;
        const items = JSON.parse(json); // Array of Objects.
        const str = JSON.stringify(items);
      };
      convertBtn.disabled = false;
      fileread.readAsText(fileToRead);
    } else {
      showAlert('Please choose a JSON file', 'alert alert-danger text-center mt-3');
      convertBtn.disabled = true;
      downloadBtn.disabled = true;
      jsonText.textContent = "";
      csvText.textContent = "";
    }
}

// Convert Json file
function convertFile(){
  const jsonText = document.querySelector('#json-text');
  const downloadBtn = document.querySelector('#download');
  const csvText = document.querySelector('#csv-text');
  const items = JSON.parse(jsonText.value); // Array of Objects.
  csvText.textContent = arrayToCSV(items);
  downloadBtn.disabled = false;
}

// Download CSV file
function downloadFile(){
  const convertBtn = document.querySelector("#convert");
  const jsonText = document.querySelector('#json-text');
  const downloadBtn = document.querySelector('#download');
  const csvText = document.querySelector('#csv-text');
  var fileName = document.querySelector('#json-file');
  fileName = fileName.value.split(/\\/).pop().split('.')[0];
  console.log(fileName);
  var downloadLink = document.createElement("a");
  var blob = new Blob(["\ufeff", csvText.value]);
  var url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = `${fileName}.csv`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  convertBtn.disabled = true;
  downloadBtn.disabled = true;
  jsonText.textContent = "";
  csvText.textContent = "";
}

function showAlert(message, className) {
  this.clearAlert();

  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = className;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.json-container');
  // Get convert button
  const button = document.querySelector('#json-text');
  // Insert alert div
  container.insertBefore(div, button);


  // Timeout
  setTimeout(() => {
    this.clearAlert();
  }, 3000);
}

function clearAlert() {
  const currentAlert = document.querySelector('.alert');

  if(currentAlert) {
    currentAlert.remove();
  }
}

function arrayToCSV (data) {
  csv = data.map(row => Object.values(row));
  csv.unshift(Object.keys(data[0]));
  return csv.join('\n');
}