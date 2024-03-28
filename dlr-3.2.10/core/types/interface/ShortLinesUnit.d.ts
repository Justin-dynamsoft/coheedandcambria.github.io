import { IntermediateResultUnit } from "./IntermediateResultUnit";
import { LineSegment } from "./LineSegment";
export interface ShortLinesUnit extends IntermediateResultUnit {
    shortLines: Array<LineSegment>;
}
