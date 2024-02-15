import { BlockFactory } from "bitran";
import Mermaid from "./block";
import { StringViewFactory } from "../../../core/viewFactory";
export declare class FMermaid extends BlockFactory<Mermaid> {
    canParse(strBlock: string): boolean;
    parse(strBlock: string): Promise<Mermaid>;
}
export declare class VFMermaid extends StringViewFactory<Mermaid> {
    setupView(product: Mermaid): Promise<string>;
}
