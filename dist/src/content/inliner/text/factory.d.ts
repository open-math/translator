import { Text } from "bitran";
import { InlinerViewFactory } from "../../../core/viewFactory";
import { VText } from "./view";
export declare class VFText extends InlinerViewFactory<VText, Text> {
    setupView(product: Text): Promise<VText>;
    getRender(view: VText): Promise<string>;
}
