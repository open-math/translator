import { InlinerFactory } from "bitran";
import IMath from "./inliner";
import { InlinerViewFactory } from "../../../core/viewFactory";
import { VMath } from "../../block/math/view";
export declare class FIMath extends InlinerFactory<IMath> {
    regexp: RegExp;
    parse(match: RegExpExecArray): Promise<IMath>;
}
export declare class VFIMath extends InlinerViewFactory<VMath, IMath> {
    setupView(product: IMath): Promise<VMath>;
    getRender(view: VMath): Promise<string>;
}
