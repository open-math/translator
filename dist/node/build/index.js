"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = __importDefault(require("./browser"));
const script_1 = require("./script");
const style_1 = require("./style");
const assets_1 = require("./assets");
async function build() {
    await (0, browser_1.default)();
    (0, script_1.buildScripts)();
    (0, style_1.buildStyles)();
    (0, assets_1.moveAssets)();
}
build();
