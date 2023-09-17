import { StringViewFactory } from "core/viewFactory";
import ErrorImage from "./block";

export class VFErrorImage extends StringViewFactory<ErrorImage>
{
    async setupView(product: ErrorImage)
    {
        return this.renderTemplate('errorImage', product);
    }
}