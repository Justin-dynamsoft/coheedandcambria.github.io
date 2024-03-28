import { RegionObjectElement } from "dynamsoft-core";
import { CharacterResult } from "./CharacterResult";
export interface RecognizedTextLineElement extends RegionObjectElement {
    text: string;
    confidence: number;
    characterResults: Array<CharacterResult>;
    rowNumber: number;
}
