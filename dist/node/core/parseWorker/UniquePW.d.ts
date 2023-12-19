import { Block, BlockMeta } from "bitran";
import ParseWorker from "./ParseWorker";
import { Unique } from "../block/unique";
import { ParseResult } from "../parser";
export default class UniquePW extends ParseWorker {
    uniqueMap: {
        [id: string]: Unique;
    };
    duplicateIds: {
        [id: string]: null;
    };
    autoIdMap: {
        [autoId: string]: null;
    };
    blockStep(block: Block, meta: BlockMeta): void;
    setAutoId(block: Block, toSlug: string): void;
    finally(parseResult: ParseResult): void;
}
