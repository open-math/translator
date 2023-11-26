import { Block } from "bitran";
import ParseWorker from "./ParseWorker";
import { Gallery } from "content/index";
import { ParseResult } from "..";
import { Figure } from "content/block/figure/block";
import { FigureType } from "content/block/figure/global";
import { ImageFigureContent } from "content/block/figure/content/image";
import Secondary from "content/block/secondary/block";

export default class FilePW extends ParseWorker
{
    filesToAdd = {};

    blockStep(block: Block)
    {
        if (block instanceof Figure)
            if (block.content.type === FigureType.Image || block.content.type === FigureType.Video)
                this.filesToAdd[(block.content as ImageFigureContent).src.toString()] = null;
        
        if (block instanceof Secondary)
            this.filesToAdd[block.icon.toString()] = null;

        if (block instanceof Gallery)
            block.images.forEach(image => this.filesToAdd[(image.content as ImageFigureContent).src.toString()] = null);
    }

    finally(parseResult: ParseResult): void
    {
        parseResult.files = parseResult.files.concat(Object.keys(this.filesToAdd));
    }
}