import { Block } from "bitran";

export type TExpandContent = Block[] | { [title: string]: Block[] }

export default class AccentBlock extends Block
{
    type: string;

    showInToc = true;
    showTitle = true;

    title: string;
    main: Block[];
    expand?: TExpandContent;
}