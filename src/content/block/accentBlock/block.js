"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitran_1 = require("bitran");
class AccentBlock extends bitran_1.Block {
    type;
    showInToc = true;
    showTitle = true;
    title;
    main;
    expand;
}
exports.default = AccentBlock;
