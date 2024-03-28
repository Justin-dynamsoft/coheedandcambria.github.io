import { DSImageData } from "dynamsoft-core";
import IntermediateResultReceiver from "./IntermediateResultReceiver";
export default class IntermediateResultManager {
    /**
     * Adds a `IntermediateResultReceiver` object as the receiver of intermediate results.
     * @param receiver The receiver object, of type `IntermediateResultReceiver`.
     */
    addResultReceiver: (receiver: IntermediateResultReceiver) => void;
    /**
     * Removes the specified `IntermediateResultReceiver` object.
     * @param receiver The receiver object, of type `IntermediateResultReceiver`.
     */
    removeResultReceiver: (receiver: IntermediateResultReceiver) => void;
    /**
     * Retrieves the original image data.
     *
     * @returns A promise that resolves when the operation has successfully completed. It provides the original image upon resolution.
     */
    getOriginalImage: () => DSImageData;
}
