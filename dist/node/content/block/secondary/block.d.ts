import { Block } from "bitran";
import Location from "../../../core/location";
export default class Secondary extends Block {
    type: string;
    icon: Location;
    contentType: SecondaryType;
    title: string;
    content: Block[];
}
export declare enum SecondaryType {
    Quote = "quote",
    Fact = "fact",
    Joke = "joke"
}
