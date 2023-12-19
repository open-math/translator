"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveAssets = void 0;
const fs_1 = __importDefault(require("fs"));
function moveAssets() {
    fs_1.default.cpSync('content/assets', 'dist/content/assets', { recursive: true });
}
exports.moveAssets = moveAssets;
