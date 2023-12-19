"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FigureContent = exports.FigureCaption = exports.Figure = void 0;
const bitran_1 = require("bitran");
class Figure extends bitran_1.Block {
    type = 'figure';
    uuid;
    widthSet;
    content;
    caption;
}
exports.Figure = Figure;
class FigureCaption {
    main;
    secondary;
    link;
}
exports.FigureCaption = FigureCaption;
class FigureContent {
}
exports.FigureContent = FigureContent;
