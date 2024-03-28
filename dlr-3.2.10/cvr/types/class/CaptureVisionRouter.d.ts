import CapturedResultReceiver from "./CapturedResultReceiver";
import IntermediateResultManager from "./IntermediateResultManager";
import { CapturedResult } from "../interface/CapturedResult";
import { ImageSourceStateListener } from "../interface/ImageSourceStateListener";
import { SimplifiedCaptureVisionSettings } from "../interface/SimplifiedCaptureVisionSettings";
import { CapturedResultFilter } from "../interface/CapturedResultFilter";
import { Point, DSImageData, ImageSourceAdapter, EnumCapturedResultItemType, IntermediateResultUnit, IntermediateResultExtraInfo } from "dynamsoft-core";
export default class CaptureVisionRouter {
    static _onLog: (message: any) => void;
    maxCvsSideLength: number;
    private _isa;
    private _dsImage;
    private _instanceID;
    private _loopReadVideoTimeoutId;
    private _bPauseScan;
    private _bNeedOutputOriginalImage;
    private _canvas;
    private _irrRegistryState;
    private _resultReceiverSet;
    private _isaStateListenerSet;
    private _resultFilterSet;
    private _intermediateResultReceiverSet;
    private _intermediateResultManager;
    private _templateName;
    private _bOpenDetectVerify;
    private _bOpenNormalizeVerify;
    private _bOpenBarcodeVerify;
    private _bOpenLabelVerify;
    private _minImageCaptureInterval;
    private _averageProcessintTimeArray;
    private _averageFetchImageTimeArray;
    private _currentSettings;
    private _averageTime;
    private _compressRate;
    private _dynamsoft;
    protected captureInParallel: boolean;
    /**
     * Returns whether the `CaptureVisionRouter` instance has been disposed of.
     *
     * @returns Boolean indicating whether the `CaptureVisionRouter` instance has been disposed of.
     */
    protected bDestroyed: boolean;
    get disposed(): boolean;
    /**
     * Initializes a new instance of the `CaptureVisionRouter` class.
     *
     * @returns A promise that resolves with the initialized `CaptureVisionRouter` instance.
     */
    static createInstance(): Promise<CaptureVisionRouter>;
    private _singleFrameModeCallback;
    private _singleFrameModeCallbackBind;
    /**
     * Sets up an image source to provide images for continuous processing.
     * @param imageSource The image source which is compliant with the `ImageSourceAdapter` interface.
     */
    setInput(imageSource: ImageSourceAdapter): void;
    /**
     * Returns the image source object.
     */
    getInput(): ImageSourceAdapter;
    /**
     * Adds or removes listeners for image source state change.
     */
    addImageSourceStateListener(listener: ImageSourceStateListener): void;
    removeImageSourceStateListener(listener: ImageSourceStateListener): boolean;
    /**
     * Adds a `CapturedResultReceiver` object as the receiver of captured results.
     * @param receiver The receiver object, of type `CapturedResultReceiver`.
     */
    addResultReceiver(receiver: CapturedResultReceiver): void;
    /**
     * Removes the specified `CapturedResultReceiver` object.
     * @param receiver The receiver object, of type `CapturedResultReceiver`.
     */
    removeResultReceiver(receiver: CapturedResultReceiver): void;
    private _setCrrRegistry;
    /**
     * Adds a `MultiFrameResultCrossFilter` object to filter non-essential results.
     * @param filter The filter object, of type `MultiFrameResultCrossFilter`.
     *
     * @returns A promise that resolves when the operation has successfully completed. It does not provide any value upon resolution.
     */
    addResultFilter(filter: CapturedResultFilter): Promise<void>;
    /**
     * Removes the specified `MultiFrameResultCrossFilter` object.
     * @param filter The filter object, of type `MultiFrameResultCrossFilter`.
     *
     * @returns A promise that resolves when the operation has successfully completed. It does not provide any value upon resolution.
     */
    removeResultFilter(filter: CapturedResultFilter): Promise<void>;
    private _handleFilterSwitch;
    /**
     * Initiates a capturing process based on a specified template. This process is repeated for each image fetched from the source.
     * @param templateName [Optional] Specifies a "CaptureVisionTemplate" to use.
     *
     * @returns A promise that resolves when the capturing process has successfully started. It does not provide any value upon resolution.
     */
    private _promiseStartScan;
    startCapturing(templateName?: string): Promise<void>;
    /**
     * Stops the capturing process.
     */
    stopCapturing(): void;
    private _clearVerifyList;
    _getIntermediateResult(): Promise<{
        intermediateResultUnits: Array<IntermediateResultUnit>;
        info: IntermediateResultExtraInfo;
    }>;
    containsTask(templateName: string): Promise<any>;
    /**
     * Video stream capture, recursive call, loop frame capture
     */
    private _loopReadVideo;
    private _reRunCurrnetFunc;
    /**
     * Processes a single image or a file containing a single image to derive important information.
     * @param imageOrFile Specifies the image or file to be processed. The following data types are accepted: `Blob`, `HTMLImageElement`, `HTMLCanvasElement`, `HTMLVideoElement`, `DSImageData`, `string`.
     * @param templateName [Optional] Specifies a "CaptureVisionTemplate" to use.
     *
     * @returns A promise that resolves with a `CapturedResult` object which contains the derived information from the image processed.
     */
    capture(imageOrFile: Blob | string | DSImageData | HTMLImageElement | HTMLVideoElement | HTMLCanvasElement, templateName?: string): Promise<CapturedResult>;
    private _captureDsimage;
    private _captureUrl;
    private _captureBase64;
    private _captureBlob;
    private _captureImage;
    private _captureCanvas;
    private _captureVideo;
    private _captureInWorker;
    /**
     * Configures runtime settings using a provided JSON string, an object, or a URL pointing to an object, which contains settings for one or more `CaptureVisionTemplates`.
     * @param settings A JSON string, an object, or a URL pointing to an object that contains settings for one or more `CaptureVisionTemplates`.
     *
     * @returns A promise that resolves when the operation has completed. It provides an object that describes the result.
     */
    initSettings(settings: string | object): Promise<any>;
    /**
     * Returns an object that contains settings for the specified `CaptureVisionTemplate`.
     * @param templateName Specifies a `CaptureVisionTemplate` by its name. If passed "*", the returned object will contain all templates.
     *
     * @returns A promise that resolves with the object that contains settings for the specified template or all templates.
     */
    outputSettings(templateName: string): Promise<any>;
    /**
     * Generates a Blob object or initiates a JSON file download containing the settings for the specified `CaptureVisionTemplate`.
     * @param templateName Specifies a `CaptureVisionTemplate` by its name. If passed "*", the returned object will contain all templates.
     * @param fileName Specifies the name of the file.
     * @param download Boolean that specifies whether to initiates a file download.
     *
     * @returns A promise that resolves with the Blob object that contains settings for the specified template or all templates.
     */
    outputSettingsToFile(templateName: string, fileName: string, download?: boolean): Promise<Blob>;
    /**
     * Retrieves a JSON object that contains simplified settings for the specified `CaptureVisionTemplate`.
     * @param templateName Specifies a `CaptureVisionTemplate` by its name.
     *
     * @returns A promise that resolves with a JSON object, of type `SimplifiedCaptureVisionSettings`, which represents the simplified settings for the specified template.
     * @remarks If the settings of the specified template are too complex, we cannot create a SimplifiedCaptureVisionSettings, and as a result, it will return an error.
     */
    getSimplifiedSettings(templateName?: string): Promise<SimplifiedCaptureVisionSettings>;
    /**
     * Updates the specified `CaptureVisionTemplate` with an updated `SimplifiedCaptureVisionSettings` object.
     * @param templateName Specifies a `CaptureVisionTemplate` by its name.
     * @param settings The `SimplifiedCaptureVisionSettings` object that contains updated settings.
     *
     * @returns A promise that resolves when the operation has completed. It provides an object that describes the result.
     */
    updateSettings(templateName: string, settings: SimplifiedCaptureVisionSettings): Promise<any>;
    /**
     * Restores all runtime settings to their original default values.
     *
     * @returns A promise that resolves when the operation has completed. It provides an object that describes the result.
     */
    resetSettings(): Promise<any>;
    /**
     * Returns an object, of type `IntermediateResultManager`, that manages intermediate results.
     *
     * @returns The `IntermediateResultManager` object.
     */
    getIntermediateResultManager(bInner?: boolean): IntermediateResultManager;
    private _handleIntermediateResultReceiver;
    contains(points: [Point, Point, Point, Point], point: Point): boolean;
    parseRequiredResources(templateName: string): Promise<{
        models: string[];
        specss: string[];
    }>;
    /**
     * Releases all resources used by the `CaptureVisionRouter` instance.
     *
     * @returns A promise that resolves when the resources have been successfully released. It does not provide any value upon resolution.
     */
    dispose(): Promise<void>;
    private _enableResultCrossVerification;
    private _enableResultDeduplication;
    private _setDuplicateForgetTime;
    _getDuplicateForgetTime(type: EnumCapturedResultItemType): Promise<number>;
    _setThresholdValue(threshold: number, leftLimit: number, rightLimit: number): Promise<void>;
    private _checkIsDisposed;
}
