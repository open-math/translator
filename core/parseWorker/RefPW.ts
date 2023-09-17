import { Block, ErrorBlock, ErrorInliner, Inliner } from "bitran";

import ParseWorker from "./ParseWorker";
import Link from "content/inliner/link/inliner";
import { Location } from "..";
import { ParseResult } from "core/parser";
import Include from "content/block/include/block";

export default class RefPW extends ParseWorker
{
    aliasMap: object;
    refMap: { [ref: string]: null } = {};

    constructor(aliasMap: object)
    {
        super();
        this.aliasMap = aliasMap;
    }

    blockStep(block: Block)
    {
        try
        {
            if (block instanceof Include)
            {
                block.id = this.getFinalRef(block.id);
                this.refMap[block.id] = null;
            }
        }
        catch (e)
        {
            let errorBlock = new ErrorBlock;
                errorBlock.error = e;
                errorBlock.code = JSON.stringify(block);

            return errorBlock;
        }
    }

    inlinerStep(inliner: Inliner)
    {
        try
        {
            if (inliner instanceof Link)
            {
                inliner.target = this.getFinalRef(inliner.target);
                this.refMap[inliner.target] = null;
            }
        }
        catch (e)
        {
            let errorInliner = new ErrorInliner;
                errorInliner.error = e;

            return errorInliner;
        }
    }

    finally(parseResult: ParseResult)
    {
        parseResult.refs = Object.keys(this.refMap);
    }

    //

    getFinalRef(rawRef: string)
    {
        let rawLocation = this.replaceAlias(rawRef);
        let strLocation = Location.normalizeStr(rawLocation, this.parser.location);

        return strLocation;
    }

    replaceAlias(rawRef: string)
    {
        if (!rawRef.startsWith('^'))
            return rawRef;

        let alias = rawRef.slice(1);
        let toReplace = this.aliasMap[alias];

        if (!toReplace)
            throw new Error(`Unknown alias '${alias}'!`);

        return toReplace;
    }
}