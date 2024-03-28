import { Point } from "dynamsoft-core";
import { CapturedResult } from "../interface/CapturedResult";
export declare function isPointInQuadrilateral(points: [Point, Point, Point, Point], point: Point): boolean;
export declare function handleResultForDraw(results: CapturedResult): any;
export declare function convertCoordinates(item: any, compressRate: number): void;
export declare function handleIntermediateResult(intermediateResult: Array<any>, HEAP8: any): any;
