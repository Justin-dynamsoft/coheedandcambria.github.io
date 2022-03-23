const btn = document.querySelector('button');
let pScanner = null;
let latestResult = null;

btn.addEventListener('click', async function() {
  //setTitleContent('666');
  Notification.requestPermission().then((result) => {
    if (result === 'granted') {
        startNotificationLoop();
    }
  });
  try {
      Dynamsoft.DBR.BarcodeScanner.license = "t0068MgAAAJr6FVw3baM97AhZuRLqhIL/aolgMrOAmsvBswNvQsJkSpR7iuf3cVaCZi1dXUd46krxcp5a7/jh+P2rswVJLZM=";
      const scanner = await (pScanner = pScanner || Dynamsoft.DBR.BarcodeScanner.createInstance());
      scanner.onFrameRead = results => {
          console.log("Barcodes on one frame:");
          for (let result of results) {
              console.log(result.barcodeFormatString + ": " + result.barcodeText);
          }
      };
      scanner.onUnduplicatedRead = (txt, result) => {
          latestResult = txt;
          alert(txt, result);
      }
      await scanner.show();
  } catch (ex) {
      alert(ex.message);
      throw ex;
  }
});

function startNotificationLoop() {
  if (latestResult != null) {
      const title = "New Barcode Found!";
      const notifBody = `Barcode Text: ${latestResult}.`;
      const options = {
          body: notifBody,
      };
      new Notification(title, options);
      latestResult = null;
  }
  setTimeout(startNotificationLoop, 100);
}


/*function setTitleContent(value) {
  document.querySelector('h2').innerHTML = value;
}*/