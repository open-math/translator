import { Paragraph } from "bitran";
import { BlockViewFactory } from "../../../core/viewFactory";
import { VParagraph } from "./view";
export declare class VFParagraph extends BlockViewFactory<VParagraph, Paragraph> {
    setupBlockView(block: Paragraph): Promise<VParagraph>;
    getRender(view: VParagraph): Promise<string>;
}
