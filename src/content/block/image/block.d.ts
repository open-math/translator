import { Block, Inliner } from "bitran";
import Location from "../../../core/location";
export default class Image extends Block {
    type: string;
    src: Location;
    width: number;
    height: number;
    maxWidth: number;
    caption: Inliner[];
    invertible: boolean;
}
