import { BlockMeta, ObjBlockFactory } from "bitran";

import Gallery from "./block";
import { BlockViewFactory } from "core/viewFactory";
import VGallery from "./view";
import { FImage, VFFigure } from "../figure/factory";

export class FGallery extends ObjBlockFactory<Gallery>
{
    objType = 'gallery';

    async parseObj(obj: any): Promise<Gallery>
    {
        let gallery = new Gallery;

        if (!obj.images)
            throw new Error(`Gallery must have an 'images' property!`);

        if (!Array.isArray(obj.images))
            throw new Error(`Gallery 'images' property must be an array!`);

        gallery.images = [];
        for (let i = 0; i < obj.images.length; i++)
        {
            let factory = new FImage(this.parser);
            gallery.images.push(await factory.parseObj(obj.images[i]));
        }

        gallery.start = obj.start ?? 0;

        return gallery;
    }
}

export class VFGallery extends BlockViewFactory<VGallery, Gallery>
{
    async setupBlockView(block: Gallery)
    {
        let view = new VGallery;
            view.images = [];
            view.renderedImages = [];

        let factory = new VFFigure(this.renderer);

        for (let i = 0; i < block.images.length; i++)
        {
            let vImage = await factory.setupView(block.images[i]);

            view.images.push(vImage);
            view.renderedImages.push(await factory.getRender(vImage));
        }

        view.start = block.start;

        return view;
    }

    async getRender(view: VGallery)
    {
        return this.renderBlockView(view);
    }
}