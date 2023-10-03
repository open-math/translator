import { Block } from "bitran";
import { v4 as uuid4 } from "uuid";

import ParseWorker from "./ParseWorker";
import { Todo } from "content/index";
import { IHasAttributes } from "core/block/IHasAttributes";
import { ParseResult } from "..";

export default class TodoPW extends ParseWorker
{
    todoBlocks: Todo[] = [];

    blockStep(block: Block)
    {
        if (!(block instanceof Todo))
            return;

        let id = uuid4();

        (<IHasAttributes>block).id = 'todo:' + id;

        this.todoBlocks.push(block);
    }

    finally(parseResult: ParseResult)
    {
        parseResult.todos = this.todoBlocks;
    }
}