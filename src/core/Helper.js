"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
class Helper {
    static getFrom(obj) {
        return (0, util_1.getInjectedProperty)(obj, 'helper');
    }
}
exports.default = Helper;
