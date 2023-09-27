import BlockView from "core/block/BlockView";

export class VImage extends BlockView
{
    src: string;
    width: number;
    height: number;
    caption: string;
    invertible: boolean;

    widthId: string;
    widthCss: string;
}