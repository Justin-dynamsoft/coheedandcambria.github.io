import { IntermediateResultExtraInfo, IntermediateResultUnit } from "dynamsoft-core";
import { LocalizedTextLineElement } from "./LocalizedTextLineElement";
export interface LocalizedTextLinesUnit extends IntermediateResultUnit {
    localizedTextLines: Array<LocalizedTextLineElement>;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onLocalizedTextLinesReceived?: (result: LocalizedTextLinesUnit, info: IntermediateResultExtraInfo) => void;
    }
}
