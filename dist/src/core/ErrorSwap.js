"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = __importDefault(require("../content/block/errorImage/block"));
const factory_1 = require("../content/block/image/factory");
const factory_2 = require("../content/block/math/factory");
class ErrorSwap {
    static trySwap(errorProduct, factory) {
        //
        // Image
        //
        if (factory instanceof factory_1.FImage || factory instanceof factory_1.VFImage) {
            let errorImage = new block_1.default;
            errorImage.error = errorProduct.error;
            return errorImage;
        }
        //
        // Math
        //
        if (factory instanceof factory_2.VFMath) {
            errorProduct.code = errorProduct.error.texString;
            return errorProduct;
        }
        return null;
    }
}
exports.default = ErrorSwap;
