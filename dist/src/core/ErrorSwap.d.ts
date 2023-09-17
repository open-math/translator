import { ErrorProduct } from "bitran";
import ErrorImage from "../content/block/errorImage/block";
export default class ErrorSwap {
    static trySwap(errorProduct: ErrorProduct, factory: any): ErrorProduct | ErrorImage;
}
