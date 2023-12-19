"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const esbuild_1 = __importDefault(require("esbuild"));
const devMode_1 = require("./devMode");
async function buildForBrowser() {
    const commonOptions = {
        minify: !devMode_1.IS_DEV,
        sourcemap: devMode_1.IS_DEV ? 'inline' : false,
        bundle: true,
        platform: 'browser',
        format: 'esm',
    };
    let libCore = esbuild_1.default.build({
        ...commonOptions,
        entryPoints: ['core/index.ts'],
        outfile: 'dist/browser/core.js',
    });
    let libProducts = esbuild_1.default.build({
        ...commonOptions,
        entryPoints: ['content/index.ts'],
        outfile: 'dist/browser/products.js',
    });
    return Promise.all([libCore, libProducts]);
}
exports.default = buildForBrowser;
