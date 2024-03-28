import { IntermediateResultExtraInfo, IntermediateResultUnit } from "dynamsoft-core";
import { RecognizedTextLineElement } from "./RecognizedTextLineElement";
export interface RecognizedTextLinesUnit extends IntermediateResultUnit {
    recognizedTextLines: Array<RecognizedTextLineElement>;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onRecognizedTextLinesReceived?: (result: RecognizedTextLinesUnit, info: IntermediateResultExtraInfo) => void;
    }
}
