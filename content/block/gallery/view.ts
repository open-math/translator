import BlockView from "core/block/BlockView";
import { VFigure } from "../figure/view";

export default class VGallery extends BlockView
{
    images: VFigure[];
    renderedImages: string[];
    start: number;
}