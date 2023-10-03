import { Block } from "bitran";
import ParseWorker from "./ParseWorker";
import { Todo } from "../../content/index";
import { ParseResult } from "..";
export default class TodoPW extends ParseWorker {
    todoBlocks: Todo[];
    blockStep(block: Block): void;
    finally(parseResult: ParseResult): void;
}
