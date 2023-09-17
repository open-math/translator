import BlockView from "core/block/BlockView";

export class VList extends BlockView
{
    listType:   'ol' | 'ul';
    olStart:    number;
    items:      string[];
}