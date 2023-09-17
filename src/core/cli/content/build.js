"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_DEV = void 0;
const assets_1 = require("./assets");
const script_1 = require("./script");
const style_1 = require("./style");
const template_1 = require("./template");
exports.IS_DEV = isDev();
(0, template_1.compileTemplates)();
(0, script_1.buildScripts)();
(0, style_1.buildStyles)();
(0, assets_1.moveAssets)();
//
//
//
function isDev() {
    let args = process.argv.slice(2);
    if (args.length === 0)
        return false;
    return args[0] === '--dev';
}
