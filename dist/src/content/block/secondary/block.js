"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecondaryType = void 0;
const bitran_1 = require("bitran");
class Secondary extends bitran_1.Block {
    type = 'secondary';
    icon;
    contentType;
    title;
    content;
}
exports.default = Secondary;
var SecondaryType;
(function (SecondaryType) {
    SecondaryType["Quote"] = "quote";
    SecondaryType["Fact"] = "fact";
    SecondaryType["Joke"] = "joke";
})(SecondaryType || (exports.SecondaryType = SecondaryType = {}));
