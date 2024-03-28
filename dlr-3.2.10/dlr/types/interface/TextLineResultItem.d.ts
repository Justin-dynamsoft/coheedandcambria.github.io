import { CapturedResultItem, Quadrilateral } from "dynamsoft-core";
import { CharacterResult } from "./CharacterResult";
export interface TextLineResultItem extends CapturedResultItem {
    text: string;
    location: Quadrilateral;
    confidence: number;
    characterResults: Array<CharacterResult>;
}
