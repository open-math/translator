import { ErrorProduct } from "bitran";
import ErrorImage from "content/block/errorImage/block";

import { FImage, VFImage } from "content/block/image/factory";
import { VFMath } from "content/block/math/factory";

export default class ErrorSwap
{
    static trySwap(errorProduct: ErrorProduct, factory: any)
    {
        //
        // Image
        //

        if (factory instanceof FImage || factory instanceof VFImage)
        {
            let errorImage = new ErrorImage;
                errorImage.error = errorProduct.error;
            
            return errorImage;
        }

        //
        // Math
        //

        if (factory instanceof VFMath)
        {
            errorProduct.code = (errorProduct.error as any).texString;
            return errorProduct;
        }

        return null;
    }
}