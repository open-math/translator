import { Block } from "bitran";
import Image from "../image/block";
export default class Gallery extends Block {
    type: string;
    images: Image[];
    start: number;
}
