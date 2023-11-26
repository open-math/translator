import { Block } from "bitran";
import { Figure } from "../figure/block";

export default class Gallery extends Block
{
    type = 'gallery';
    images: Figure[];
    start: number;
}