import { IHasAttributes } from "./IHasAttributes";
export default class BlockView implements IHasAttributes {
    type: string;
    id?: string;
    classes?: string[];
}
