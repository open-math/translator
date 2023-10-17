"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VSimilarGenTask = exports.VSimilarTask = exports.VTask = exports.VTaskBase = void 0;
const BlockView_1 = __importDefault(require("../../../core/block/BlockView"));
class VTaskBase extends BlockView_1.default {
    title;
    statement;
    sections = {};
}
exports.VTaskBase = VTaskBase;
class VTask extends VTaskBase {
    tags;
    similar;
}
exports.VTask = VTask;
class VSimilarTask extends VTaskBase {
    num;
}
exports.VSimilarTask = VSimilarTask;
class VSimilarGenTask extends VTaskBase {
    scriptId;
    script;
}
exports.VSimilarGenTask = VSimilarGenTask;
