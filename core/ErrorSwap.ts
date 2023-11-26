import { ErrorProduct } from "bitran";

import { VFMath } from "content/block/math/factory";

export default class ErrorSwap
{
    static trySwap(errorProduct: ErrorProduct, factory: any)
    {
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