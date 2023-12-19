import { Block } from "bitran";
import { Figure } from "../figure/block";
export default class Gallery extends Block {
    type: string;
    images: Figure[];
    start: number;
}
