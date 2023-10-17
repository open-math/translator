import { Block } from "bitran";

export class TaskBase extends Block
{
    type:       string;

    title:      string;

    statement:  Block[];
    hint:       Block[];
    solution:   Block[];
    answer:     Block[];
}

export class Task extends TaskBase
{
    type = 'task';

    tags:       string[];
    similar:    SimilarTask[];
}

export class SimilarTask extends TaskBase
{
    type = 'similarTask';
}

export class SimilarGenTask extends SimilarTask
{
    type = 'similarGenTask';

    scriptId: string;
    script: string;
}