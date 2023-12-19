"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildScripts = void 0;
const esbuild_1 = __importDefault(require("esbuild"));
const devMode_1 = require("./devMode");
function buildScripts() {
    esbuild_1.default.buildSync({
        entryPoints: ['content/global/script/index.ts'],
        outfile: 'dist/content/script.js',
        charset: 'utf8',
        bundle: true,
        minify: !devMode_1.IS_DEV,
        sourcemap: devMode_1.IS_DEV,
        globalName: 'OMathContent'
    });
    // Task Generator Worker
    esbuild_1.default.buildSync({
        entryPoints: ['content/block/task/worker.ts'],
        outfile: 'dist/content/worker_taskGen.js',
        charset: 'utf8',
        bundle: true,
        minify: !devMode_1.IS_DEV,
        sourcemap: devMode_1.IS_DEV
    });
}
exports.buildScripts = buildScripts;
