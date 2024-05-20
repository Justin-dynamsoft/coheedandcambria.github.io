const settings = {
    CaptureVisionTemplates: [
      {
        Name: "cv0",
        OutputOriginalImage: 1,
        ImageROIProcessingNameArray: ["roi-detect-signature"],
        Timeout: 10000,
      },
    ],
    TargetROIDefOptions: [
      {
        Name: "roi-detect-signature",
        TaskSettingNameArray: ["task-detect-signature"],
        Location: {
          Offset: {
            MeasuredByPercentage: 0,
            FirstPoint: [0, 0],
            SecondPoint: [100, 0],
            ThirdPoint: [100, 100],
            FourthPoint: [0, 100],
          },
        },
      },
    ],
    LabelRecognizerTaskSettingOptions: [
      {
        Name: "task-detect-signature",
        TextLineSpecificationNameArray: ["tls-textlines"],
        StartSection: "ST_TEXT_LINE_LOCALIZATION",
        TerminateSetting: {
          Section: "ST_TEXT_LINE_LOCALIZATION",
        },
        SectionImageParameterArray: [
          {
            Section: "ST_TEXT_LINE_LOCALIZATION",
            ImageParameterName: "ip-recognize",
          },
        ],
      },
    ],
    ImageParameterOptions: [
      {
        Name: "ip-recognize",
        TextDetectionMode: {
          Mode: "TTDM_LINE",
          Direction: "HORIZONTAL",
          Sensitivity: 7,
        },
      },
    ],
    CharacterModelOptions: [
      {
        Name: "Letter",
      },
    ],
    TextLineSpecificationOptions: [
      {
        Name: "tls-textlines",
        CharacterModelName: "Letter",
        OutputResults: 1,
        StringLengthRange: [3, 500],
        CharHeightRange: [5, 1000, 1],
        BinarizationModes: [
          {
            Mode: "BM_LOCAL_BLOCK",
            BlockSizeX: 11,
            BlockSizeY: 11,
            EnableFillBinaryVacancy: 1,
          },
        ],
      },
    ],
  };
  
  // A struct to contain all the points, with the id corresponding to the form ID
  let loc_points = [
    { x: 680, y: 1226, width: 634, height: 20, id: "1025002" },
    { x: 421, y: 1645, width: 710, height: 20, id: "1025002" },
    { x: 428, y: 1701, width: 701, height: 22, id: "1025002" },
    { x: 648, y: 1043, width: 815, height: 36, id: "1080003" },
    { x: 658, y: 1334, width: 801, height: 35, id: "1080003" },
    { x: 311, y: 827, width: 353, height: 25, id: "2130002" },
    { x: 334, y: 1009, width: 486, height: 26, id: "2130002" },
    { x: 1000, y: 1291, width: 501, height: 24, id: "2140001" },
    { x: 1010, y: 1478, width: 489, height: 25, id: "2140001" },
    { x: 263, y: 1870, width: 510, height: 20, id: "2150003" },
    { x: 228, y: 1923, width: 509, height: 20, id: "2150003" },
    { x: 922, y: 1795, width: 634, height: 25, id: "10400030" },
    { x: 929, y: 1880, width: 621, height: 26, id: "10400030" },
    { x: 151, y: 1976, width: 513, height: 24, id: "10400030" },
    { x: 196, y: 1488, width: 377, height: 28, id: "50000100" },
    { x: 199, y: 1631, width: 395, height: 26, id: "50000100" },
    { x: 194, y: 1766, width: 414, height: 31, id: "50000100" },
  ];
  
  const loc = null;
  
  function createPoints(params) {
    let Offset = {
      MeasuredByPercentage: 0,
      FirstPoint: [0, 0],
      SecondPoint: [100, 0],
      ThirdPoint: [100, 100],
      FourthPoint: [0, 100],
    };
    let ptsArr = [];
    if (params != null) {
      Offset.FirstPoint = [params.x, params.y];
      Offset.SecondPoint = [params.x + params.width, params.y];
      Offset.ThirdPoint = [params.x + params.width, params.y + params.height];
      Offset.FourthPoint = [params.x, params.y + params.height];
    }
    return Offset;
  }
  
  async function areSame(arr) {
    // Put all array elements in a HashSet
    let s = new Set(arr);
  
    // If all elements are same, size of
    // HashSet should be 1. As HashSet contains only distinct values.
    return s.size == 1;
  }
  
  var DWObject;
  function Dynamsoft_OnReady() {
    DWObject = Dynamsoft.DWT.GetWebTwain("dwtcontrolContainer"); // Get the Dynamic Web TWAIN object that is embeded in the div with id 'dwtcontrolContainer'
  }
  
  //Callback functions for async APIs
  function OnSuccess() {
    console.log("successful");
  }
  function OnFailure(errorCode, errorString) {
    if (errorCode != -2326) console.warn(errorString);
  }
  
  function LoadImage() {
    if (DWObject) {
      DWObject.IfShowFileDialog = true; // Open the system's file dialog to load image
      // PDF Addon is used here to ensure text-based PDF support
      DWObject.Addon.PDF.SetReaderOptions({
        convertMode: Dynamsoft.DWT.EnumDWT_ConvertMode.CM_RENDERALL,
        renderOptions: {
          renderAnnotations: true,
        },
      });
      DWObject.LoadImageEx(
        "",
        Dynamsoft.DWT.EnumDWT_ImageType.IT_ALL,
        OnSuccess,
        OnFailure
      ); // Load images in all supported formats (.bmp, .jpg, .tif, .png, .pdf). OnSuccess or OnFailure will be called after the operation
    }
  }
  
  async function recognizeSignature(pts) {
    if (DWObject) {
      let res = null;
      // setting the points to the quad of pts
      let cvrSettings = settings;
      cvrSettings.TargetROIDefOptions[0].Location.Offset = pts;
      await cvr.initSettings(cvrSettings);
  
      if (DWObject.HowManyImagesInBuffer > 0) {
        // Instead of converting to a blob, use the ImageURL DWT API and feed that to the capture method
        let imageURL = DWObject.GetImageURL(DWObject.CurrentImageIndexInBuffer);
        let dlrResult = await cvr.capture(imageURL, "cv0");
        // using the intermediate results (and the intermediate result receiver) the contours are counted and that
        // will determine whether the area is signed or unsigned
        if (contoursArrayLength > 9) {
          res = "signed";
        } else {
          res = "unsigned";
        }
        contoursArrayLength = 0;
        return res;
      }
    }
  }
  
    Object.assign(Dynamsoft.Core.CoreModule.engineResourcePaths, {
        std: './dlr-3.2.10/std/',
        dip: './dlr-3.2.10/dip/',
        dnn: './dlr-3.2.10/dnn/',
        dlrData: './dlr-3.2.10/dlrData/',
        utility: './dlr-3.2.10/utility/'
    });
  
  Dynamsoft.Core.CoreModule.loadWasm(["DIP", "CVR", "DLR"]);
  
  // initialize license key here. To initialize, uncomment the line below and replace the input parameter with your own trial key
  //Dynamsoft.License.LicenseManager.initLicense("DLS2eyJoYW5kc2hha2VDb2RlIjoiMzE0NTQwLVRYbFhaV0pRY205cSIsIm1haW5TZXJ2ZXJVUkwiOiJodHRwczovL21sdHMuZHluYW1zb2Z0LmNvbSIsIm9yZ2FuaXphdGlvbklEIjoiMzE0NTQwIiwic3RhbmRieVNlcnZlclVSTCI6Imh0dHBzOi8vc2x0cy5keW5hbXNvZnQuY29tIiwiY2hlY2tDb2RlIjoxOTY5OTM3NTcyfQ==");
  Dynamsoft.License.LicenseManager.initLicense(
    "f0068MgAAAGtbbcGFIi20OoNpttlmL/rQWWor4cpRmhZRYfc3+gQz5TpTJizvHxzbsMV3HCXB+rg6J2TCIbWiu9KFr2Bqq3I="
  );
  let blobResult;
  let cvr;
  let contoursArrayLength = 0;
  
  let pCvrReady = (async () => {
    cvr = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
    await cvr.initSettings(settings);
  
    const imgManager = new Dynamsoft.Utility.ImageManager();
    // setting up the intermediate result receiver in order to set up the countours counting which is essential
    // to the signature detection process
    let irr = new Dynamsoft.CVR.IntermediateResultReceiver();
    intermediateManager = cvr.getIntermediateResultManager();
    irr.onContoursUnitReceived = (result, info) => {
      if (info.taskName !== "task-detect-signature") {
        return;
      } else {
        if (result.contours.length > contoursArrayLength) {
          contoursArrayLength = result.contours.length;
        }
        let allPoints = [];
        result.contours.forEach((contour) => {
          allPoints = allPoints.concat(contour.points);
        });
        console.log("Contours: " + result.contours.length);
        console.log("Points: " + allPoints.length);
      }
    };
    irr.onColourImageUnitReceived = (result, info) => {
      imgManager
        .saveToFile(
          result.imageData,
          result.hashId + "_processedImage.png",
          false
        )
        .then((file) => {
          displayImage(file);
        });
    };
    intermediateManager.addResultReceiver(irr);
  })();
  // This function converts a file object to a data URL and sets it as the src of the image tag
  function displayImage(file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      let imgElement = document.createElement("img");
      imgElement.src = event.target.result;
      document
        .getElementById("signatureBlocks")
        .appendChild(document.createElement("hr"));
      document.getElementById("signatureBlocks").appendChild(imgElement);
    };
    reader.readAsDataURL(file);
  }
  
  /*
  For each case, the array of coordinates for each form will be retrieved from the overall coordinates struct.
  Once the coordinates set is taken, go in a loop and run the recognizeSignature method based on each coordinates.
  The result string (signed or unsigned) for each coordinate set is returned and then put in an array. If a string
  is unsigned, make an alert with which box it is. If all the boxes are signed and none of them are unsigned, then the alert will just say "signed" in the end.
  
  Currently done for the default case which is 1025002, just the same needs to be applied to all the other cases.
  */
  async function ProcessImage() {
    await pCvrReady;
    document.getElementById("signatureBlocks").innerHTML = "";
    let formID = document.getElementById("forms");
    switch (formID.value) {
      case "1080003":
        let res_arr1 = [];
        const loc_1080003 = loc_points.filter(function (el) {
          return el.id == "1080003";
        });
        for (let i = 0; i < loc_1080003.length; i++) {
          let pts = createPoints(loc_1080003[i]);
          let res_string = await recognizeSignature(pts);
          if (res_string === "unsigned") {
            res_arr1.push(res_string);
            console.warn("unsigned on box " + i);
          } else {
            res_arr1.push(res_string);
          }
        }
        if (areSame(res_arr1) && !res_arr1.includes("unsigned")) {
          console.warn(res_arr1[0]);
        }
        break;
      case "2130002":
        let res_arr2 = [];
        const loc_2130002 = loc_points.filter(function (el) {
          return el.id == "2130002";
        });
        for (let i = 0; i < loc_2130002.length; i++) {
          let pts = createPoints(loc_2130002[i]);
          console.log(pts);
          let res_string = await recognizeSignature(pts);
          if (res_string === "unsigned") {
            res_arr2.push(res_string);
            console.warn("unsigned on box " + i);
          } else {
            res_arr2.push(res_string);
          }
        }
        if (areSame(res_arr2) && !res_arr2.includes("unsigned")) {
          console.warn(res_arr2[0]);
        }
        break;
      case "2140001":
        let res_arr3 = [];
        const loc_2140001 = loc_points.filter(function (el) {
          return el.id == "2140001";
        });
        for (let i = 0; i < loc_2140001.length; i++) {
          let pts = createPoints(loc_2140001[i]);
          console.log(pts);
          let res_string = await recognizeSignature(pts);
          if (res_string === "unsigned") {
            res_arr3.push(res_string);
            console.warn("unsigned on box " + i);
          } else {
            res_arr3.push(res_string);
          }
        }
        if (areSame(res_arr3) && !res_arr3.includes("unsigned")) {
          console.warn(res_arr3[0]);
        }
        break;
      case "2150003":
        let res_arr4 = [];
        const loc_2150003 = loc_points.filter(function (el) {
          return el.id == "2150003";
        });
        for (let i = 0; i < loc_2150003.length; i++) {
          let pts = createPoints(loc_2150003[i]);
          console.log(pts);
          let res_string = await recognizeSignature(pts);
          if (res_string === "unsigned") {
            res_arr4.push(res_string);
            console.warn("unsigned on box " + i);
          } else {
            res_arr4.push(res_string);
          }
        }
        if (areSame(res_arr4) && !res_arr4.includes("unsigned")) {
          console.warn(res_arr4[0]);
        }
        break;
      case "10400030":
        let res_arr5 = [];
        const loc_10400030 = loc_points.filter(function (el) {
          return el.id == "10400030";
        });
        for (let i = 0; i < loc_10400030.length; i++) {
          let pts = createPoints(loc_10400030[i]);
          console.log(pts);
          let res_string = await recognizeSignature(pts);
          if (res_string === "unsigned") {
            res_arr5.push(res_string);
            console.warn("unsigned on box " + i);
          } else {
            res_arr5.push(res_string);
          }
        }
        if (areSame(res_arr5) && !res_arr5.includes("unsigned")) {
          console.warn(res_arr5[0]);
        }
        break;
      case "50000100":
        let res_arr6 = [];
        const loc_50000100 = loc_points.filter(function (el) {
          return el.id == "50000100";
        });
        for (let i = 0; i < loc_50000100.length; i++) {
          let pts = createPoints(loc_50000100[i]);
          console.log(pts);
          let res_string = await recognizeSignature(pts);
          if (res_string === "unsigned") {
            res_arr6.push(res_string);
            console.warn("unsigned on box " + i);
          } else {
            res_arr6.push(res_string);
          }
        }
        if (areSame(res_arr6) && !res_arr6.includes("unsigned")) {
          console.warn(res_arr6[0]);
        }
        break;
      default:
        let res_arr0 = [];
        const loc_1025002 = loc_points.filter(function (el) {
          return el.id == "1025002";
        });
        console.log(loc_1025002);
        for (let i = 0; i < loc_1025002.length; i++) {
          let pts = createPoints(loc_1025002[i]);
          console.log(pts);
          let res_string = await recognizeSignature(pts);
          if (res_string === "unsigned") {
            res_arr0.push(res_string);
            console.warn("unsigned on box " + i);
          } else {
            res_arr0.push(res_string);
          }
        }
        if (areSame(res_arr0) && !res_arr0.includes("unsigned")) {
          console.warn(res_arr0[0]);
        }
    }
  }
  