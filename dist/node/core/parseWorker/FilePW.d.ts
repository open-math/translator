import { Block } from "bitran";
import ParseWorker from "./ParseWorker";
import { ParseResult } from "..";
export default class FilePW extends ParseWorker {
    filesToAdd: {};
    blockStep(block: Block): void;
    finally(parseResult: ParseResult): void;
}
