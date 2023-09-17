import { Block, ErrorBlock, ErrorInliner, Inliner } from "bitran";
import ParseWorker from "./ParseWorker";
import { ParseResult } from "../parser";
export default class RefPW extends ParseWorker {
    aliasMap: object;
    refMap: {
        [ref: string]: null;
    };
    constructor(aliasMap: object);
    blockStep(block: Block): ErrorBlock;
    inlinerStep(inliner: Inliner): ErrorInliner;
    finally(parseResult: ParseResult): void;
    getFinalRef(rawRef: string): string;
    replaceAlias(rawRef: string): any;
}
