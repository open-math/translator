import { Block, BlockFactory, BlockMeta, Inliner, InlinerFactory } from "bitran";
import Parser, { ParseResult } from "../parser";
export default abstract class ParseWorker {
    parser: Parser;
    blockStep(block: Block, meta: BlockMeta, factory: BlockFactory<Block>): void | Block;
    inlinerStep(inliner: Inliner, factory: InlinerFactory<Inliner>): void | Inliner;
    finally(parseResult: ParseResult): void;
}
