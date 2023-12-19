"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initProducts = void 0;
const script_1 = require("../../block/figure/script");
const script_2 = require("../../block/accentBlock/script");
const script_3 = require("../../block/gallery/script");
const script_4 = require("../../inliner/link/script");
const script_5 = require("../../block/task/script");
let products = [
    script_1.init,
    script_2.init,
    script_3.init,
    script_4.init,
    script_5.init,
];
function initProducts(contentElem) {
    if (!contentElem)
        return;
    products.forEach(product => product(contentElem));
}
exports.initProducts = initProducts;
globalThis.OMath_initProducts = initProducts;
globalThis.GenTaskManager = new script_5.GenTaskManager;
