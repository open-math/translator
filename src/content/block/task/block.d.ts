import { Block } from "bitran";
export default class Task extends Block {
    type: string;
    title: string;
    tags: string[];
    statement: Block[];
    hint: Block[];
    solution: Block[];
    answer: Block[];
}
