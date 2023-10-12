import { Block } from "bitran";
import { v4 as uuid4 } from "uuid";

import ParseWorker from "./ParseWorker";
import { Todo } from "content/index";
import { IHasAttributes } from "core/block/IHasAttributes";
import { ParseResult } from "..";

export default class TodoPW extends ParseWorker
{
    todoBlocks: { id: string, title: string }[] = [];

    blockStep(block: Block)
    {
        if (!(block instanceof Todo))
            return;

        let id = 'todo:' + uuid4();

        (<IHasAttributes>block).id = id;

        this.todoBlocks.push({ id: id, title: block.title });
    }

    finally(parseResult: ParseResult)
    {
        parseResult.todos = this.todoBlocks;
    }
}