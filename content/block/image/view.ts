import BlockView from "core/block/BlockView";

export class VImage extends BlockView
{
    src: string;
    width: number;
    height: number;
    maxWidth: number;
    caption: string;
    invertible: boolean;
}