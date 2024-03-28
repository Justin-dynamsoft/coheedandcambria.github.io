import { EnumGrayscaleEnhancementMode, EnumGrayscaleTransformationMode } from "dynamsoft-core";
export interface SimplifiedLabelRecognizerSettings {
    characterModelName: string;
    lineStringRegExPattern: string;
    grayscaleTransformationModes: Array<EnumGrayscaleTransformationMode>;
    grayscaleEnhancementModes: Array<EnumGrayscaleEnhancementMode>;
}
