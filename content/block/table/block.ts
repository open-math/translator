import { Block } from "bitran";

export default class Table extends Block
{
    type = 'table';
    content: Block[];
}