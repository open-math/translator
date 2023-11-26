"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationFromSrc = exports.Size = void 0;
const location_1 = __importStar(require("../../../core/location"));
class Size {
    width;
    height;
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}
exports.Size = Size;
function locationFromSrc(src, context) {
    let location = new location_1.default;
    let srcParts = src.split('|');
    switch (srcParts.length) {
        // File is located in current topic
        case 1:
            location.type = location_1.LocationType.Topic;
            location.path = context.path;
            location.target = srcParts[0];
            break;
        case 2:
            throw new Error(`Invalid 'src' property: '${src}'`);
        // File is located somewhere else
        case 3:
            location.type = srcParts[0].slice(1);
            location.path = srcParts[1];
            location.target = srcParts[2];
            break;
    }
    // TODO: Allow external resources for "src"?
    return location;
}
exports.locationFromSrc = locationFromSrc;
