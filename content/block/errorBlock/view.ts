import BlockView from "core/block/BlockView";

export class VErrorBlock extends BlockView
{
    error: Error;
    code: string;
}