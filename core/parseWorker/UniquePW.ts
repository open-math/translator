import { Block, BlockMeta } from "bitran";
import slugify from "slugify";

import ParseWorker from "./ParseWorker";
import { IHasAttributes } from "core/block/IHasAttributes";
import { Unique } from "core/block/unique";

import { ParseError, ParseResult } from "core/parser";

import Heading from "content/block/heading/block";
import { Location } from "..";
import Spoiler from "content/block/spoiler/block";
import Task from "content/block/task/block";

export default class UniquePW extends ParseWorker
{
    uniqueMap:      { [id: string]: Unique } = {};
    duplicateIds:   { [id: string]: null } = {};
    autoIdMap:      { [autoId: string]: null } = {};

    blockStep(block: Block, meta: BlockMeta)
    {
        if (meta?.id)
        {
            let unique = new Unique;
                unique.id = Location.normalize(block.type + ':' + meta.id, this.parser.location).toString();
                unique.content = block instanceof Heading ? null : [block];

            if (block instanceof Spoiler)
                unique.content = block.content;

            //

            if (unique.id in this.uniqueMap)
                this.duplicateIds[unique.id] = null;

            this.uniqueMap[unique.id] = unique;

            (<IHasAttributes>block).id = unique.id;
        }
        else
        {
            if (block instanceof Heading || block instanceof Task)
                this.setAutoId(block, block.title);
        }

        (<IHasAttributes>block).classes ??= meta?.classes;
    }

    setAutoId(block: Block, toSlug: string)
    {
        let id = `auto-${block.type}:` + slugify(toSlug);

        while (id in this.autoIdMap)
            id += '-';
        
        this.autoIdMap[id] = null;

        (<IHasAttributes>block).id = id;
    }

    finally(parseResult: ParseResult)
    {
        parseResult.uniques = parseResult.uniques.concat(Object.values(this.uniqueMap));
        parseResult.errors = parseResult.errors.concat(Object.keys(this.duplicateIds).map(duplicateId => new ParseError(`Duplicate ID: ${duplicateId}`)));
    }
}