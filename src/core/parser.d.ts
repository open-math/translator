import { Parser as BitranParser, Block } from "bitran";
import { Unique } from "./block/unique";
import Location from "./location";
import Helper from "./Helper";
export default class Parser {
    location: Location;
    helper: Helper;
    constructor(location: Location, helper: Helper);
    parse(text: string): Promise<ParseResult>;
}
export declare class ParseResult {
    blocks: Block[];
    uniques: Unique[];
    refs: string[];
    errors: ParseError[];
}
export declare function getLocation(bitranParser: BitranParser): Location;
export declare function getHelper(bitranParser: BitranParser): Helper;
export declare class ParseError extends Error {
    name: string;
}
