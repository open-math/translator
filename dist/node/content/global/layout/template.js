"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTemplate = void 0;
const errorBlock_1 = __importDefault(require("./__template/errorBlock"));
const errorInliner_1 = __importDefault(require("./__template/errorInliner"));
const paragraph_1 = __importDefault(require("./__template/paragraph"));
const heading_1 = __importDefault(require("./__template/heading"));
const math_1 = __importDefault(require("./__template/math"));
const figure_1 = __importDefault(require("./__template/figure"));
const imath_1 = __importDefault(require("./__template/imath"));
const accentBlock_1 = __importDefault(require("./__template/accentBlock"));
const gallery_1 = __importDefault(require("./__template/gallery"));
const link_1 = __importDefault(require("./__template/link"));
const list_1 = __importDefault(require("./__template/list"));
const array_1 = __importDefault(require("./__template/array"));
const table_1 = __importDefault(require("./__template/table"));
const task_1 = __importDefault(require("./__template/task"));
const secondary_1 = __importDefault(require("./__template/secondary"));
const mermaid_1 = __importDefault(require("./__template/mermaid"));
const todo_1 = __importDefault(require("./__template/todo"));
let templates = {
    errorBlock: errorBlock_1.default,
    errorInliner: errorInliner_1.default,
    paragraph: paragraph_1.default,
    heading: heading_1.default,
    math: math_1.default,
    figure: figure_1.default,
    imath: imath_1.default,
    accentBlock: accentBlock_1.default,
    gallery: gallery_1.default,
    link: link_1.default,
    list: list_1.default,
    array: array_1.default,
    table: table_1.default,
    task: task_1.default,
    secondary: secondary_1.default,
    mermaid: mermaid_1.default,
    todo: todo_1.default
};
function renderTemplate(name, locals = {}) {
    return templates[name](locals);
}
exports.renderTemplate = renderTemplate;
