"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseError = exports.getHelper = exports.getLocation = exports.ParseResult = void 0;
const bitran_1 = require("bitran");
const UniquePW_1 = __importDefault(require("./parseWorker/UniquePW"));
const RefPW_1 = __importDefault(require("./parseWorker/RefPW"));
const FilePW_1 = __importDefault(require("./parseWorker/FilePW"));
const ErrorSwap_1 = __importDefault(require("./ErrorSwap"));
// Block Factories
const factory_1 = require("../content/block/heading/factory");
const factory_2 = require("../content/block/hr/factory");
const factory_3 = require("../content/block/math/factory");
const factory_4 = require("../content/block/image/factory");
const factory_5 = require("../content/block/accentBlock/factory");
const factory_6 = require("../content/block/gallery/factory");
const factory_7 = require("../content/block/include/factory");
const factory_8 = require("../content/block/spoiler/factory");
const factory_9 = require("../content/block/list/factory");
const factory_10 = require("../content/block/html/factory");
const factory_11 = require("../content/block/array/factory");
const factory_12 = require("../content/block/table/factory");
const factory_13 = require("../content/block/task/factory");
// Inline Factories
const factory_14 = require("../content/inliner/imath/factory");
const factory_15 = require("../content/inliner/link/factory");
class Parser {
    location;
    helper;
    blockFactories = [
        factory_1.FHeading,
        factory_2.FHr,
        factory_3.FMath,
        factory_4.FImage,
        factory_6.FGallery,
        factory_9.FList,
        factory_9.FBlockList,
        factory_11.FArray,
        factory_12.FTable,
        factory_13.FTask,
        factory_10.FHtml,
        factory_7.FInclude,
        factory_8.FSpoiler,
        factory_5.FImportant,
        factory_5.FExample,
        factory_5.FDefinition,
        factory_5.FThreorem
    ];
    inlinerFactories = [
        factory_14.FIMath,
        factory_15.FLink,
    ];
    constructor(location, helper) {
        this.location = location;
        this.helper = helper;
    }
    filterParseWorkers(parseWorkers) {
        return parseWorkers;
    }
    //
    async parse(text) {
        let aliasMap = {};
        let workers = [
            new UniquePW_1.default,
            new FilePW_1.default,
            new RefPW_1.default(aliasMap)
        ];
        workers = this.filterParseWorkers(workers);
        workers.forEach(worker => worker.parser = this);
        let bitranParser = new bitran_1.Parser;
        bitranParser['location'] = this.location;
        bitranParser['helper'] = this.helper;
        bitranParser.blockFactories = this.blockFactories;
        bitranParser.inlinerFactories = this.inlinerFactories;
        let onParsed = (type, product, factory, blockMeta = null) => {
            let newProduct = product;
            for (let i = 0; i < workers.length; i++) {
                let worker = workers[i];
                let workerResult = type === 'block' ? worker.blockStep(newProduct, blockMeta, factory) : worker.inlinerStep(newProduct, factory);
                if (workerResult) {
                    if (workerResult instanceof bitran_1.ErrorProduct)
                        return workerResult;
                    newProduct = workerResult;
                }
            }
            return newProduct;
        };
        bitranParser.onBlockParsed = (block, meta, factory) => onParsed('block', block, factory, meta);
        bitranParser.onInlinerParsed = (inliner, factory) => onParsed('inliner', inliner, factory);
        bitranParser.onParseError = (errorProduct, factory) => {
            parseResult.errors.push(errorProduct.error);
            let swapResult = ErrorSwap_1.default.trySwap(errorProduct, factory);
            if (swapResult)
                return swapResult;
        };
        // Scan for RefAlias
        text = text.replaceAll(/^\^ (\S+) (\S+)$/gm, (match, alias, ref) => {
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
exports.default = Parser;
class ParseResult {
    locaiton;
    blocks = [];
    uniques = [];
    refs = [];
    files = [];
    errors = [];
}
exports.ParseResult = ParseResult;
function getInjectedProperty(bitranParser, property) {
    let value = bitranParser[property];
    if (!value)
        throw new Error(`No injected property '${property}' found in parser!`);
    return value;
}
function getLocation(bitranParser) {
    return getInjectedProperty(bitranParser, 'location');
}
exports.getLocation = getLocation;
function getHelper(bitranParser) {
    return getInjectedProperty(bitranParser, 'helper');
}
exports.getHelper = getHelper;
class ParseError extends Error {
    name = 'ParseError';
}
exports.ParseError = ParseError;
