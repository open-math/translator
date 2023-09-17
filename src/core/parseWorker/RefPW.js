"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bitran_1 = require("bitran");
const ParseWorker_1 = __importDefault(require("./ParseWorker"));
const inliner_1 = __importDefault(require("../../content/inliner/link/inliner"));
const __1 = require("..");
const block_1 = __importDefault(require("../../content/block/include/block"));
class RefPW extends ParseWorker_1.default {
    aliasMap;
    refMap = {};
    constructor(aliasMap) {
        super();
        this.aliasMap = aliasMap;
    }
    blockStep(block) {
        try {
            if (block instanceof block_1.default) {
                block.id = this.getFinalRef(block.id);
                this.refMap[block.id] = null;
            }
        }
        catch (e) {
            let errorBlock = new bitran_1.ErrorBlock;
            errorBlock.error = e;
            errorBlock.code = JSON.stringify(block);
            return errorBlock;
        }
    }
    inlinerStep(inliner) {
        try {
            if (inliner instanceof inliner_1.default) {
                inliner.target = this.getFinalRef(inliner.target);
                this.refMap[inliner.target] = null;
            }
        }
        catch (e) {
            let errorInliner = new bitran_1.ErrorInliner;
            errorInliner.error = e;
            return errorInliner;
        }
    }
    finally(parseResult) {
        parseResult.refs = Object.keys(this.refMap);
    }
    //
    getFinalRef(rawRef) {
        let rawLocation = this.replaceAlias(rawRef);
        let strLocation = __1.Location.normalizeStr(rawLocation, this.parser.location);
        return strLocation;
    }
    replaceAlias(rawRef) {
        if (!rawRef.startsWith('^'))
            return rawRef;
        let alias = rawRef.slice(1);
        let toReplace = this.aliasMap[alias];
        if (!toReplace)
            throw new Error(`Unknown alias '${alias}'!`);
        return toReplace;
    }
}
exports.default = RefPW;
