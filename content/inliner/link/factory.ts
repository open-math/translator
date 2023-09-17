import { InlinerFactory } from "bitran";

import Link from "./inliner";
import { InlinerViewFactory } from "core/viewFactory";
import { VLink } from "./view";
import Location, { LocationType } from "core/location";

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

        link.target = this.locationToHref(targetLocation);
        link.preview = product.target;

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

        return `/${location.path}/@${location.type}/${location.target ? '#' + location.target : '' }`;
    }
}