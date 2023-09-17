import BlockView from "core/block/BlockView";
import { VImage } from "../image/view";

export default class VGallery extends BlockView
{
    images: VImage[];
    renderedImages: string[];
    start: number;
}