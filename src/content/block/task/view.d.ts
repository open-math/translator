import BlockView from "../../../core/block/BlockView";
export declare class VTask extends BlockView {
    title: string;
    tags?: string[];
    statement: string;
    hint: string;
    solution: string;
    answer: string;
    sections: {
        [name: string]: string;
    };
}
