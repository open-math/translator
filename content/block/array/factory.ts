import { BlockMeta, ObjBlockFactory } from "bitran";

import Array from "./block";
import { BlockViewFactory } from "core/viewFactory";
import { VArray } from "./view";

export class FArray extends ObjBlockFactory<Array>
{
    objType = 'array';

    async parseObj(obj: any, meta: BlockMeta): Promise<Array>
    {
        let array = new Array;
            array.items = [];

        if (obj.items)
            for (let i = 0; i < obj.items.length; i++)
                array.items.push(await this.parser.parseBlocks(obj.items[i]));

        return array;
    }
}

export class VFArray extends BlockViewFactory<VArray, Array>
{
    async setupBlockView(block: Array): Promise<VArray>
    {
        let view = new VArray;
            view.items = [];

        for (let i = 0; i < block.items.length; i++)
            view.items.push(await this.renderer.renderBlocks(block.items[i]));
        
        return view;
    }

    async getRender(view: VArray): Promise<string>
    {
        return this.renderBlockView(view);
    }
}