import { BlockMeta, ObjBlockFactory } from "bitran";
import { v4 as uuid4 } from "uuid";

import { Task, SimilarTask, TaskBase, SimilarGenTask } from "./block";
import { BlockViewFactory } from "core/viewFactory";
import { VSimilarGenTask, VSimilarTask, VTask } from "./view";

export class FTask extends ObjBlockFactory<Task>
{
    objType = 'task';

    async parseObj(obj: any, meta: BlockMeta): Promise<Task>
    {
        let task = new Task;
        await this.parseTaskBase(task, obj);

        task.tags = obj.tags;

        if (obj.similar)
        {
            task.similar = [];

            for (let i = 0; i < obj.similar.length; i++)
            {
                let rawSimilar = obj.similar[i];
                    rawSimilar.title = task.title;

                let similar;

                if (!rawSimilar.script)
                {
                    similar = new SimilarTask;
                }
                else
                {
                    similar = new SimilarGenTask;
                    similar.scriptId = uuid4();
                    similar.script = JSON.stringify(rawSimilar.script);
                }

                await this.parseTaskBase(similar, rawSimilar);

                task.similar.push(similar);
            }
        }

        return task;
    }

    async parseTaskBase(task: TaskBase, obj: any)
    {
        ['title', 'statement'].forEach(requiredField =>
        {
            if (!obj[requiredField]) throw new Error(`Task must have '${requiredField}' property!'`);
        });

        task.title = obj.title;

        let fields = ['statement', 'hint', 'solution', 'answer', 'note'];
        for (let i = 0; i < fields.length; i++)
        {
            let field = fields[i];
            if (field in obj)
                task[field] = await this.parser.parseBlocks(obj[field]);
        }
    }
}

export class VFTask extends BlockViewFactory<VTask, Task>
{
    async setupBlockView(block: Task): Promise<VTask>
    {
        let view = new VTask;
            view.tags = block.tags;
        
        await this.renderTaskBase(view, block);

        if (block.similar)
        {
            view.similar = [];

            for (let i = 0; i < block.similar.length; i++)
            {
                let blockSimilar = block.similar[i];

                let vSimilar;

                if ('script' in blockSimilar)
                {
                    let genSimilarBlock = blockSimilar as SimilarGenTask;

                    vSimilar = new VSimilarGenTask;
                    vSimilar.script =   genSimilarBlock.script;
                    vSimilar.scriptId = genSimilarBlock.scriptId;
                }
                else
                {
                    vSimilar = new VSimilarTask;
                }

                await this.renderTaskBase(vSimilar, blockSimilar);

                vSimilar.num = i + 1;

                view.similar.push(vSimilar);
            }
        }

        return view;
    }

    async getRender(view: VTask): Promise<string>
    {
        return this.renderBlockView(view);
    }

    async renderTaskBase(view: VTask, block: TaskBase)
    {
        ['title', 'statement'].forEach(requiredField =>
        {
            if (!block[requiredField]) throw new Error(`Task must have '${requiredField} property!'`);
        });

        view.title =        block.title;
        view.statement =    await this.renderer.renderBlocks(block.statement);

        let sections = ['hint', 'solution', 'answer', 'note'].filter(section => block[section]);

        for (let i = 0; i < sections.length; i++)
        {
            let section = sections[i];
            view.sections[section] = await this.renderer.renderBlocks(block[section]);
        }
    }
}