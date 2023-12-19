import { BlockFactory } from "bitran";
import Hr from "./block";
import { StringViewFactory } from "../../../core/viewFactory";
export declare class FHr extends BlockFactory<Hr> {
    canParse(strBlock: string): boolean;
    parse(): Promise<Hr>;
}
export declare class VFHr extends StringViewFactory<Hr> {
    setupView(): Promise<string>;
}
