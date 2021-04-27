/* The purpose of this file is to combine the DBR Scanner initialization code as well as the common operations among all the samples in the settings folder */

let scanner = null;
let modalSettings = document.getElementById('settingsModal');
let settingsBtn = document.getElementById('openSimpleSettingsMenu');
let readBtn = document.getElementById('readBarcode');
let closeModalBtn = document.getElementById('closeModalBtn');

// Create a BarcodeScanner instance on page load to speed things up.
window.onload = async function () {
    try {
        Dynamsoft.DBR.BarcodeReader.organizationID = "200001";
        scanner = scanner || await Dynamsoft.DBR.BarcodeScanner.createInstance();
        await scanner.setUIElement(document.getElementById('div-video-container'));
    } catch (ex) {
        alert(ex.message);
        throw ex;
    }
};

// Open the settings modal menu once the settings button is clicked
settingsBtn.onclick = function(){
    modalSettings.style.display = "block";
}

// Close the modal when the 'x' is clicked
closeModalBtn.onclick = function() {
    modalSettings.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modalSettings) {
        modalSettings.style.display = "none";
    }
}

// open the scanner video and start decoding once the Read Barcode button is clicked
readBtn.onclick = async function () {
    try {
        scanner.onUnduplicatedRead = (txt, result) => {
            alert(txt);
            console.log(result);
        }
        await scanner.show();
    } catch (ex) {
        alert(ex.message);
        throw ex;
    }
}

// This is a prototype function that can simulate an event. This will be used to simulate a click to implement the workaround to the 'hover' tooltip issue for mobile browsers
function eventFire(el, etype){
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      var evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }

/* The following defines an onclick event for all the tooltip elements. This trigger is being added to take into account that there is no 'hover' event when using a mobile browser. Therefore, this event will be added so that the tooltip appears whenever it is tapped on a mobile browser */
const tooltips = document.getElementsByClassName("tooltip");
for(let i = 0; i < tooltips.length; i++){
    tooltips[i].addEventListener('click', function(){
        tooltips[i].setAttribute('data-balloon-visible', '');
        setTimeout(function(){
            tooltips[i].removeAttribute('data-balloon-visible');
        }, 3000);
    })
}