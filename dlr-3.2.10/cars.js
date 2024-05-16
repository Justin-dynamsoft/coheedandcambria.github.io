
// A struct to contain all the points, with the id corresponding to the form ID
let loc_points = [
    {x: 680, y: 1226, width: 634, height: 20, id:"1025002"},
    {x: 421, y: 1645, width: 710, height: 20, id:"1025002"},
    {x: 428, y: 1701, width: 701, height: 22, id:"1025002"},
    {x: 648, y: 1043, width: 815, height: 36, id:"1080003"},
    {x: 658, y: 1334, width: 801, height: 35, id:"1080003"},
    {x: 311, y: 827, width: 353, height: 25, id:"2130002"},
    {x: 334, y: 1009, width: 486, height: 26, id:"2130002"},
    {x: 1000, y: 1291, width: 501, height: 24, id:"2140001"},
    {x: 1010, y: 1478, width: 489, height: 25, id:"2140001"},
    {x: 263, y: 1870, width: 510, height: 20, id:"2150003"},
    {x: 228, y: 1923, width: 509, height: 20, id:"2150003"},
    {x: 922, y: 1795, width: 634, height: 25, id:"10400030"},
    {x: 929, y: 1880, width: 621, height: 26, id:"10400030"},
    {x: 151, y: 1976, width: 513, height: 24, id:"10400030"},
    {x: 196, y: 1488, width: 377, height: 28, id:"50000100"},
    {x: 199, y: 1631, width: 395, height: 26, id:"50000100"},
    {x: 194, y: 1766, width: 414, height: 31, id:"50000100"}
];

const loc = null;
//let results_temp = [];

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function Quadrilateral(points){
    this.points = points;
}

// this function takes ONE set of the struct above and turns it into a struct with four Points, which can then be made into a quadrilateral and fed to the roi property
// a Point is created and then assigned to the ptsArr array, and the final ptsArr can then be used to make a single Quadrilateral used for the roi
function createPoints(params){
    let ptsArr = [];
    if(params != null){
        for(let i = 0; i < 4; i++){
            if(i == 0) {
                let p0 = new Point(params.x, params.y);
                ptsArr[i] = p0; 
            } else if (i == 1){
                let p1 = new Point(params.x + params.width, params.y);
                ptsArr[i]= p1;  
            } else if (i == 2){
                let p2 = new Point(params.x + params.width, params.y + params.height);
                ptsArr[i] = p2;
            } else if (i == 3){
                let p3 = new Point(params.x, params.y + params.height);
                ptsArr[i] = p3;
            }
        }
    }
    return ptsArr;
}

async function areSame(arr)
{
    // Put all array elements in a HashSet
    let s = new Set(arr);

    // If all elements are same, size of
    // HashSet should be 1. As HashSet contains only distinct values.
    return (s.size == 1);
}

var DWObject;
function Dynamsoft_OnReady() {
    DWObject = Dynamsoft.DWT.GetWebTwain('dwtcontrolContainer'); // Get the Dynamic Web TWAIN object that is embeded in the div with id 'dwtcontrolContainer'
}

//Callback functions for async APIs
function OnSuccess() {
    console.log('successful');
}
function OnFailure(errorCode, errorString) {
    if(errorCode != -2326)
    alert(errorString);
}

function LoadImage() {
    if (DWObject) {
        DWObject.IfShowFileDialog = true; // Open the system's file dialog to load image
        // PDF Addon is used here to ensure text-based PDF support
        DWObject.Addon.PDF.SetReaderOptions({
            convertMode: Dynamsoft.DWT.EnumDWT_ConvertMode.CM_RENDERALL,
            renderOptions:{
                renderAnnotations: true
            }
        });
        DWObject.LoadImageEx("", Dynamsoft.DWT.EnumDWT_ImageType.IT_ALL, OnSuccess, OnFailure); // Load images in all supported formats (.bmp, .jpg, .tif, .png, .pdf). OnSuccess or OnFailure will be called after the operation
    }
}

async function recognizeSignature(pts) {
    if(DWObject) {
        let res = null;
        // setting the points to the quad of pts
        let cvrSettings = await cvr.getSimplifiedSettings("cv0");
        cvrSettings.roiMeasuredInPercentage = false;
        cvrSettings.roi.points = pts;
        await cvr.updateSettings("cv0", cvrSettings);

        if(DWObject.HowManyImagesInBuffer > 0){
            // Instead of converting to a blob, use the ImageURL DWT API and feed that to the capture method
            let imageURL = DWObject.GetImageURL(DWObject.CurrentImageIndexInBuffer);
            let dlrResult = await cvr.capture(imageURL, "cv0");
            // using the intermediate results (and the intermediate result receiver) the contours are counted and that 
            // will determine whether the area is signed or unsigned
            if(contoursArrayLength > 10) {
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
    dlrData: './dlr-3.2.10/dlrData/'
});

Dynamsoft.Core.CoreModule.loadWasm(["DIP", "CVR", "DLR"]);

// initialize license key here. To initialize, uncomment the line below and replace the input parameter with your own trial key
//Dynamsoft.License.LicenseManager.initLicense("DLS2eyJoYW5kc2hha2VDb2RlIjoiMzE0NTQwLVRYbFhaV0pRY205cSIsIm1haW5TZXJ2ZXJVUkwiOiJodHRwczovL21sdHMuZHluYW1zb2Z0LmNvbSIsIm9yZ2FuaXphdGlvbklEIjoiMzE0NTQwIiwic3RhbmRieVNlcnZlclVSTCI6Imh0dHBzOi8vc2x0cy5keW5hbXNvZnQuY29tIiwiY2hlY2tDb2RlIjoxOTY5OTM3NTcyfQ==");
Dynamsoft.License.LicenseManager.initLicense("f0068MgAAAGtbbcGFIi20OoNpttlmL/rQWWor4cpRmhZRYfc3+gQz5TpTJizvHxzbsMV3HCXB+rg6J2TCIbWiu9KFr2Bqq3I=");
//let ipt = document.querySelector("input");
let blobResult;
let cvr;
let contoursArrayLength = 0;

let pCvrReady = (async () => {
    cvr = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
    // setting up the CVR template settings
    const settings = {
        "CaptureVisionTemplates": [
            {
                "Name": "cv0",
                "OutputOriginalImage": 1,
                "ImageROIProcessingNameArray": [
                    "roi-detect-signature"//,
                    //"roi-recognize-labels"
                ],
                "Timeout": 10000
            }
        ],
        "TargetROIDefOptions": [
            {
                "Name": "roi-detect-signature",
                "TaskSettingNameArray": [
                    "task-detect-signature"
                ]
                //"Location": {
                    //"Offset": {
                        //"MeasuredByPercentage": 0,
                        //"FirstPoint": [421, 1645],
                        //"SecondPoint": [1131, 1645],
                        //"ThirdPoint": [1131, 1665],
                        //"FourthPoint": [421, 1665]
                    //}
                //}
            }
        ],
        "LabelRecognizerTaskSettingOptions": [
            {
                "Name": "task-detect-signature",
                "TextLineSpecificationNameArray": [
                    "tls-textlines"
                ],
                "SectionImageParameterArray": [
                    {
                        "Section": "ST_REGION_PREDETECTION",
                        "ImageParameterName": "ip-recognize"
                    },
                    {
                        "Section": "ST_TEXT_LINE_LOCALIZATION",
                        "ImageParameterName": "ip-recognize"
                    },
                    {
                        "Section": "ST_TEXT_LINE_RECOGNITION",
                        "ImageParameterName": "ip-recognize"
                    }
                ]
            }
        ],
        "ImageParameterOptions": [
            {
                "Name": "ip-recognize",
                "TextDetectionMode": {
                    "Mode": "TTDM_LINE",
                    "Direction": "HORIZONTAL",
                    "Sensitivity": 7
                } //,
                //"BinarizationModes": [
                //  {
                //    "Mode": "BM_LOCAL_BLOCK",
                //    "BlockSizeX": 15,
                //    "BlockSizeY": 15,
                //    "EnableFillBinaryVacancy": 1
                //  }
                //]
            }
        ],
        "CharacterModelOptions": [
            {
                "Name": "Letter"
            }
        ],
        "TextLineSpecificationOptions": [
            {
                "Name": "tls-textlines",
                "CharacterModelName": "Letter",
                "OutputResults": 1,
                "StringLengthRange": [3, 500],
                "CharHeightRange": [
                    5,
                    1000,
                    1
                ],
                "BinarizationModes": [
                    {
                        "Mode": "BM_LOCAL_BLOCK",
                        "BlockSizeX": 11,
                        "BlockSizeY": 11,
                        "EnableFillBinaryVacancy": 1
                    }
                ]
            }
        ]
    };
    await cvr.initSettings(settings);

    // setting up the intermediate result receiver in order to set up the countours counting which is essential
    // to the signature detection process
    let irr = new Dynamsoft.CVR.IntermediateResultReceiver();
    intermediateManager = cvr.getIntermediateResultManager();
    irr.onContoursUnitReceived = (result, info) => {
        if(info.taskName !== "task-detect-signature") {
            return
        } else {
            if (result.contours.length > contoursArrayLength){
                contoursArrayLength = result.contours.length;
            }
            console.log(result, info);
        }
    }
    intermediateManager.addResultReceiver(irr);
})();

/*
For each case, the array of coordinates for each form will be retrieved from the overall coordinates struct.
Once the coordinates set is taken, go in a loop and run the recognizeSignature method based on each coordinates.
The result string (signed or unsigned) for each coordinate set is returned and then put in an array. If a string
is unsigned, make an alert with which box it is. If all the boxes are signed and none of them are unsigned, then the alert will just say "signed" in the end.

Currently done for the default case which is 1025002, just the same needs to be applied to all the other cases.
*/
async function ProcessImage() {
    await pCvrReady;
    
    let formID = document.getElementById("forms");
    switch(formID.value) {
        case "1080003":
            let res_arr1 = [];
            const loc_1080003 = loc_points.filter(function (el){
                return el.id == "1080003";
            })
            console.log(loc_1080003);
            for (let i = 0; i < loc_1080003.length; i++){
                let pts = createPoints(loc_1080003[i]);
                let res_string = await recognizeSignature(pts);
                if(res_string === "unsigned"){
                    res_arr1.push(res_string);
                    alert("unsigned on box " + i);
                } else {
                    res_arr1.push(res_string);
                }
            }
            if(areSame(res_arr1) && !(res_arr1.includes("unsigned"))){
                alert(res_arr1[0]);
            }
            break;
        case "2130002":
            let res_arr2 = [];
            const loc_2130002 = loc_points.filter(function (el){
                return el.id == "2130002";
            })
            console.log(loc_2130002);
            for (let i = 0; i < loc_2130002.length; i++){
                let pts = createPoints(loc_2130002[i]);
                let res_string = await recognizeSignature(pts);
                if(res_string === "unsigned"){
                    res_arr2.push(res_string);
                    alert("unsigned on box " + i);
                } else {
                    res_arr2.push(res_string);
                }
            }
            if(areSame(res_arr2) && !(res_arr2.includes("unsigned"))){
                alert(res_arr2[0]);
            }
            break;
        case "2140001":
            let res_arr3 = [];
            const loc_2140001 = loc_points.filter(function (el){
                return el.id == "2140001";
            })
            console.log(loc_2140001);
            for (let i = 0; i < loc_2140001.length; i++){
                let pts = createPoints(loc_2140001[i]);
                let res_string = await recognizeSignature(pts);
                if(res_string === "unsigned"){
                    res_arr3.push(res_string);
                    alert("unsigned on box " + i);
                } else {
                    res_arr3.push(res_string);
                }
            }
            if(areSame(res_arr3) && !(res_arr3.includes("unsigned"))){
                alert(res_arr3[0]);
            }
            break;
        case "2150003":
            let res_arr4 = [];
            const loc_2150003 = loc_points.filter(function (el){
                return el.id == "2150003";
            })
            console.log(loc_2150003);
            for (let i = 0; i < loc_2150003.length; i++){
                let pts = createPoints(loc_2150003[i]);
                let res_string = await recognizeSignature(pts);
                if(res_string === "unsigned"){
                    res_arr4.push(res_string);
                    alert("unsigned on box " + i);
                } else {
                    res_arr4.push(res_string);
                }
            }
            if(areSame(res_arr4) && !(res_arr4.includes("unsigned"))){
                alert(res_arr4[0]);
            }
            break;
        case "10400030":
            let res_arr5 = [];
            const loc_10400030 = loc_points.filter(function (el){
                return el.id == "10400030";
            })
            console.log(loc_10400030);
            for (let i = 0; i < loc_10400030.length; i++){
                let pts = createPoints(loc_10400030[i]);
                let res_string = await recognizeSignature(pts);
                if(res_string === "unsigned"){
                    res_arr5.push(res_string);
                    alert("unsigned on box " + i);
                } else {
                    res_arr5.push(res_string);
                }
            }
            if(areSame(res_arr5) && !(res_arr5.includes("unsigned"))){
                alert(res_arr5[0]);
            }
            break;
        case "50000100":
            let res_arr6 = [];
            const loc_50000100 = loc_points.filter(function (el){
                return el.id == "50000100";
            })
            console.log(loc_50000100);
            for (let i = 0; i < loc_50000100.length; i++){
                let pts = createPoints(loc_50000100[i]);
                let res_string = await recognizeSignature(pts);
                if(res_string === "unsigned"){
                    res_arr6.push(res_string);
                    alert("unsigned on box " + i);
                } else {
                    res_arr6.push(res_string);
                }
            }
            if(areSame(res_arr6) && !(res_arr6.includes("unsigned"))){
                alert(res_arr6[0]);
            }
            break;
        default:
            let res_arr0 = [];
            const loc_1025002 = loc_points.filter(function (el){
                return el.id == "1025002";
            })
            console.log(loc_1025002);
            for (let i = 0; i < loc_1025002.length; i++){
                let pts = createPoints(loc_1025002[i]);
                let res_string = await recognizeSignature(pts);
                if(res_string === "unsigned"){
                    res_arr0.push(res_string);
                    alert("unsigned on box " + i);
                } else {
                    res_arr0.push(res_string);
                }
            }
            if(areSame(res_arr0) && !(res_arr0.includes("unsigned"))){
                alert(res_arr0[0]);
            }
    }
}

