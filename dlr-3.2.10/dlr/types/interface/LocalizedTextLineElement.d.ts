import { Quadrilateral, RegionObjectElement } from "dynamsoft-core";
export interface LocalizedTextLineElement extends RegionObjectElement {
    characterQuads: Array<Quadrilateral>;
    rowNumber: number;
}
