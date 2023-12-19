import { Block, Inliner } from "bitran";
import Location from "../../../core/location";
export default class Image extends Block {
    type: string;
    src: Location;
    width: number;
    height: number;
    caption: Inliner[];
    invertible: boolean;
    widthId: string;
    renderWidth: string | {
        [bp: string]: string;
    };
}
