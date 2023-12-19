"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildStyles = void 0;
const sass_1 = __importDefault(require("sass"));
const fs_1 = __importDefault(require("fs"));
const devMode_1 = require("./devMode");
function buildStyles() {
    let compileResult = sass_1.default.compile('content/global/style/index.scss', {
        loadPaths: ['content', 'content/global/style'],
        style: devMode_1.IS_DEV ? 'expanded' : 'compressed',
        sourceMap: devMode_1.IS_DEV,
        sourceMapIncludeSources: true,
    });
    let css = compileResult.css;
    if (compileResult.sourceMap) {
        let sm = JSON.stringify(compileResult.sourceMap);
        let smB64 = (Buffer.from(sm, 'utf-8') || '').toString('base64');
        css += '\n'.repeat(2) + '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,' + smB64 + ' */';
    }
    fs_1.default.writeFileSync('dist/content/style.css', css, { encoding: 'utf-8' });
}
exports.buildStyles = buildStyles;
