import { Block, Inliner } from "bitran";
export default class Html extends Block {
    type: string;
    inliners: {
        [id: string]: Inliner[];
    };
    content: string;
}
