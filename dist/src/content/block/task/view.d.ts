import BlockView from "../../../core/block/BlockView";
export declare class VTaskBase extends BlockView {
    title: string;
    statement: string;
    sections: {
        [name: string]: string;
    };
}
export declare class VTask extends VTaskBase {
    tags?: string[];
    similar: VSimilarTask[];
}
export declare class VSimilarTask extends VTaskBase {
    num: number;
}
export declare class VSimilarGenTask extends VTaskBase {
    scriptId: string;
    script: string;
}
