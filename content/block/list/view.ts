import BlockView from "core/block/BlockView";

export class VList extends BlockView
{
    listType:   'ol' | 'ul';
    start:      number;
    items:      string[];
}