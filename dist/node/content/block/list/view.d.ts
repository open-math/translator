import BlockView from "../../../core/block/BlockView";
export declare class VList extends BlockView {
    listType: 'ol' | 'ul';
    olStart: number;
    items: string[];
}
