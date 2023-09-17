import { InlinerViewFactory } from "core/viewFactory";
import { VErrorInliner } from "./view";
import { ErrorInliner } from "bitran";

export class VFErrorInliner extends InlinerViewFactory<VErrorInliner, ErrorInliner>
{
    async setupView(product: ErrorInliner)
    {
        let errorInliner = new VErrorInliner;
            errorInliner.error = product.error;

        return errorInliner;
    }

    async getRender(view: VErrorInliner)
    {
        return this.renderTemplate('errorInliner', view);
    }
}