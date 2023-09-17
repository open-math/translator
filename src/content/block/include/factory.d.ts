import { BlockFactory } from "bitran";
import Include from "./block";
import { StringViewFactory } from "../../../core/viewFactory";
export declare class FInclude extends BlockFactory<Include> {
    canParse(strBlock: string): boolean;
    parse(strBlock: string): Promise<Include>;
}
export declare class VFInclude extends StringViewFactory<Include> {
    setupView(product: Include): Promise<string>;
}
