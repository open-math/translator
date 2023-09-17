import { BlockMeta, ObjBlockFactory } from "bitran";
import Table from "./block";
import { BlockViewFactory, StringViewFactory } from "core/viewFactory";
import { VTable } from "./view";

export class FTable extends ObjBlockFactory<Table>
{
    objType = 'table';

    async parseObj(obj: any, meta: BlockMeta): Promise<Table>
    {
        let table = new Table;
            table.content = await this.parser.parseBlocks(obj.content);

        return table;
    }
}

export class VFTable extends BlockViewFactory<VTable, Table>
{
    async setupBlockView(block: Table): Promise<VTable>
    {
        let view = new VTable;
            view.content = await this.renderer.renderBlocks(block.content);
    
        return view;
    }

    async getRender(view: VTable): Promise<string>
    {
        return this.renderBlockView(view);
    }
}