export declare enum EnumIntermediateResultUnitType {
    /** No intermediate result. */
    IRUT_NULL = 0,
    /** A full-color image. */
    IRUT_COLOUR_IMAGE = 1,
    /** A color image that has been scaled down for efficiency. */
    IRUT_SCALED_DOWN_COLOUR_IMAGE = 2,
    /** A grayscale image derived from the original input. */
    IRUT_GRAYSCALE_IMAGE = 4,
    /** A grayscale image that has undergone transformation. */
    IRUT_TRANSOFORMED_GRAYSCALE_IMAGE = 8,
    /** A grayscale image enhanced for further processing. */
    IRUT_ENHANCED_GRAYSCALE_IMAGE = 16,
    /** Regions pre-detected as potentially relevant for further analysis. */
    IRUT_PREDETECTED_REGIONS = 32,
    /** A binary (black and white) image. */
    IRUT_BINARY_IMAGE = 64,
    /** Results from detecting textures within the image. */
    IRUT_TEXTURE_DETECTION_RESULT = 128,
    /** A grayscale image with textures removed to enhance subject details like text or barcodes. */
    IRUT_TEXTURE_REMOVED_GRAYSCALE_IMAGE = 256,
    /** A binary image with textures removed, useful for clear detection of subjects without background noise. */
    IRUT_TEXTURE_REMOVED_BINARY_IMAGE = 512,
    /** Detected contours within the image, which can help in identifying shapes and objects. */
    IRUT_CONTOURS = 1024,
    /** Detected line segments, useful in structural analysis of the image content. */
    IRUT_LINE_SEGMENTS = 2048,
    /** Identified text zones, indicating areas with potential textual content. */
    IRUT_TEXT_ZONES = 4096,
    /** A binary image with text regions removed. */
    IRUT_TEXT_REMOVED_BINARY_IMAGE = 8192,
    /** Zones identified as potential barcode areas, aiding in focused barcode detection. */
    IRUT_CANDIDATE_BARCODE_ZONES = 16384,
    /** Barcodes that have been localized but not yet decoded. */
    IRUT_LOCALIZED_BARCODES = 32768,
    /** Barcode images scaled up for improved readability or decoding accuracy. */
    IRUT_SCALED_UP_BARCODE_IMAGE = 65536,
    /** Images of barcodes processed to resist deformation and improve decoding success. */
    IRUT_DEFORMATION_RESISTED_BARCODE_IMAGE = 131072,
    /** Barcode images that have been complemented. */
    IRUT_COMPLEMENTED_BARCODE_IMAGE = 262144,
    /** Successfully decoded barcodes. */
    IRUT_DECODED_BARCODES = 524288,
    /** Detected long lines. */
    IRUT_LONG_LINES = 1048576,
    /** Detected corners within the image. */
    IRUT_CORNERS = 2097152,
    /** Candidate edges identified as potential components of quadrilaterals. */
    IRUT_CANDIDATE_QUAD_EDGES = 4194304,
    /** Successfully detected quadrilaterals. */
    IRUT_DETECTED_QUADS = 8388608,
    /** Text lines that have been localized in preparation for recognition. */
    IRUT_LOCALIZED_TEXT_LINES = 16777216,
    /** Successfully recognized text lines. */
    IRUT_RECOGNIZED_TEXT_LINES = 33554432,
    /** Successfully normalized images. */
    IRUT_NORMALIZED_IMAGES = 67108864,
    /** Successfully detected short lines. */
    IRUT_SHORT_LINES = 134217728,
    /** A mask to select all types of intermediate results. */
    IRUT_ALL = 268435455
}
