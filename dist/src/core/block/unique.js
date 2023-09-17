"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unique = exports.IdPrefix = void 0;
var IdPrefix;
(function (IdPrefix) {
    IdPrefix["p"] = "paragraph";
    IdPrefix["h"] = "header";
})(IdPrefix || (exports.IdPrefix = IdPrefix = {}));
class Unique {
    id;
    content;
}
exports.Unique = Unique;
