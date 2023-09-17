import { InlinerFactory } from "bitran";
import Link from "./inliner";
import { InlinerViewFactory } from "../../../core/viewFactory";
import { VLink } from "./view";
import Location from "../../../core/location";
export declare class FLink extends InlinerFactory<Link> {
    regexp: RegExp;
    parse(match: RegExpExecArray): Promise<Link>;
}
export declare class VFLink extends InlinerViewFactory<VLink, Link> {
    setupView(product: Link): Promise<VLink>;
    getRender(view: VLink): Promise<any>;
    locationToHref(location: Location): string;
}
