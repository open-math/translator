import { Parser as BitranParser, Block } from "bitran";
import ParseWorker from "./parseWorker/ParseWorker";
import { Unique } from "./block/unique";
import Location from "./location";
import Helper from "./Helper";
import { FHeading } from "../content/block/heading/factory";
import { FHr } from "../content/block/hr/factory";
import { FMath } from "../content/block/math/factory";
import { FImportant } from "../content/block/accentBlock/factory";
import { FGallery } from "../content/block/gallery/factory";
import { FInclude } from "../content/block/include/factory";
import { FSpoiler } from "../content/block/spoiler/factory";
import { FList } from "../content/block/list/factory";
import { FHtml } from "../content/block/html/factory";
import { FArray } from "../content/block/array/factory";
import { FTask } from "../content/block/task/factory";
import { FImage } from "../content/block/figure/factory";
import { FIMath } from "../content/inliner/imath/factory";
import { FLink } from "../content/inliner/link/factory";
export default class Parser {
    location: Location;
    helper: Helper;
    blockFactories: (typeof FMath | typeof FHeading | typeof FHr | typeof FInclude | typeof FList | typeof FHtml | typeof FArray | typeof FTask | typeof FSpoiler | typeof FGallery | typeof FImage | typeof FImportant)[];
    inlinerFactories: (typeof FIMath | typeof FLink)[];
    constructor(location: Location, helper: Helper);
    filterParseWorkers(parseWorkers: ParseWorker[]): ParseWorker[];
    parse(text: string): Promise<ParseResult>;
}
export declare class ParseResult {
    locaiton: Location;
    blocks: Block[];
    uniques: Unique[];
    todos: {
        id: string;
        title: string;
    }[];
    refs: string[];
    files: string[];
    errors: ParseError[];
}
export declare function getLocation(bitranParser: BitranParser): Location;
export declare function getHelper(bitranParser: BitranParser): Helper;
export declare class ParseError extends Error {
    name: string;
}
