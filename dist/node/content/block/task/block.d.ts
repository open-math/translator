import { Block } from "bitran";
export declare class TaskBase extends Block {
    type: string;
    title: string;
    statement: Block[];
    hint: Block[];
    solution: Block[];
    answer: Block[];
    note: Block[];
}
export declare class Task extends TaskBase {
    type: string;
    tags: string[];
    similar: SimilarTask[];
}
export declare class SimilarTask extends TaskBase {
    type: string;
}
export declare class SimilarGenTask extends SimilarTask {
    type: string;
    scriptId: string;
    script: string;
}
