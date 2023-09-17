import { Block } from "bitran";

export default class Spoiler extends Block
{
    type = 'spoiler';
    content: Block[];
}