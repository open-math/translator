"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("../content/block/math/factory");
class ErrorSwap {
    static trySwap(errorProduct, factory) {
        //
        // Math
        //
        if (factory instanceof factory_1.VFMath) {
            errorProduct.code = errorProduct.error.texString;
            return errorProduct;
        }
        return null;
    }
}
exports.default = ErrorSwap;
