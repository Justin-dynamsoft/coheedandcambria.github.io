import { ImageTag } from "dynamsoft-core";
import { TextLineResultItem } from "./TextLineResultItem";
export interface RecognizedTextLinesResult {
    readonly originalImageHashId: string;
    readonly originalImageTag: ImageTag;
    textLineResultItems: Array<TextLineResultItem>;
    readonly errorCode: number;
    readonly errorString: string;
}
declare module "dynamsoft-capture-vision-router" {
    interface CapturedResultReceiver {
        onRecognizedTextLinesReceived?: (result: RecognizedTextLinesResult) => void;
    }
    interface CapturedResultFilter {
        onRecognizedTextLinesReceived?: (result: RecognizedTextLinesResult) => void;
    }
}
