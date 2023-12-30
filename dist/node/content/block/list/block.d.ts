import { Block } from "bitran";
export default class List extends Block {
    type: string;
    listType: 'ol' | 'ul';
    start: number;
    items: Block[][];
}
