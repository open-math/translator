"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VTodo = void 0;
const BlockView_1 = __importDefault(require("../../../core/block/BlockView"));
class VTodo extends BlockView_1.default {
    title;
    content;
}
exports.VTodo = VTodo;
