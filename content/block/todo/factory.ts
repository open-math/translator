import { BlockFactory, BlockMeta, ObjBlockFactory } from "bitran";

import Todo from "./block";
import { BlockViewFactory } from "core/viewFactory";
import { VTodo } from "./view";

export class FTodo extends ObjBlockFactory<Todo>
{
    objType = 'todo';

    async parseObj(obj: any): Promise<Todo>
    {
        if (!obj['title'])
            throw new Error(`Missing 'title' property in todo block!`);

        let todo = new Todo;
            todo.title = obj.title;

        if (obj.content)
            todo.content = await this.parser.parseBlocks(obj.content);

        return todo;
    }
}

export class VFTodo extends BlockViewFactory<VTodo, Todo>
{
    async setupBlockView(block: Todo)
    {
        let view = new VTodo;
            view.title = block.title;

            if (block.content)
                view.content = await this.renderer.renderBlocks(block.content);

        return view;
    }

    async getRender(view: VTodo)
    {
        return this.renderBlockView(view);
    }
}