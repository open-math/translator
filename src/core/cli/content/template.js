"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileTemplates = void 0;
const pug_1 = __importDefault(require("pug"));
const glob_1 = require("glob");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function compileTemplates() {
    let templatePaths = (0, glob_1.globSync)(['content/block/*/layout.pug', 'content/inliner/*/layout.pug']);
    fs_1.default.mkdirSync('dist/src/content/global/layout', { recursive: true });
    templatePaths.forEach(templatePath => {
        let name = templatePath.split(path_1.default.sep).at(-2);
        let templateFunc = pug_1.default.compileFileClient(templatePath, { module: true, name: name });
        fs_1.default.writeFileSync(`dist/src/content/global/layout/${name}.js`, templateFunc, { encoding: 'utf-8' });
    });
}
exports.compileTemplates = compileTemplates;
