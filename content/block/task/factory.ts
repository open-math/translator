import { BlockMeta, ObjBlockFactory } from "bitran";
import Task from "./block";
import { BlockViewFactory } from "core/viewFactory";
import { VTask } from "./view";

export class FTask extends ObjBlockFactory<Task>
{
    objType = 'task';

    async parseObj(obj: any, meta: BlockMeta): Promise<Task>
    {
        let task = new Task;
        
        ['title', 'statement'].forEach(requiredField =>
        {
            if (!obj[requiredField])
                throw new Error(`Task must have '${requiredField} property!'`);
        });

        task.title = obj.title;
        task.tags = obj.tags;

        let fields = ['statement', 'hint', 'solution', 'answer'];
        for (let i = 0; i < fields.length; i++)
        {
            let field = fields[i];
            if (field in obj)
                task[field] = await this.parser.parseBlocks(obj[field]);
        }

        return task;
    }
}

export class VFTask extends BlockViewFactory<VTask, Task>
{
    async setupBlockView(block: Task): Promise<VTask>
    {
        let view = new VTask;
            view.title =        block.title;
            view.tags =         block.tags;
            view.statement =    await this.renderer.renderBlocks(block.statement);

        let sections = ['hint', 'solution', 'answer'].filter(section => block[section]);

        for (let i = 0; i < sections.length; i++)
        {
            let section = sections[i];
            view.sections[section] = await this.renderer.renderBlocks(block[section]);
        }

        return view;
    }

    async getRender(view: VTask): Promise<string>
    {
        return this.renderBlockView(view);
    }
}