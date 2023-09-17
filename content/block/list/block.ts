import { Block } from "bitran";

export default class List extends Block
{
    type = 'list';
    listType: 'ol' | 'ul';
    olStart: number;
    items: Block[][];
}