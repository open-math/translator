import { Text } from "bitran";

import { InlinerViewFactory } from "core/viewFactory";
import { VText } from "./view";

export class VFText extends InlinerViewFactory<VText, Text>
{
    async setupView(product: Text): Promise<VText>
    {
        let view = new VText;
            view.content = product.content;
        
        return view;
    }

    async getRender(view: VText): Promise<string>
    {
        return view.content;
    }
}