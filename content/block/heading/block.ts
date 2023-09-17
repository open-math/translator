import { Block } from "bitran";

export default class Heading extends Block
{
    type = 'heading';

    level: number;
    title: string;
}