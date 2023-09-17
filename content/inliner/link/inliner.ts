import { Inliner } from "bitran";

export default class Link extends Inliner
{
    type = 'link';
    label: Inliner[];
    target: string;
}