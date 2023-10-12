import { Block } from "bitran";
import ParseWorker from "./ParseWorker";
import { ParseResult } from "..";
export default class TodoPW extends ParseWorker {
    todoBlocks: {
        id: string;
        title: string;
    }[];
    blockStep(block: Block): void;
    finally(parseResult: ParseResult): void;
}
