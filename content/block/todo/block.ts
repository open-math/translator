import { Block } from "bitran";

export default class Todo extends Block
{
    type = 'todo';
    title: string;
    content: Block[];
}