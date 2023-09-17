import { InlinerViewFactory } from "../../../core/viewFactory";
import { VErrorInliner } from "./view";
import { ErrorInliner } from "bitran";
export declare class VFErrorInliner extends InlinerViewFactory<VErrorInliner, ErrorInliner> {
    setupView(product: ErrorInliner): Promise<VErrorInliner>;
    getRender(view: VErrorInliner): Promise<any>;
}
