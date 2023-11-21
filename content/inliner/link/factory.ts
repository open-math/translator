import { InlinerFactory } from "bitran";

import Link from "./inliner";
import { InlinerViewFactory } from "core/viewFactory";
import { VLink } from "./view";
import Location, { LocationType } from "core/location";
import Helper from "core/Helper";

export class FLink extends InlinerFactory<Link>
{
    regexp = /\[(.+?)\]\((.+?)\)/gm;

    async parse(match: RegExpExecArray)
    {
        let link = new Link;
            link.label = await this.parser.parseInliners(match[1]);
            link.target = match[2];

        return link;
    }
}

export class VFLink extends InlinerViewFactory<VLink, Link>
{
    async setupView(product: Link)
    {
        let link = new VLink;
            link.label = await this.renderer.renderInliners(product.label);

        let targetLocation = Location.fromString(product.target);

        if (targetLocation.type === LocationType.Direct)
        {
            link.target = targetLocation.path;
            return link;
        }

        if (targetLocation.target === '')
        {
            link.target = `/${targetLocation.type}/${targetLocation.path}`;
            return link;
        }

        let helper = Helper.getFrom(this.renderer);
        let unique = await helper.getUnique(targetLocation.toString());

        link.target = this.locationToHref(targetLocation);
        link.preview = unique ? product.target : null;

        return link;
    }

    async getRender(view: VLink)
    {
        return this.renderTemplate('link', view);
    }

    //

    locationToHref(location: Location)
    {
        // Only works for topics!
        // TODO: Add contributors and other pages!

        return `/${location.type}/${location.path}/${location.target ? '#' + location.target : '' }`;
    }
}