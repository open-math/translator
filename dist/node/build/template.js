"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pug_1 = __importDefault(require("pug"));
const glob_1 = require("glob");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
let templatePaths = (0, glob_1.globSync)(['content/block/*/layout.pug', 'content/inliner/*/layout.pug']);
fs_1.default.mkdirSync('content/global/layout/__template', { recursive: true });
templatePaths.forEach(templatePath => {
    let name = templatePath.split(path_1.default.sep).at(-2);
    let templateFunc = pug_1.default.compileFileClient(templatePath, { module: true, name: name });
    fs_1.default.writeFileSync(`content/global/layout/__template/${name}.js`, templateFunc, { encoding: 'utf-8' });
});
fs_1.default.cpSync('content/global/layout/__template', 'dist/node/content/global/layout/__template', { recursive: true });
