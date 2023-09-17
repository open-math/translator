import { Block, Inliner } from "bitran";

export default class Html extends Block
{
    type = 'html';
    inliners: { [id: string]: Inliner[] };
    content: string;
}