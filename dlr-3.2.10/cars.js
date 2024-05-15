
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
let results_temp = [];

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
    // setting the points to the quad of pts
    let cvrSettings = await cvr.getSimplifiedSettings("cv0");
    cvrSettings.roiMeasuredInPercentage = false;
    cvrSettings.roi.points = pts;
    await cvr.updateSettings("cv0", cvrSettings);

    if(DWObject) {
        if(DWObject.HowManyImagesInBuffer > 0){
            // convert the latest image in the buffer to a blob
            // if working with a multi-page PDF and uncertain on which page the signature is on, then you will need to loop through the images that are added to the buffer.
            // once the PDF is loaded into the DWT buffer, they are turned into images, so when converting to a blob, the IT_JPG format needs to be selected because PDF will not work with DLR JS
            // In this sample, we just take the latest image in the buffer and then convert that to a blob and then process that using DLR 
            DWObject.ConvertToBlob(
                [DWObject.CurrentImageIndexInBuffer],
                Dynamsoft.DWT.EnumDWT_ImageType.IT_JPG,
                async function (result, indices, type) {
                    console.log(result.size);
                    // now take the blob result and feed it to capture method
                    let dlrResult = await cvr.capture(result, "cv0");
                    if(contoursArrayLength > 10) {
                        results_temp.push("signed");
                    } else {
                        results_temp.push("unsigned");
                    }
                    contoursArrayLength = 0;
                },
                function (errorCode, errorString) {
                    console.log(errorString);
                }
            );

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

    const outputSettings = await cvr.outputSettings("cv0");
    //console.log(outputSettings);

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

async function ProcessImage() {
    await pCvrReady;
    
    let formID = document.getElementById("forms");
    switch(formID.value) {
        case "1080003":
            loc = loc_points.filter(function (el){
                return el.id == "1080003";
            })
            pts = [];
            for (let i = 0; i++; i < loc.length){
                pts[i] = createPoints(loc[i]);
            }
            console.log(pts);
            break;
        case "2130002":
            loc = loc_points.filter(function (el){
                return el.id == "2130002";
            })
            pts = [];
            for (let i = 0; i++; i < loc.length){
                pts[i] = createPoints(loc[i]);
            }
            console.log(pts);
            break;
        case "2140001":
            loc = loc_points.filter(function (el){
                return el.id == "2140001";
            })
            pts = [];
            for (let i = 0; i++; i < loc.length){
                pts[i] = createPoints(loc[i]);
            }
            console.log(pts);
            break;
        case "2150003":
            loc = loc_points.filter(function (el){
                return el.id == "2150003";
            })
            pts = [];
            for (let i = 0; i++; i < loc.length){
                pts[i] = createPoints(loc[i]);
            }
            console.log(pts);
            break;
        case "10400030":
            loc = loc_points.filter(function (el){
                return el.id == "10400030";
            })
            pts = [];
            for (let i = 0; i++; i < loc.length){
                pts[i] = createPoints(loc[i]);
            }
            console.log(pts);
            break;
        case "50000100":
            loc = loc_points.filter(function (el){
                return el.id == "50000100";
            })
            pts = [];
            for (let i = 0; i++; i < loc.length){
                pts[i] = createPoints(loc[i]);
            }
            console.log(pts);
            break;
        default:
            results_temp = [];
            const loc_1025002 = loc_points.filter(function (el){
                return el.id == "1025002";
            })
            console.log(loc_1025002);
            //console.log(createPoints(loc_1025002[0]));
            for (let i = 0; i < loc_1025002.length; i++){
                let pts = createPoints(loc_1025002[i]);
                console.log(pts);
                await recognizeSignature(pts);
                if(i == loc_1025002-1){
                    console.log(results_temp);
                }
            }
            /*if(await areSame(results_temp)){
                alert(results_temp[0]);
            }*/
            //console.log(results_temp)
    }
    /*if(DWObject) {
        if(DWObject.HowManyImagesInBuffer > 0){
            // convert the latest image in the buffer to a blob
            // if working with a multi-page PDF and uncertain on which page the signature is on, then you will need to loop through the images that are added to the buffer.
            // once the PDF is loaded into the DWT buffer, they are turned into images, so when converting to a blob, the IT_JPG format needs to be selected because PDF will not work with DLR JS
            // In this sample, we just take the latest image in the buffer and then convert that to a blob and then process that using DLR 
            DWObject.ConvertToBlob(
                [DWObject.CurrentImageIndexInBuffer],
                Dynamsoft.DWT.EnumDWT_ImageType.IT_JPG,
                async function (result, indices, type) {
                    console.log(result.size);
                    // now take the blob result and feed it to capture method
                    /*for (let i = 0; i++; i < pts.length){
                        let dlrResult = await cvr.capture(result, "cv0");
                        if(contoursArrayLength > 10) {
                            results_temp[i] = "signed";
                        } else {
                            results_temp[i] = "unsigned";
                        }
                    }
                    contoursArrayLength = 0;
                    if(areSame(results_temp)){
                        alert(results_temp[0]);
                    }
                },
                function (errorCode, errorString) {
                    console.log(errorString);
                }
            );

        }
    }*/
}

