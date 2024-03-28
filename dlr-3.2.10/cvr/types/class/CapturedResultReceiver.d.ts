import { OriginalImageResultItem } from "dynamsoft-core";
import { CapturedResult } from "../interface/CapturedResult";
export default class CapturedResultReceiver {
    /**
     * Event triggered when a generic captured result is available, occurring each time an image finishes its processing.
     * This event can be used for any result that does not fit into the specific categories of the other callback events.
     * @param result The captured result, an instance of `CapturedResult`.
     */
    onCapturedResultReceived?: (result: CapturedResult) => void;
    /**
     * Event triggered when the original image result is available.
     * This event is used to handle the original image captured by an image source such as Dynamsoft Camera Enhancer.
     * @param result The original image result, an instance of `OriginalImageResultItem`.
     */
    onOriginalImageResultReceived?: (result: OriginalImageResultItem) => void;
    [key: string]: any;
}
