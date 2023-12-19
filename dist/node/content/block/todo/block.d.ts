import { Block } from "bitran";
export default class Todo extends Block {
    type: string;
    title: string;
    content: Block[];
}
