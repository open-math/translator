import { Block } from "bitran";

export default class Array extends Block
{
    type = 'array';
    items: Block[][];
}