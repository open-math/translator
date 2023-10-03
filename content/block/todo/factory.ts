import { ObjBlockFactory } from "bitran";

import Todo from "./block";
import { BlockViewFactory } from "core/viewFactory";
import { VTodo } from "./view";

export class FTodo extends ObjBlockFactory<Todo>
{
    objType = 'todo';

    async parseObj(obj: any): Promise<Todo>
    {
        ['title', 'content'].forEach(property =>
        {
            if (!obj[property])
                throw new Error(`Missing '${property}' property in todo block!`);
        });

        let todo = new Todo;
            todo.title = obj.title;
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
            view.content = await this.renderer.renderBlocks(block.content);

        return view;
    }

    async getRender(view: VTodo)
    {
        return this.renderBlockView(view);
    }
}