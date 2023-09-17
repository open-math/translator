import { Block } from "bitran";

import Image from "../image/block";

export default class Gallery extends Block
{
    type = 'gallery';
    images: Image[];
    start: number;
}