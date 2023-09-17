import { BlockFactory } from "bitran";

import Hr from "./block";
import { StringViewFactory } from "core/viewFactory";

export class FHr extends BlockFactory<Hr>
{
    canParse(strBlock: string)
    {
        return strBlock === '---';
    }

    async parse()
    {
        return new Hr;
    }
}

export class VFHr extends StringViewFactory<Hr>
{
    async setupView()
    {
        return '<hr>';
    }
}