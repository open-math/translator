import { Block } from "bitran";
export type TExpandContent = Block[] | {
    [title: string]: Block[];
};
export default class AccentBlock extends Block {
    type: string;
    showInToc: boolean;
    showTitle: boolean;
    title: string;
    main: Block[];
    expand?: TExpandContent;
}
