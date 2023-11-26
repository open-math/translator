import { ObjBlockFactory } from "bitran";
import Secondary from "./block";
import Helper from "core/Helper";
import { locationFromSrc } from "../figure/util";
import { getLocation } from "core/parser";
import { BlockViewFactory } from "core/viewFactory";
import { VSecondary } from "./view";

export class FSecondary extends ObjBlockFactory<Secondary>
{
    objType = 'secondary';

    async parseObj(obj: any): Promise<Secondary>
    {
        let helper = Helper.getFrom(this.parser);

        if (!obj.type)
            throw new Error(`Missing 'type' property!`);

        if (!obj.icon)
            throw new Error(`Missing 'icon' property!`);

        let iconLocation = locationFromSrc(obj.icon, getLocation(this.parser));

        if (!(await helper.hasAsset(iconLocation)))
            throw new Error(`Missing icon image!`);

        let secondary = new Secondary;
            secondary.contentType = obj.type;
            secondary.icon =        iconLocation;
            secondary.title =       obj.title;
            secondary.content =     await this.parser.parseBlocks(obj.content);

        return secondary;
    }
}

export class VFSecondary extends BlockViewFactory<VSecondary, Secondary>
{
    async setupBlockView(block: Secondary): Promise<VSecondary>
    {
        let helper = Helper.getFrom(this.renderer);

        let view = new VSecondary;
            view.icon =         await helper.getAssetSrc(block.icon);
            view.title =        block.title;
            view.contentType =  block.contentType;
            view.content =      await this.renderer.renderBlocks(block.content);

        return view;
    }

    async getRender(view: VSecondary): Promise<string>
    {
        return this.renderBlockView(view);
    }
}