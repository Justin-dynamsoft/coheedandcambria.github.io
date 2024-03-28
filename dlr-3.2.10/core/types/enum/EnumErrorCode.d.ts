/**
 * `ErrorCode` enumerates the specific error codes that the SDK may return, providing a systematic way to identify and handle errors encountered during its operation.
 */
export declare enum EnumErrorCode {
    /** Operation completed successfully. */
    EC_OK = 0,
    /** An unspecified error occurred. */
    EC_UNKNOWN = -10000,
    /** The system does not have enough memory to perform the requested operation. */
    EC_NO_MEMORY = -10001,
    /** A null pointer was encountered where a valid pointer was required. */
    EC_NULL_POINTER = -10002,
    /** The provided license is not valid. */
    EC_LICENSE_INVALID = -10003,
    /** The provided license has expired. */
    EC_LICENSE_EXPIRED = -10004,
    /** The specified file could not be found. */
    EC_FILE_NOT_FOUND = -10005,
    /** The file type is not supported for processing. */
    EC_FILE_TYPE_NOT_SUPPORTED = -10006,
    /** The image's bits per pixel (BPP) is not supported. */
    EC_BPP_NOT_SUPPORTED = -10007,
    /** The specified index is out of the valid range. */
    EC_INDEX_INVALID = -10008,
    /** The specified custom region value is invalid or out of range. */
    EC_CUSTOM_REGION_INVALID = -10010,
    /** Failed to read the image due to an error in accessing or interpreting the image data. */
    EC_IMAGE_READ_FAILED = -10012,
    /** Failed to read a TIFF image, possibly due to corruption or unsupported format. */
    EC_TIFF_READ_FAILED = -10013,
    /** The provided DIB (Device-Independent Bitmaps) buffer is invalid or corrupted. */
    EC_DIB_BUFFER_INVALID = -10018,
    /** Failed to read a PDF image, possibly due to corruption or unsupported format. */
    EC_PDF_READ_FAILED = -10021,
    /** Required PDF processing DLL is missing. */
    EC_PDF_DLL_MISSING = -10022,
    /** The specified page number is invalid or out of bounds for the document. */
    EC_PAGE_NUMBER_INVALID = -10023,
    /** The specified custom size is invalid or not supported. */
    EC_CUSTOM_SIZE_INVALID = -10024,
    /** The operation timed out. */
    EC_TIMEOUT = -10026,
    /** Failed to parse JSON input. */
    EC_JSON_PARSE_FAILED = -10030,
    /** The JSON type is invalid for the expected context. */
    EC_JSON_TYPE_INVALID = -10031,
    /** The JSON key is invalid or unrecognized in the current context. */
    EC_JSON_KEY_INVALID = -10032,
    /** The JSON value is invalid for the specified key. */
    EC_JSON_VALUE_INVALID = -10033,
    /** The required "Name" key is missing in the JSON data. */
    EC_JSON_NAME_KEY_MISSING = -10034,
    /** The value of the "Name" key is duplicated and conflicts with existing data. */
    EC_JSON_NAME_VALUE_DUPLICATED = -10035,
    /** The template name is invalid or does not match any known template. */
    EC_TEMPLATE_NAME_INVALID = -10036,
    /** The reference made by the "Name" key is invalid or points to nonexistent data. */
    EC_JSON_NAME_REFERENCE_INVALID = -10037,
    /** The parameter value provided is invalid or out of the expected range. */
    EC_PARAMETER_VALUE_INVALID = -10038,
    /** The domain of the current site does not match the domain bound to the current product key. */
    EC_DOMAIN_NOT_MATCH = -10039,
    /** The reserved information does not match the reserved info bound to the current product key. */
    EC_RESERVED_INFO_NOT_MATCH = -10040,
    /** The license key does not match the license content. */
    EC_LICENSE_KEY_NOT_MATCH = -10043,
    /** Failed to request the license content from the server. */
    EC_REQUEST_FAILED = -10044,
    /** Failed to initialize the license. */
    EC_LICENSE_INIT_FAILED = -10045,
    /** Error setting the mode's argument, indicating invalid or incompatible arguments. */
    EC_SET_MODE_ARGUMENT_ERROR = -10051,
    /** The license content is invalid or corrupted. */
    EC_LICENSE_CONTENT_INVALID = -10052,
    /** The license key is invalid or does not match any known valid keys. */
    EC_LICENSE_KEY_INVALID = -10053,
    /** The license key has reached its maximum allowed usage and has no remaining quota. */
    EC_LICENSE_DEVICE_RUNS_OUT = -10054,
    /** Failed to retrieve the mode's argument, possibly due to invalid state or configuration. */
    EC_GET_MODE_ARGUMENT_ERROR = -10055,
    /** The Intermediate Result Types (IRT) license is invalid or not present. */
    EC_IRT_LICENSE_INVALID = -10056,
    /** Failed to save the file, possibly due to permissions, space, or an invalid path. */
    EC_FILE_SAVE_FAILED = -10058,
    /** The specified stage type is invalid or not supported in the current context. */
    EC_STAGE_TYPE_INVALID = -10059,
    /** The specified image orientation is invalid or not supported. */
    EC_IMAGE_ORIENTATION_INVALID = -10060,
    /** Failed to convert complex template to simplified settings, indicating a configuration or compatibility issue. */
    EC_CONVERT_COMPLEX_TEMPLATE_ERROR = -10061,
    /** Rejecting function call while capturing is in progress, to prevent conflicts or data corruption. */
    EC_CALL_REJECTED_WHEN_CAPTURING = -10062,
    /** The specified image source was not found, indicating a missing or inaccessible input source. */
    EC_NO_IMAGE_SOURCE = -10063,
    /** Failed to read the directory, possibly due to permissions, non-existence, or other access issues. */
    EC_READ_DIRECTORY_FAILED = -10064,
    /** A required module (e.g., DynamsoftBarcodeReader, DynamsoftLabelRecognizer) was not found. */
    EC_MODULE_NOT_FOUND = -10065,
    /** The operation does not support multi-page files; use FileFetcher for processing such files. */
    EC_MULTI_PAGES_NOT_SUPPORTED = -10066,
    /** Indicates an attempt to write to a file that already exists, with overwriting explicitly disabled. This error suggests the need for either enabling overwriting or ensuring unique file names to avoid conflicts. */
    EC_FILE_ALREADY_EXISTS = -10067,
    /** The specified file path does not exist and could not be created. This error could be due to insufficient permissions, a read-only filesystem, or other environmental constraints preventing file creation. */
    EC_CREATE_FILE_FAILED = -10068,
    /** The input ImageData object contains invalid parameters. This could be due to incorrect data types, out-of-range values, or improperly formatted data being passed to a function expecting ImageData. */
    EC_IMGAE_DATA_INVALID = -10069,
    /** The size of the input image does not meet the requirements. */
    EC_IMAGE_SIZE_NOT_MATCH = -10070,
    /** The pixel format of the input image does not meet the requirements. */
    EC_IMAGE_PIXEL_FORMAT_NOT_MATCH = -10071,
    /** The section level result is irreplaceable. */
    EC_SECTION_LEVEL_RESULT_IRREPLACEABLE = -10072,
    /** Incorrect axis definition. */
    EC_AXIS_DEFINITION_INCORRECT = -10073,
    /**The result is not replaceable due to type mismatch*/
    EC_RESULT_TYPE_MISMATCH_IRREPLACEABLE = -10074,
    /** Indicates no license is available or the license is not set. */
    EC_NO_LICENSE = -20000,
    /** The provided Handshake Code is invalid or does not match expected format. */
    EC_HANDSHAKE_CODE_INVALID = -20001,
    /** Encountered failures while attempting to read or write to the license buffer. */
    EC_LICENSE_BUFFER_FAILED = -20002,
    /** Synchronization with the license server failed, possibly due to network issues or server unavailability. */
    EC_LICENSE_SYNC_FAILED = -20003,
    /** The device attempting to use the license does not match the device specified in the license buffer. */
    EC_DEVICE_NOT_MATCH = -20004,
    /** Binding the device to the license failed, indicating possible issues with the license or device identifier. */
    EC_BIND_DEVICE_FAILED = -20005,
    /** The number of instances using the license exceeds the limit allowed by the license terms. */
    EC_INSTANCE_COUNT_OVER_LIMIT = -20008,
    /** InitLicenseFromDLS must be called before any SDK objects are created to ensure proper license initialization. */
    EC_LICENSE_INIT_SEQUENCE_FAILED = -20009,
    /** Indicates the license in use is a trial version with limited functionality or usage time. */
    EC_TRIAL_LICENSE = -20010,
    /** The system failed to reach the License Server, likely due to network connectivity issues. */
    EC_FAILED_TO_REACH_DLS = -20200,
    /** Online license validation failed due to network issues. Using cached license information for validation.*/
    EC_LICENSE_CACHE_USED = -20012,
    /** The specified barcode format is invalid or unsupported. */
    EC_BARCODE_FORMAT_INVALID = -30009,
    /** The license for decoding QR Codes is invalid or not present. */
    EC_QR_LICENSE_INVALID = -30016,
    /** The license for decoding 1D barcodes is invalid or not present. */
    EC_1D_LICENSE_INVALID = -30017,
    /** The license for decoding PDF417 barcodes is invalid or not present. */
    EC_PDF417_LICENSE_INVALID = -30019,
    /** The license for decoding DataMatrix barcodes is invalid or not present. */
    EC_DATAMATRIX_LICENSE_INVALID = -30020,
    /** The specified custom module size for barcode generation is invalid or outside acceptable limits. */
    EC_CUSTOM_MODULESIZE_INVALID = -30025,
    /** The license for decoding Aztec barcodes is invalid or not present. */
    EC_AZTEC_LICENSE_INVALID = -30041,
    /** The license for decoding Patchcode barcodes is invalid or not present. */
    EC_PATCHCODE_LICENSE_INVALID = -30046,
    /** The license for decoding postal code formats is invalid or not present. */
    EC_POSTALCODE_LICENSE_INVALID = -30047,
    /** The license for Direct Part Marking (DPM) decoding is invalid or not present. */
    EC_DPM_LICENSE_INVALID = -30048,
    /** A frame decoding thread is already running, indicating a concurrent operation conflict. */
    EC_FRAME_DECODING_THREAD_EXISTS = -30049,
    /** Stopping the frame decoding thread failed, indicating potential issues with thread management. */
    EC_STOP_DECODING_THREAD_FAILED = -30050,
    /** The license for decoding MaxiCode barcodes is invalid or not present. */
    EC_MAXICODE_LICENSE_INVALID = -30057,
    /** The license for decoding GS1 DataBar barcodes is invalid or not present. */
    EC_GS1_DATABAR_LICENSE_INVALID = -30058,
    /** The license for decoding GS1 Composite codes is invalid or not present. */
    EC_GS1_COMPOSITE_LICENSE_INVALID = -30059,
    /** The license for decoding DotCode barcodes is invalid or not present. */
    EC_DOTCODE_LICENSE_INVALID = -30061,
    /** The license for decoding Pharmacode barcodes is invalid or not present. */
    EC_PHARMACODE_LICENSE_INVALID = -30062,
    /** Indicates that the required character model file was not found, possibly due to incorrect paths or missing files. */
    EC_CHARACTER_MODEL_FILE_NOT_FOUND = -40100,
    /**There is a conflict in the layout of TextLineGroup. */
    EC_TEXT_LINE_GROUP_LAYOUT_CONFLICT = -40101,
    /**There is a conflict in the regex of TextLineGroup. */
    EC_TEXT_LINE_GROUP_REGEX_CONFLICT = -40102,
    /** The specified quadrilateral is invalid, potentially due to incorrect points or an unprocessable shape. */
    EC_QUADRILATERAL_INVALID = -50057,
    /** The license for generating or processing panoramas is invalid or missing. */
    EC_PANORAMA_LICENSE_INVALID = -70060,
    /** The specified resource path does not exist, indicating a missing directory or incorrect path specification. */
    EC_RESOURCE_PATH_NOT_EXIST = -90001,
    /** Failed to load the specified resource, which might be due to missing files, access rights, or other issues preventing loading. */
    EC_RESOURCE_LOAD_FAILED = -90002,
    /** The code specification required for processing was not found, indicating a missing or incorrect specification. */
    EC_CODE_SPECIFICATION_NOT_FOUND = -90003,
    /** The full code string provided is empty, indicating no data was provided for processing. */
    EC_FULL_CODE_EMPTY = -90004,
    /** Preprocessing the full code string failed, possibly due to invalid format, corruption, or unsupported features. */
    EC_FULL_CODE_PREPROCESS_FAILED = -90005,
    /** The license required for parsing South Africa Driver License data is invalid or not present. */
    EC_ZA_DL_LICENSE_INVALID = -90006,
    /** The license required for parsing North America DL/ID (AAMVA) data is invalid or not present. */
    EC_AAMVA_DL_ID_LICENSE_INVALID = -90007,
    /** The license required for parsing Aadhaar data is invalid or not present. */
    EC_AADHAAR_LICENSE_INVALID = -90008,
    /** The license required for parsing Machine Readable Travel Documents (MRTD) is invalid or not present. */
    EC_MRTD_LICENSE_INVALID = -90009,
    /** The license required for parsing Vehicle Identification Number (VIN) data is invalid or not present. */
    EC_VIN_LICENSE_INVALID = -90010,
    /** The license required for parsing customized code types is invalid or not present. */
    EC_CUSTOMIZED_CODE_TYPE_LICENSE_INVALID = -90011
}
