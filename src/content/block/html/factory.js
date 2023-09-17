"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFHtml = exports.FHtml = void 0;
const bitran_1 = require("bitran");
const block_1 = __importDefault(require("./block"));
const viewFactory_1 = require("../../../core/viewFactory");
class FHtml extends bitran_1.BlockFactory {
    canParse(strBlock) {
        return strBlock.startsWith('<') && strBlock.endsWith('>');
    }
    async parse(strBlock, meta) {
        let id = -1;
        let html = new block_1.default;
        html.inliners = {};
        html.content = strBlock.replace(/(>)([^<]*)(<)/gm, (match, start, content, end) => {
            if (content.trim() === '')
                return start + end;
            id++;
            html.inliners[id] = content;
            return start + `{{{${id}}}}` + end;
        });
        for (let i = 0; i < Object.keys(html.inliners).length; i++)
            html.inliners[i] = await this.parser.parseInliners(html.inliners[i]);
        return html;
    }
}
exports.FHtml = FHtml;
class VFHtml extends viewFactory_1.StringViewFactory {
    async setupView(product) {
        let content = product.content;
        for (let i = 0; i < Object.keys(product.inliners).length; i++) {
            content = content.replace(`{{{${i}}}}`, await this.renderer.renderInliners(product.inliners[i]));
        }
        return content;
    }
}
exports.VFHtml = VFHtml;
