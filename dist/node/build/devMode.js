"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_DEV = void 0;
exports.IS_DEV = isDev();
function isDev() {
    let args = process.argv.slice(2);
    if (args.length === 0)
        return false;
    return args[0] === '--dev';
}
