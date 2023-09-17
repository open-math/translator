"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyAssetsTo = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function copyAssetsTo(targetPath) {
    let localPath = require.resolve('./').split(path_1.default.sep);
    localPath = localPath.slice(0, -4);
    localPath = localPath.join(path_1.default.sep);
    fs_1.default.cpSync(localPath + '/content', path_1.default.normalize(targetPath), { recursive: true });
}
exports.copyAssetsTo = copyAssetsTo;
