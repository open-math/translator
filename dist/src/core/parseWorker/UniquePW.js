"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slugify_1 = __importDefault(require("slugify"));
const ParseWorker_1 = __importDefault(require("./ParseWorker"));
const unique_1 = require("../block/unique");
const parser_1 = require("../parser");
const block_1 = __importDefault(require("../../content/block/heading/block"));
const __1 = require("..");
const block_2 = __importDefault(require("../../content/block/spoiler/block"));
const block_3 = __importDefault(require("../../content/block/task/block"));
class UniquePW extends ParseWorker_1.default {
    uniqueMap = {};
    duplicateIds = {};
    autoIdMap = {};
    blockStep(block, meta) {
        if (meta?.id) {
            let location = __1.Location.normalize(block.type + ':' + meta.id, this.parser.location);
            let unique = new unique_1.Unique;
            unique.id = location.toString();
            unique.content = block instanceof block_1.default ? null : [block];
            if (block instanceof block_2.default)
                unique.content = block.content;
            //
            if (unique.id in this.uniqueMap)
                this.duplicateIds[unique.id] = null;
            this.uniqueMap[unique.id] = unique;
            block.id = location.target;
        }
        else {
            if (block instanceof block_1.default || block instanceof block_3.default)
                this.setAutoId(block, block.title);
        }
        block.classes ??= meta?.classes;
    }
    setAutoId(block, toSlug) {
        let id = `auto-${block.type}:` + (0, slugify_1.default)(toSlug);
        while (id in this.autoIdMap)
            id += '-';
        this.autoIdMap[id] = null;
        block.id = id;
    }
    finally(parseResult) {
        parseResult.uniques = parseResult.uniques.concat(Object.values(this.uniqueMap));
        parseResult.errors = parseResult.errors.concat(Object.keys(this.duplicateIds).map(duplicateId => new parser_1.ParseError(`Duplicate ID: ${duplicateId}`)));
    }
}
exports.default = UniquePW;
