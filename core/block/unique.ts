import { Block } from "bitran";

export enum IdPrefix
{
    p = 'paragraph',
    h = 'header',
}

export class Unique
{
    id: string;
    content?: Block[];
}