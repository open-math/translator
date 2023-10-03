import { Parser as BitranParser, Block, ErrorBlock, ErrorInliner, ErrorProduct } from "bitran";

import ParseWorker from "core/parseWorker/ParseWorker";
import UniquePW from "core/parseWorker/UniquePW";
import RefPW from "core/parseWorker/RefPW";
import FilePW from "core/parseWorker/FilePW";

import { Unique } from "core/block/unique";
import ErrorSwap from "./ErrorSwap";
import { Todo } from "content/index";

import Location from "./location";
import Helper from "./Helper";

// Block Factories
import { FHeading } from "content/block/heading/factory";
import { FHr } from "content/block/hr/factory";
import { FMath } from "content/block/math/factory";
import { FImage } from "content/block/image/factory";
import { FDefinition, FExample, FImportant, FThreorem } from "content/block/accentBlock/factory";
import { FGallery } from "content/block/gallery/factory";
import { FInclude } from "content/block/include/factory";
import { FSpoiler } from "content/block/spoiler/factory";
import { FBlockList, FList } from "content/block/list/factory";
import { FHtml } from "content/block/html/factory";
import { FArray } from "content/block/array/factory";
import { FTable } from "content/block/table/factory";
import { FTask } from "content/block/task/factory";
import { FTodo } from "content/block/todo/factory";

// Inline Factories
import { FIMath } from "content/inliner/imath/factory";
import { FLink } from "content/inliner/link/factory";
import TodoPW from "./parseWorker/TodoPW";

export default class Parser
{
    location: Location;
    helper: Helper;

    blockFactories = [
        FHeading,
        FHr,
        FMath,
        FImage,
        FGallery,
        FList,
        FBlockList,
        FArray,
        FTable,
        FTask,

        FHtml,

        FInclude,
        FSpoiler,

        FImportant,
        FExample,
        FDefinition,
        FThreorem,

        FTodo,
    ];

    inlinerFactories = [
        FIMath,
        FLink,
    ];

    constructor(location: Location, helper: Helper)
    {
        this.location = location;
        this.helper = helper;
    }

    filterParseWorkers(parseWorkers: ParseWorker[])
    {
        return parseWorkers;
    }

    //

    async parse(text: string): Promise<ParseResult>
    {
        let aliasMap = {};

        let workers: ParseWorker[] = [
            new UniquePW,
            new TodoPW,
            new FilePW,
            new RefPW(aliasMap)
        ];

        workers = this.filterParseWorkers(workers);

        workers.forEach(worker => worker.parser = this);

        let bitranParser = new BitranParser;

            bitranParser['location'] = this.location;
            bitranParser['helper'] = this.helper;

            bitranParser.blockFactories =   this.blockFactories;
            bitranParser.inlinerFactories = this.inlinerFactories;

            let onParsed = (type: 'block' | 'inliner', product, factory, blockMeta = null) =>
            {
                let newProduct = product;

                for (let i = 0; i < workers.length; i++)
                {
                    let worker = workers[i];
                    let workerResult = type === 'block' ? worker.blockStep(newProduct, blockMeta, factory) : worker.inlinerStep(newProduct, factory);

                    if (workerResult)
                    {
                        if (workerResult instanceof ErrorProduct)
                            return workerResult;

                        newProduct = workerResult;
                    }
                }

                return newProduct;
            }

            bitranParser.onBlockParsed =    (block, meta, factory) => onParsed('block', block, factory, meta);
            bitranParser.onInlinerParsed =  (inliner, factory) => onParsed('inliner', inliner, factory);

            bitranParser.onParseError = (errorProduct, factory) =>
            {
                parseResult.errors.push(errorProduct.error);
                
                let swapResult = ErrorSwap.trySwap(errorProduct, factory);
                if (swapResult)
                    return swapResult;
            };

        // Scan for RefAlias
        text = text.replaceAll(/^\^ (\S+) (\S+)$/gm, (match, alias, ref) =>
        {
            aliasMap[alias] = ref;
            return '';
        });
        //

        let parseResult = new ParseResult;
            parseResult.locaiton = this.location;
            parseResult.blocks = await bitranParser.parseBlocks(text);

        workers.forEach(worker => worker.finally(parseResult));

        return parseResult;
    }
}

export class ParseResult
{
    locaiton:   Location;
    blocks:     Block[] = [];
    uniques:    Unique[] = [];
    todos:      Todo[] = [];
    refs:       string[] = [];
    files:      string[] = [];
    errors:     ParseError[] = [];
}

function getInjectedProperty(bitranParser: BitranParser, property: string)
{
    let value = bitranParser[property];

    if (!value)
        throw new Error(`No injected property '${property}' found in parser!`);

    return value;
}

export function getLocation(bitranParser: BitranParser)
{
    return getInjectedProperty(bitranParser, 'location') as Location;
}

export function getHelper(bitranParser: BitranParser)
{
    return getInjectedProperty(bitranParser, 'helper') as Helper;
}

export class ParseError extends Error
{
    name = 'ParseError';
}