import { Block } from "bitran";
import ParseWorker from "./ParseWorker";
import { Gallery, Image } from "content/index";
import { ParseResult } from "..";

export default class FilePW extends ParseWorker
{
    filesToAdd = {};

    blockStep(block: Block)
    {
        if (block instanceof Image)
            this.filesToAdd[block.src.toString()] = null;
        
        if (block instanceof Gallery)
            block.images.forEach(image => this.filesToAdd[image.src.toString()] = null);
    }

    finally(parseResult: ParseResult): void
    {
        parseResult.files = parseResult.files.concat(Object.keys(this.filesToAdd));
    }
}