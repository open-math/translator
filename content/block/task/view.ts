import BlockView from "core/block/BlockView";

export class VTaskBase extends BlockView
{
    title:      string;
    statement:  string;
    sections:   { [name: string]: string } = {};
}

export class VTask extends VTaskBase
{
    tags?:      string[];
    similar:    VSimilarTask[];
}

export class VSimilarTask extends VTaskBase
{
    num: number;
}

export class VSimilarGenTask extends VTaskBase
{
    scriptId:   string;
    script:     string;
}