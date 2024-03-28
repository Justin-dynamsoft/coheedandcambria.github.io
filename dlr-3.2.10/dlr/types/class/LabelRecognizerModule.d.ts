export default class LabelRecognizerModule {
    /**
     * An event that repeatedly fires during the loading of a recognition data file (.data).
     * @param filePath Returns the path of the recognition data file.
     * @param tag Indicates the ongoing status of the file download. Available values are "starting", "in progress", "completed".
     * @param progress Shows the numerical progress of the download.
     */
    static onDataLoadProgressChanged: (filePath: string, tag: "starting" | "in progress" | "completed", progress: {
        loaded: number;
        total: number;
    }) => void;
    static getVersion(): string;
    static loadRecognitionData(dataName: string, dataPath?: string): Promise<void>;
}
